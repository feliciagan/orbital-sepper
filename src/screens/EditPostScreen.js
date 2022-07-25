import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView, SafeAreaView} from 'react-native';
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
    updateDoc,
    deleteDoc, 
    getDocs,
    where,
    serverTimestamp} from 'firebase/firestore'
import { db, auth } from '../firebase/index.js'
import BackButton from '../components/BackButton.js';

const EditPostScreen = ({ route, navigation }) => {
  
  const { userName, profilePic, header, post, indivpost } = route.params;
  const [pst, setPst] = useState({post});
  const { currentUser } = auth;
  /*const handleChange = (e) => {
    setDetails({
        ...details,
        [e.target.name]: e.target.value,
    });
  }; */

 
  const onSubmitHandler = async () => {
    if (pst.length === 0) {
        // showRes('Task description cannot be empty!');
        return;
    }

    try { //use setDoc so user can edit answer
        const postID = Object.values({indivpost})[0]
        const answerRef = await updateDoc(doc(db, 'tasks', postID), {
            post: pst,
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
        setPst('');
        Keyboard.dismiss();
    };

  return (
    <SafeAreaView style={styles.page}>
        <BackButton press={() => navigation.goBack()}></BackButton>
        <Text style={styles.header}>Edit your post</Text>
        <TextInput 
        style={styles.answer}
        onChangeText={setPst}
        placeholder={post}
        value={pst}>
        </TextInput>
        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
            <Ionicons name="send-sharp" size={32} color={colors.darkPink} />
        </TouchableOpacity>
    </SafeAreaView>
        
  )
}

export default EditPostScreen

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
        //paddingTop: 50
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