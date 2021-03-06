import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard, Platform } from "react-native";
import HeaderTabs from '../components/HeaderTabs.js'

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification
} from 'firebase/auth';

import AuthTextInput from '../components/auth/AuthTextInput.js';
import { auth } from '../firebase/index.js';
import colors from "../assets/colors/colors.js";
import { NavigationContainer } from "@react-navigation/native";


const LogInScreen = ({navigation}) => {

  const [activeTab, setActiveTab] = useState("Log In");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    if (email.length === 0 || password.length === 0) {
        
        return;
    }

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;

            console.log(user);

            restoreForm();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error('[loginHandler]', errorCode, errorMessage);
        });

};

const signUpHandler = async () => {
    if (email.length === 0 || password.length === 0) {
     
        return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;

            console.log(user);

            restoreForm();

            sendEmailVerification(auth.currentUser);
           
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error('[signUpHandler]', errorCode, errorMessage);
        });
};

const restoreForm = () => {
    setEmail('');
    setPassword('');
    Keyboard.dismiss();
};

  return (
    <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
    <SafeAreaView style={styles.mainPage}>
        
        <HeaderTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
         />   
        
        <Text style={styles.appName}>sepper</Text>

        <View style={styles.userWrapper}>
            <Text style={styles.heading}>Email</Text>
            <AuthTextInput 
                value={email}
                placeholder="Your Email"
                textHandler={setEmail}
                keyboardType="email-address"
            />
        </View>
        <View style={styles.userWrapper}>
            <Text style={styles.heading}>Password</Text>
            <AuthTextInput  
                    value={password}
                    placeholder="Your Password"
                    textHandler={setPassword}
                    secureTextEntry
            />
        </View>
        {activeTab === "Log In" 
        ? <TouchableOpacity
        style={{alignSelf:'center', marginTop: 10}}
        onPress={() => navigation.navigate("ResetPasswordScreen")}>
            <Text style={{fontSize: 15, color: colors.darkBlue}}>Reset password</Text>
        </TouchableOpacity>
        : <></>}
        <TouchableOpacity style={styles.signIn}
                          testID="login"
                          onPress={activeTab === "Log In" ? loginHandler : signUpHandler}>
            <Text style={styles.buttonWords}>{activeTab === "Log In" ? "Log In" : "Sign Up"}</Text>
        </TouchableOpacity> 
        <Image style={styles.img} source={require('../assets/globe.png')} /> 
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    changeScreen: {
        marginLeft: 300,
        padding: 10,
        backgroundColor: 'rgb(255, 227, 227)',
        borderRadius: 30,
        marginTop: 15,
        width: 75,
        height: 35,
    },

    word: {
        marginTop: -3,
        marginLeft: -1,
        fontSize: 15,
        alignSelf: 'center',
        color: 'rgb(24,47,84)',
        fontWeight: 'bold'
    },

    mainPage: {
        flex: 1,
        backgroundColor: 'rgb(220, 227, 244)',

    },

    appName: {
        fontWeight: 'bold',
        fontSize: 80,
        color: 'rgb(24,47,84)',
        textAlign: 'center',
    },

    userWrapper: {
        paddingTop: 40,
        paddingBottom:0,
    },

    heading: {
        fontSize: 25,
        paddingLeft: 80,
        color: 'rgb(24,47,84)'
    },

    signIn: {
        alignSelf: 'center',
        padding: 10,
        backgroundColor: 'rgb(255, 227, 227)',
        borderRadius: 30,
        marginTop: 50,
        width: '70%',
        height: 50,
    },

    buttonWords: {
        marginTop: -5,
        fontSize: 30,
        alignSelf: 'center',
        color: 'rgb(24,47,84)'
    }
});

export default LogInScreen;