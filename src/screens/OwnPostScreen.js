import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ForumInProfile from '../components/ForumInProfile.js';
import { auth, db } from '../firebase/index.js'
import { onSnapshot, query, collection, orderBy, where } from 'firebase/firestore';
import colors from '../assets/colors/colors.js';
import BackButton from '../components/BackButton.js';

function OwnPostScreen({navigation}) {

    const { currentUser } = auth;
    const [posts, setPosts] = useState([]);

    useEffect(
        () => onSnapshot(
            query(collection(db, "tasks"), where("email", "==", currentUser.email)
            //, orderBy("timestamp", "desc")
            ),
            (snapshot) => {
                setPosts(snapshot.docs);
            }
        ), [db]
    );

  return (
    <SafeAreaView style={styles.container}>
        <BackButton press={() => navigation.goBack()}></BackButton>
        <View style={styles.headerContainer}>
            <Text style={styles.introtext}>Your Posts</Text>
        </View>
        <ScrollView style={styles.postContainer}>
            {posts.map((post) => (
                <ForumInProfile
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: colors.pink
    },

    headerContainer: {
        //flexDirection: 'row', 
        //justifyContent: 'space-between',
        alignContent: 'flex-start',
        //height: 120
    }, 

    introtext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 40,
        paddingVertical: 10,
        paddingLeft: 10,
    },

    postContainer: {
        height: 300
    }
})
export default OwnPostScreen