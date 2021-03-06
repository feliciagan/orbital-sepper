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
import Avatar from '../components/Avatar.js';
export default function AnswerInProfile ({ ansID, userName, profilePic, answer, time, header, OPImg, indivpost, navigation }) {
    const user =  auth.currentUser;
    const onDeleteHandler = async (id) => {
        try {
            await deleteDoc(doc(db, 'answers', id));

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
                <Text style={styles.qn}>{header}</Text>
                <TouchableOpacity 
                    style={styles.trash}
                    onPress={() => onDeleteHandler(ansID)}
                >
                    <Ionicons name="trash-outline" size={25} color={colors.darkPink} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.edit}
                    onPress={() => navigation.navigate('EditAnswerScreen', {
                        ansID: ansID, 
                        userName: userName, 
                        profilePic: profilePic, 
                        answer: answer, 
                        header: header, 
                        OPImg: OPImg, 
                        indivpost: indivpost
                    })}
                >
                    <Ionicons name="create-outline" size={25} color={colors.darkPink} />
                </TouchableOpacity>
            </View>
            <Text style={styles.youreplied}>you replied...</Text>
            <Text style={styles.answer}>{answer}</Text>
            {/*<Text style={styles.time}>{printedOut}</Text>*/}
        </View>
    )
    
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
    },

    postcontainer: {
        width: '95%',
        borderRadius : 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 20,
        paddingBottom: 15

    },

    qn: {
        marginLeft: 10,
        marginRight: 60,
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkBlue
    },

    trash: {
        position: 'absolute',
        top: 20,
        right: 10

    },

    edit: {
        position: 'absolute',
        top: 20, 
        right: 45                                                                                                                                                                
    },

    img: {
        marginLeft: 30,
        marginTop: 10
    },

    youreplied: {
        fontStyle:'italic',
        marginLeft: 30,
        color: colors.darkBlue,
        marginTop: 10

    },

    answer : {
        marginHorizontal: 20,
        textAlign:'left',
        color: colors.darkBlue,
        fontSize: 20,
        marginTop: 5
    },

    time : {
        marginLeft: 30,
        marginTop: 20,
        fontSize: 13,
        color: colors.blue
    }
})