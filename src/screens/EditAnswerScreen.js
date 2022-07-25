import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TextInput, Image, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView} from 'react-native';
import colors from '../assets/colors/colors.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../components/BackButton.js';
import Answer from '../components/Answer.js';
import { useRoute } from '@react-navigation/native'
import { addDoc,
    setDoc,
    onSnapshot,
    query,
    collection,
    doc,
    updateDoc,
    deleteDoc, 
    getDocs,
    where,
    serverTimestamp} from 'firebase/firestore'
import { db, auth } from '../firebase/index.js'

const EditAnswerScreen = ({ route, navigation }) => {
  
  const { ansID, userName, profilePic, answer, header, OPImg, indivpost } = route.params;
  const [ans, setAns] = useState({answer});
  const { currentUser } = auth;

  const onSubmitHandler = async () => {
    if (ans.length === 0) {
        // showRes('Task description cannot be empty!');
        return;
    }

    try { //use setDoc so user can edit answer
        const answerID = Object.values({ansID})[0]
        const answerRef = await updateDoc(doc(db, 'answers', answerID), {
            answer: ans,
        });

        console.log('onSubmitHandler success', );
        //showRes('Successfully added task!');
        clearForm();
        navigation.goBack()
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
    <SafeAreaView style={styles.page}>
        <BackButton press={() => navigation.goBack()}></BackButton>
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
    </SafeAreaView>
        
  )
}

export default EditAnswerScreen

const styles = StyleSheet.create({

    page: {
        backgroundColor: colors.pink,
        flex: 1,
    },

    header: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 25,
        paddingLeft: 10,
        marginVertical: 10
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