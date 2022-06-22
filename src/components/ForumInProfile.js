import React from 'react'
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

export default function ForumInProfile ({ indivpost, userName, profilePic, post, time, header}) {

    const onDeleteHandler = async (id) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));

            console.log('onDeleteHandler success', id);
            //showRes('Successfully deleted task!');
        } catch (err) {
            console.log('onDeleteHandler failure', err);
            //showRes('Failed to delete task!');
        }
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
                <Image style={styles.img} source = {{uri:profilePic}}></Image>
                <Text style={styles.header}>{header}</Text>
                <TouchableOpacity 
                    style={styles.trash}
                    onPress={() => onDeleteHandler(indivpost)}
                >
                    <Ionicons name="trash-outline" size={32} color={colors.darkPink} />
                </TouchableOpacity>
            </View>
            <Text style={styles.post}>{post}</Text>
            <Text style={styles.time}>{printedOut}</Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    top: {
        //backgroundColor: 'grey',
        flexDirection: 'row',
        //position: 'absolute'
    },

    postcontainer: {
        height: 170,
        width: 350,
        borderRadius : 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 20

    },

    header: {
        position: 'absolute',
        marginLeft: 130,
        marginTop: 30,
        fontSize: 22,
        textAlign: 'center',
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
