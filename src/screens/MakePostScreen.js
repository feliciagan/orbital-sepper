import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, Keyboard, ScrollView } from 'react-native';
import React, {useState, useEffect } from 'react';
import colors from '../assets/colors/colors.js';
import BackButton from '../components/BackButton.js';
import RNPickerSelect from 'react-native-picker-select';
import { addDoc,
         setDoc,
         onSnapshot,
         query,
         collection,
         doc,
         deleteDoc, 
         getDocs,
         serverTimestamp} from 'firebase/firestore'


import { db, auth } from '../firebase/index.js'

export default function MakePostScreen({navigation}) {

    const [task, setTask] = useState('');
    const [header, setHeader] = useState('');
    const [anon, setAnon] = useState(false);
    const [tag, setTag] = useState('');
    const { currentUser } = auth;
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
                header: header,
                username: currentUser.displayName,
                anon: anon,
                tag: tag,
                profileImg: currentUser.photoURL,
                timestamp: serverTimestamp(),
                email: currentUser.email,
                likes: 0

            });

            console.log('onSubmitHandler success', taskRef.id);
            //showRes('Successfully added task!');
            clearForm();

            navigation.goBack()
        } catch (err) {
            console.log('onSubmitHandler failure', err);
            //showRes('Failed to add task!');
        }
    };

    const clearForm = () => {
        setTask('');
        setHeader('');
        Keyboard.dismiss();
    };

    return (
        <ScrollView>
            <SafeAreaView>
            <BackButton press={() => navigation.goBack()}></BackButton>
                <Text style={styles.introtext}>Make A Post!</Text>
            </SafeAreaView>
            <View>
                <TextInput
                style={[styles.header, styles.containerShadow]}
                onChangeText={setHeader}
                value={header}
                placeholder="Type a Question Header!"
                ></TextInput>
                <TextInput 
                //multiline={true}
                style={[styles.input, styles.containerShadow]}
                onChangeText={setTask}
                value={task}
                placeholder="Type your question here!"
                ></TextInput>
            </View>
            <View style={{marginLeft: 30, marginTop : 30}}>
            <RNPickerSelect
                onValueChange={(value) => setTag(value)}
                placeholder={{label: 'Choose Topic', value: null}}
                items={[
                    { label: 'NUS academics', value: 'NUS academics' },
                    { label: 'NUS school life', value: 'NUS school life' },
                    { label: 'Singapore', value: 'Singapore' },
                    { label: 'Others', value: 'Others' },
                ]}
            />
            </View>
            <View style={{marginLeft: 30, marginTop : 30}}>
            <RNPickerSelect
                onValueChange={(value) => setAnon(value)}
                placeholder={{label: 'Set Anonymity?', value: null}}
                items={[
                    { label: 'Be Anonymous', value: true },
                    { label: 'Show Username', value: false },
                ]}
            />
            </View>
            <TouchableOpacity 
                style={styles.button}
                onPress={onSubmitHandler}>
                <Text style={styles.posttext}>
                    Post
                </Text>
            </TouchableOpacity>
        </ScrollView>
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

    header: {
        width: '90%',
        height: 60,
        backgroundColor: colors.pink,
        alignSelf:'center',
        borderRadius: 30,
        paddingLeft: 10,
        color: colors.darkBlue,
        fontSize: 20,
        fontWeight: 'bold',
    },

    input: {
        color: colors.darkBlue,
        //fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: colors.pink,
        marginTop: 35,
        height: 550,
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
        marginTop: 30,
        marginBottom: 60
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


