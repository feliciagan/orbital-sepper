import React from 'react'
import { Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import colors from '../assets/colors/colors.js';

export default function ForumScreen({navigation}) {
  return (
    <SafeAreaView style={styles.screen}>
        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('ForumFeedScreen')}>
            <Text style={styles.text}>Forum Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('MakePostScreen')} >
            <Text style={styles.text}>Make a Post</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity 
            style={styles.button}
            onPress={logoutHandler} >
            <Text style={styles.logout}>Make a Post</Text>
        </TouchableOpacity>*/}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.pink,
      flex: 1,
      justifyContent:'center',
      alignItems:'center'
    },

    button: {
  
        padding: 10,
        backgroundColor: colors.darkPink,
        borderRadius: 30,
        marginBottom: 30,
        width: '70%',
        height: 60,
    }, 

    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center'
      }
});
