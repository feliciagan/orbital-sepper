import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../assets/colors/colors.js';
import Feather from 'react-native-vector-icons/Feather';
import BackButton from '../components/BackButton.js';
import { auth, db } from '../firebase/index.js'
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import ForumPost from '../components/ForumPost.js'
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'
export default function ForumScreen({navigation}) {
    const [activeTab, setActiveTab] = useState('Newest');

    const { currentUser } = auth;
    const [posts, setPosts] = useState([]);
    const [mostLikedPosts, setMostLikedPosts] = useState([]);

    const searchClient = algoliasearch(
        '5LE4KG5PFC',
        'b3d6181964669a080786eb2524d5a477'
    )

    useEffect( 
        () => onSnapshot(
            query(collection(db, "tasks"), orderBy("timestamp", "desc")),
            (snapshot) => {
                setPosts(snapshot.docs);
            }
        ), [db]
    );

    useEffect(
        () => onSnapshot(
            query(collection(db, "tasks"), orderBy("likes", "desc")),
            (snapshot) => {
                setMostLikedPosts(snapshot.docs);
            }
        ), [db]
    );

    console.log(posts)
    
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.headerContainer}>
            <BackButton press={() => navigation.goBack()}></BackButton>
                <Text style={styles.introtext}>Forum</Text>
                <TouchableOpacity style={styles.searchIcon} onPress={()=>navigation.navigate('ForumSearchScreen')}>
                    <Feather name="search" size={40} color={colors.lightGray}></Feather>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.buttonContainer}>
                <TabButton text={'Newest'} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabButton text={'Most liked'} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </SafeAreaView>
            <View style={{height: 20}}></View>
            <ScrollView style={styles.feed}>
                {activeTab ===  "Newest"
                ? posts.map((post) => (
                    <ForumPost 
                        key={post.id}
                        id={post.id}
                        indivpost={post.id}
                        userName={post.data().username}
                        anon={post.data().anon}
                        tag={post.data().tag}
                        profilePic={post.data().profileImg}
                        post={post.data().post}
                        time={post.data().timestamp.toDate()} 
                        header={post.data().header}
                        navigation={navigation}
                    />

                )
                )
                : mostLikedPosts.map((post) => (
                    <ForumPost 
                        key={post.id}
                        id={post.id}
                        indivpost={post.id}
                        userName={post.data().username}
                        anon={post.data().anon}
                        tag={post.data().tag}
                        profilePic={post.data().profileImg}
                        post={post.data().post}
                        time={post.data().timestamp.toDate()} 
                        header={post.data().header}
                        navigation={navigation}
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
    },
    feed: {
        backgroundColor: colors.pink,
        height: 500,
    
        
    }
});