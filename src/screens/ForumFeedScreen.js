import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../assets/colors/colors.js';
import Feather from 'react-native-vector-icons/Feather';
import { auth, db } from '../firebase/index.js'
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import ForumPost from '../components/ForumPost.js'

export default function ForumScreen() {
    const [activeTab, setActiveTab] = useState('Newest');
//2:21:52
    const { currentUser } = auth;
    const [posts, setPosts] = useState([]);

    useEffect(
        () => onSnapshot(
            query(collection(db, "tasks"), orderBy("timestamp", "desc")),
            (snapshot) => {
                setPosts(snapshot.docs);
            }
        ), [db]
    );

    console.log(posts)
    
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.headerContainer}>
                <Text style={styles.introtext}>Forum</Text>
                <TouchableOpacity style={styles.searchIcon}>
                    <Feather name="search" size={40} color={colors.lightGray}></Feather>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.buttonContainer}>
                <TabButton text={'Newest'} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabButton text={'Most liked'} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </SafeAreaView>
            <ScrollView style={styles.feed}>
            {/*<FlatList
                data={userData}
                renderItem={renderUser}
                vertical
                //showsHorizontalScrollIndicator={false}
    /> */}
                {posts.map((post) => (
                    <ForumPost 
                        key={post.id}
                        id={post.id}
                        userName={post.data().username}
                        profilePic={post.data().profileImg}
                        post={post.data().post}
                        time={post.data().timestamp.toDate()} 
                    />

                )
                )}
            </ScrollView>
        </View>
    );
}


const TabButton = (props) => {
    return (
    <TouchableOpacity 
        style={{
            backgroundColor: colors.lightBlue,
            paddingVertical: 25,
            width: '50%'
        }}
        onPress={() => props.setActiveTab(props.text)}>
            <Text style={{
                color: props.activeTab === props.text ? colors.darkBlue : colors.blue,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center'
            }}>{props.text}</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.pink,
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    introtext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 40,
        paddingVertical: 20,
        paddingLeft: 10,
    },
    searchIcon: {
        paddingVertical: 20,
        paddingRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        //backgroundColor: 'lightpink'
    },
    feed: {
        backgroundColor: colors.pink,
        height: 500,
        width: 420,
    
        
    }
});