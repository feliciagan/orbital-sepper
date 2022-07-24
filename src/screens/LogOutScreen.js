import React from 'react';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import colors from '../assets/colors/colors';
import BackButton from '../components/BackButton';
import { auth, db } from '../firebase/index.js';
import { signOut, deleteUser } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';

const LogOutScreen = ({props, navigation}) => {
  const {currentUser} = auth;
  
  const logoutHandler = () => {
    signOut(auth).then(() => {
        //props.setIsAuth(false);
    });
  };

  const accountDeleteHandler = async() => {
    const userId = currentUser.uid;
    deleteUser(currentUser).then(() => {
      deleteDoc(doc(db, "users", userId));
    }).catch((error) => {
      console.log("delete unsuccessful")
    });
  };

  return (
    <SafeAreaView style={styles.screen} >
      <BackButton press={() => navigation.goBack()}></BackButton>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("ChangePasswordScreen")} >
        <Text style={styles.logout}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={logoutHandler} >
        <Text style={styles.logout}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('OwnPostScreen')} >
        <Text style={styles.logout}>Your Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('OwnAnswerScreen')} >
        <Text style={styles.logout}>Your Answers</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={accountDeleteHandler}>
        <Text style={styles.logout}>Delete Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.pink,
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center'
    
  },

  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 10,
    backgroundColor: colors.darkPink,
    borderRadius: 30,
    marginTop: 10,
    width: '70%',
    height: 60,

  },

  logout: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 27,
    alignSelf: 'center'
  }
})

export default LogOutScreen;