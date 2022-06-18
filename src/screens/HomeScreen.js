import { View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors.js';
import AppLoading from 'expo-app-loading';
import { useFonts, Comfortaa_700Bold, Comfortaa_300Light } from '@expo-google-fonts/comfortaa';
  
export default function HomeScreen() {

    let [fontsLoaded] = useFonts({
        Comfortaa_700Bold,
        Comfortaa_300Light
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }

    return (
        <View>
            <SafeAreaView>
                <Text style={styles.introtext}>Hi user!</Text>
            </SafeAreaView>
            <View>
                <Text style={styles.meetuptext}>Upcoming meet-ups</Text>
            </View>
            <View>
                <Text style={styles.sayhellotext}>say hello to</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    introtext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 40,
        paddingBottom: 10,
        paddingLeft: 10,
        fontFamily: 'Comfortaa_700Bold'
    },

    meetuptext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 25,
        backgroundColor: colors.pink,
        paddingBottom: 300,
        paddingTop: 10,
        paddingLeft: 10,
        fontFamily: 'Comfortaa_300Light'
    },
    sayhellotext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 200,
        paddingTop: 20,
        paddingLeft: 10,
        fontFamily: 'Comfortaa_300Light'
    }
  });
