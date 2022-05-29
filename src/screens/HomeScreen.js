import { View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors.js';

export default function HomeScreen() {

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
    },
    meetuptext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 25,
        backgroundColor: colors.pink,
        paddingBottom: 300,
        paddingTop: 10,
        paddingLeft: 10,
    },
    sayhellotext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 200,
        paddingTop: 20,
        paddingLeft: 10,
    },
  });
