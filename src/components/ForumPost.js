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

export default function ForumPost ({ indivpost, userName, anon, tag, profilePic, post, time, header, navigation }) {

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
                                anon: anon,
                                tag: tag,
                                profilePic: profilePic,
                                indivpost: indivpost,
                                post: post,
                                header: header
                            })}>
            <View style= {styles.top}>
        
                {profilePic 
                ? !anon
                ? <Image style={styles.img} source = {{uri:profilePic}} /> 
                : <Image style={styles.img} source = {require("../assets/avatar1.png")} /> 
                : <Image style={styles.img} source = {require("../assets/avatar1.png")} />}
                <View style={{flexShrink: 1}}>
                <Text style={styles.username}>{ !anon ? `@${userName}` : "anon"}</Text>
                </View>
            </View>
            <Text style={styles.header}>{header}</Text>
            <Text style={styles.time}>{printedOut}</Text>
        </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },

    postcontainer: {
        //height: 170,
        width: "95%",
        borderRadius : 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 20,
        //paddingRight: 20

    },

    username: {
        color: colors.darkPink,
        fontSize: 20,
        marginHorizontal: 20,
        //marginTop: 10,
        flexShrink: 1
    },

    header: {
        //position: 'absolute',
        marginHorizontal: 35,
        marginTop: 15,
        fontSize: 22,
        textAlign: 'left',
        fontWeight: 'bold',
        color: colors.darkBlue,
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
        //marginTop: 10
    },

    post : {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 15
    },

    time : {
        marginLeft: 30,
        marginVertical: 20,
        fontSize: 13,
        color: colors.blue
    }
})

