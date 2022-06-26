import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, Keyboard, ScrollView } from 'react-native';
import React, {useState, useEffect } from 'react';
import colors from '../assets/colors/colors.js';
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

export default function MakePostScreen() {

    const [task, setTask] = useState('');
    const [header, setHeader] = useState('');
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
                profileImg: currentUser.photoURL,
                timestamp: serverTimestamp(),
                email: currentUser.email
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
        setHeader('');
        Keyboard.dismiss();
    };

    return (
        <ScrollView>
            <SafeAreaView>
                <Text style={styles.introtext}>Make A Post!</Text>
            </SafeAreaView>
            <View>
                <TextInput
                style={[styles.header, styles.containerShadow]}
                onChangeText={setHeader}
                value={header}
                ></TextInput>
                <TextInput 
                //multiline={true}
                style={[styles.input, styles.containerShadow]}
                onChangeText={setTask}
                value={task}
                ></TextInput>
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
/*import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, Keyboard, ScrollView } from 'react-native';
import React, {useState, useEffect } from 'react';
import colors from '../assets/colors/colors.js';
import { addDoc,
         onSnapshot,
         query,
         collection,
         doc,
         deleteDoc, 
         serverTimestamp} from 'firebase/firestore'


import { db, auth } from '../firebase/index.js'

export default function MakePostScreen() {

    const [task, setTask] = useState('');
    const [header, setHeader] = useState('');
    const { currentUser } = auth;
    //const [taskList, setTaskList] = useState([]);

    /*const showRes = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    }; */

    /*const onSubmitHandler = async () => {
        if (task.length === 0) {
            // showRes('Task description cannot be empty!');
            return;
        }

        try {
            const taskRef = await addDoc(collection(db, 'tasks'), {
                post: task,
                header: header,
                username: currentUser.displayName,
                profileImg: currentUser.photoURL,
                timestamp: serverTimestamp(),
                email: currentUser.email
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
        setHeader('');
        Keyboard.dismiss();
    };

    return (
        <ScrollView>
            <SafeAreaView>
                <Text style={styles.introtext}>Make A Post!</Text>
            </SafeAreaView>
            <View>
                <TextInput
                style={[styles.header, styles.containerShadow]}
                onChangeText={setHeader}
                value={header}
                ></TextInput>
                <TextInput 
                //multiline={true}
                style={[styles.input, styles.containerShadow]}
                onChangeText={setTask}
                value={task}
                ></TextInput>
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

  }); */


