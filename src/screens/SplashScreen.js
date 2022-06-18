import React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, View}  from 'react-native';


const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
            <Image style={styles.img} source={require('../assets/splashscreen.jpg')} />
            <Text style={styles.appName}>sepper</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'rgb(255, 227, 227)'
    },

    container: {
        alignItems: 'center',
        marginTop: 200
    },

    img: {
        width: 410,
        height: 310,
        alignSelf:'center'
    },

    appName: {
        fontSize: 50,
        color: 'rgb(24,47,84)',
        fontWeight: 'bold',
        alignSelf:'center'
    }
})

export default SplashScreen;