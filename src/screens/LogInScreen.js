import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView , StyleSheet, TouchableOpacity, TextInput, Image} from "react-native";
//import HeaderTabs from '../../HeaderTabs.js';

const LogInScreen = ({navigation}) => {

  const [activeTab, setActiveTab] = useState("Log In");

  return (
    <SafeAreaView style={styles.mainPage}>
        <TouchableOpacity style={styles.changeScreen}
                          onPress={() => navigation.navigate('SignUpScreen')}
        >
            <Text style={styles.word}>Sign Up</Text>
        </TouchableOpacity>
        
        <Text style={styles.appName}>sepper</Text>
        
        <View style={styles.userWrapper}>
            <Text style={styles.heading}>Username</Text>
            <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.userWrapper}>
            <Text style={styles.heading}>Email</Text>
            <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.userWrapper}>
            <Text style={styles.heading}>Password</Text>
            <TextInput style={styles.input} secureTextEntry></TextInput>
        </View>
        <TouchableOpacity style={styles.signIn}
                          onPress={() => navigation.navigate('TabNavigator')}>
            <Text style={styles.buttonWords}>Log In</Text>
        </TouchableOpacity> 
        <Image style={styles.img} source={require('../assets/globe.png')} /> 
    </SafeAreaView>
  )
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
        //justifyContent: 'flex-start',
    },

    appName: {
        fontWeight: 'bold',
        fontSize: 80,
        color: 'rgb(24,47,84)',
        textAlign: 'center',
    },

    userWrapper: {
        //height: 70,
        paddingTop: 30,
        paddingBottom:0,
        //backgroundColor: 'black'
    },

    heading: {
        fontSize: 36,
        paddingLeft: 80,
        color: 'rgb(24,47,84)'
        //textShadowColor:'black'
    },

    input: {
        width: '70%',
        height: 50,
        borderWidth:2,
        borderColor: 'white',
        borderRadius: 30,
        alignSelf:'center',
        backgroundColor: 'white'
    },

    signIn: {
        alignSelf: 'center',
        padding: 10,
        backgroundColor: 'rgb(255, 227, 227)',
        borderRadius: 30,
        marginTop: 50,
        width: '70%',
        height: 50,
        //shadowColor: 'black'
    },

    buttonWords: {
        marginTop: -5,
        fontSize: 30,
        alignSelf: 'center',
        color: 'rgb(24,47,84)'
    }
});

export default LogInScreen