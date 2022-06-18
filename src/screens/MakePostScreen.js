import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, Keyboard } from 'react-native';
import React, {useState, useEffect } from 'react';
import colors from '../assets/colors/colors.js';
import { addDoc,
         onSnapshot,
         query,
         collection,
         doc,
         deleteDoc } from 'firebase/firestore'


import { db } from '../firebase/index.js'

export default function MakePostScreen() {

    const [task, setTask] = useState('');
    //const [taskList, setTaskList] = useState([]);

    /*const showRes = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    }; */

    const onSubmitHandler = async () => {
        if (task.length === 0) {
            // showRes('Task description cannot be empty!');
            return;
        }

        try {
            const taskRef = await addDoc(collection(db, 'tasks'), {
                post: task,
            });

            console.log('onSubmitHandler success', taskRef.id);
            //showRes('Successfully added task!');
            clearForm();
        } catch (err) {
            console.log('onSubmitHandler failure', err);
            //showRes('Failed to add task!');
        }
    };

    const clearForm = () => {
        setTask('');
        Keyboard.dismiss();
    };

    return (
        <View>
            <SafeAreaView>
                <Text style={styles.introtext}>Make A Post!</Text>
            </SafeAreaView>
            <View>
                <TextInput 
                multiline={true}
                style={[styles.input, styles.containerShadow]}
                onChangeText={setTask}
                value={task}
                ></TextInput>
            </View>
            <View>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={onSubmitHandler}>
                    <Text style={styles.posttext}>
                        Post
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    introtext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 25,
        paddingLeft: 10,
    },

    input: {
        color: colors.darkBlue,
        //fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: colors.pink,
        paddingBottom: 600,
        paddingTop: 30,
        paddingLeft: 10,
        borderRadius: 40,
        width: '90%',
        alignSelf:'center'
    },

    button: {
        borderRadius: 30,
        backgroundColor: colors.lightBlue,
        width: 100,
        alignSelf: 'center',
        height: 60,
        marginTop: 30
    },

    posttext: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 12,
        fontSize: 25

    },

    containerShadow: {
        shadowColor: colors.darkBlue,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 20,
    }

  });
