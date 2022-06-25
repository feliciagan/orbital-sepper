import React from 'react';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import colors from '../assets/colors/colors';
import { auth } from '../firebase/index.js';
import { signOut } from 'firebase/auth';

const LogOutScreen = ({props, navigation}) => {
  
  const logoutHandler = () => {
    signOut(auth).then(() => {
        props.setIsAuth(false);
    });
  };

  return (
    <SafeAreaView style={styles.screen} >
      <TouchableOpacity 
        style={styles.button}
        onPress={logoutHandler} >
        <Text style={styles.logout}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('OwnPostScreen')} >
        <Text style={styles.logout}>User's own post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.pink,
    flex: 1
  },

  button: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: colors.darkPink,
    borderRadius: 30,
    marginTop: 320,
    width: '70%',
    height: 60,

  },

  logout: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center'
  }
})

export default LogOutScreen;