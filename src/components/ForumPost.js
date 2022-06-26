import React, {useState} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addDoc,
    onSnapshot,
    query,
    collection,
    doc,
    deleteDoc, 
    serverTimestamp} from 'firebase/firestore'

import { db, auth } from '../firebase/index.js'
import { NavigationContainer } from '@react-navigation/native';

export default function ForumInProfile ({ indivpost, userName, profilePic, post, time, header, navigation }) {

    const postDate = time;
    const todayDate = new Date();
    const diffTime = Math.abs(todayDate - postDate);
    const diffInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const printedOut = diffInDays <= 1 
                        ? Math.ceil(Math.abs(todayDate - postDate) / (60*60*1000)) + ' hours ago'
                        : diffInDays + ' days ago'
    
    return(
        <TouchableOpacity style={styles.postcontainer} 
                          onPress={() => 
                            navigation.navigate('AnswerPostScreen', {
                                userName: userName,
                                profilePic: profilePic,
                                indivpost: indivpost,
                                post: post,
                                header: header
                            })}>
            <View style= {styles.top}>
        
                <Image style={styles.img} source = {{uri:profilePic}}></Image>*/
                <Text style={styles.username}>@{userName}</Text>
            </View>
            <Text style={styles.header}>{header}</Text>
            <Text style={styles.time}>{printedOut}</Text>
        </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
    },

    postcontainer: {
        height: 170,
        width: 350,
        borderRadius : 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 20

    },

    username: {
        color: colors.darkPink,
        fontSize: 20,
        marginLeft: 20,
        marginTop: 30
    },

    header: {
        //position: 'absolute',
        marginLeft: 35,
        marginTop: 15,
        fontSize: 22,
        textAlign: 'left',
        fontWeight: 'bold',
        color: colors.darkBlue
    },

    trash: {
        marginLeft: 190,
        marginTop: 27,

    },

    img: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginLeft: 30,
        marginTop: 10
    },

    post : {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 15
    },

    time : {
        marginLeft: 30,
        marginTop: 20,
        fontSize: 13,
        color: colors.blue
    }
})

