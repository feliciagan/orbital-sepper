import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView} from 'react-native';
import colors from '../assets/colors/colors.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Answer from '../components/Answer.js';
import { useRoute } from '@react-navigation/native'
import { addDoc,
    setDoc,
    onSnapshot,
    query,
    collection,
    doc,
    deleteDoc, 
    getDocs,
    where,
    serverTimestamp} from 'firebase/firestore'
import { db, auth } from '../firebase/index.js'

const EditAnswerScreen = ({ route }) => {
  
  const { ansID, userName, profilePic, answer, header, OPImg, indivpost } = route.params;
  const [ans, setAns] = useState({answer});
  const { currentUser } = auth;
  /*const handleChange = (e) => {
    setDetails({
        ...details,
        [e.target.name]: e.target.value,
    });
  }; */

 
  const onSubmitHandler = async () => {
    if (ans.length === 0) {
        // showRes('Task description cannot be empty!');
        return;
    }

    try { //use setDoc so user can edit answer
        const answerID = Object.values({ansID})[0]
        const answerRef = await setDoc(doc(db, 'answers', answerID), {
            answer: ans,
            username: currentUser.displayName,
            profileImg: currentUser.photoURL,
            timestamp: serverTimestamp(),
            email: currentUser.email,
            postID: Object.values({indivpost})[0],
            qnHeader: Object.values({header})[0],
            OPImg: Object.values({profilePic})[0]
        });

        console.log('onSubmitHandler success', );
        //showRes('Successfully added task!');
        clearForm();
    } catch (err) {
        console.log('onSubmitHandler failure', err);
        //showRes('Failed to add task!');
    }
  };


    const clearForm = () => {
        setAns('');
        Keyboard.dismiss();
    };

  return (
    <View style={styles.page}>
        <Text style={styles.header}>Edit your answer</Text>
        <TextInput 
        style={styles.answer}
        onChangeText={setAns}
        placeholder={answer}
        value={ans}>
        </TextInput>
        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
            <Ionicons name="send-sharp" size={32} color={colors.darkPink} />
        </TouchableOpacity>
    </View>
        
  )
}

export default EditAnswerScreen

const styles = StyleSheet.create({

    page: {
        backgroundColor: colors.pink,
        flex: 1,
        justifyContent: ''
    },

    header: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 25,
        paddingLeft: 10,
        paddingTop: 50
    },


    answer: {
        width: '90%',
        height: 430,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 30,
        paddingLeft: 10,
        color: colors.darkBlue,
        fontSize: 20,
    },

    button: {
        alignSelf: 'flex-end',
        marginTop : - 50,
        marginRight: 30
    }

    
})