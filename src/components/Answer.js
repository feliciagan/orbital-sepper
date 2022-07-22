import React, {useState, useEffect} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addDoc,
    onSnapshot,
    query,
    collection,
    doc,
    deleteDoc,
    updateDoc, 
    increment,
    setDoc,
    serverTimestamp} from 'firebase/firestore'

import { db, auth } from '../firebase/index.js'

export default function Answer ({ indivpost, userName, anonymous, profilePic, post, time, header}) {

    const [currentUserLike, setCurrentUserLike] = useState(false);
    const [likes, setLikes] = useState(0);
    const { currentUser } = auth;

    useEffect(() => {
        const likedQuery = doc(collection(db, "answers", indivpost, "likes"), currentUser.uid);
        
        const unsubscribe = onSnapshot(likedQuery, (snapshot) => {
            let currentUserLike = false;
            if (snapshot.exists()) {
                currentUserLike = true;
            }
            setCurrentUserLike(currentUserLike);
        });
    
        return unsubscribe;
    }, []);
    
    useEffect(() => {
        const likesRef = doc(db, "answers", indivpost);
        
        const unsubscribe = onSnapshot(likesRef, (doc) => {
            setLikes(doc.get("likes"));
        });
    
        return unsubscribe;
    }, []);

    const onLike = async() => {
        setCurrentUserLike(true);
        await Promise.all([
            updateDoc(doc(db, "answers", indivpost), {likes: increment(1)}),
            setDoc(doc(collection(doc(db, "answers", indivpost), "likes"), currentUser.uid), 
                {user: currentUser.uid}),
        ]);
    };

    const onUnlike = async() => {
        setCurrentUserLike(false);
        await Promise.all([
            updateDoc(doc(db, "answers", indivpost), {likes: increment(-1)}),
            deleteDoc(doc(collection(db, "answers", indivpost, "likes"), currentUser.uid)),
        ]);
    };

    const postDate = time;
    const todayDate = new Date();
    const diffTime = Math.abs(todayDate - postDate);
    const diffInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const printedOut = diffInDays <= 1 
                        ? Math.ceil(Math.abs(todayDate - postDate) / (60*60*1000)) + ' hours ago'
                        : diffInDays + ' days ago'
    //const individualpost = indivpost
    return(
        <View style={styles.postcontainer}>
            <View style= {styles.top}>
            {profilePic 
                ? !anonymous
                ? <Image style={styles.img} source = {{uri:profilePic}} /> 
                : <Image style={styles.img} source = {require("../assets/avatar1.png")} /> 
                : <Image style={styles.img} source = {require("../assets/avatar1.png")} />}
                <View style={{flexShrink: 1}}>
                <Text style={styles.header}>{ !anonymous ? `@${userName}` : "anon"}</Text>
                </View>
            </View>
            <Text style={styles.post}>{post}</Text>

            <View style={{alignSelf: 'flex-end', marginRight: 20}}>
            <TouchableOpacity
            style={{}}
            onPress={currentUserLike === true ? onUnlike : onLike}>
                <Ionicons name='heart' color={currentUserLike ? colors.darkPink : 'gray'} size={30}></Ionicons>
            </TouchableOpacity>
            <Text style={{fontSize: 13, color: colors.darkBlue}}>{likes !== 0 ? likes : ''}</Text>
            </View>

            {/*<Text style={styles.time}>{printedOut}</Text>*/}
        </View>
    )
    
}

const styles = StyleSheet.create({
    top: {
        //backgroundColor: 'grey',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
        //position: 'absolute'
    },

    postcontainer: {
        //height: 170,
        width: '95%',
        borderRadius : 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        paddingBottom: 5,
        marginBottom: 20,
        

    },

    header: {
        //position: 'absolute',
        marginHorizontal: 20,
        //marginTop: 30,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.darkBlue,
        flexShrink: 1
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
        marginHorizontal: 20,
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