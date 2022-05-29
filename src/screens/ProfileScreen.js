import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ProfileScreen() {
    return (
        <View>
            <SafeAreaView style={styles.headerContainer}>
                <Text style={styles.header}>User</Text>
                <TouchableOpacity style={styles.settingsIcon}>
                    <MaterialIcons name="settings" size={40} color={colors.lightGray}></MaterialIcons>
                </TouchableOpacity>
            </SafeAreaView>

            <View style={{height: 245}}></View>

            <View style={styles.profileContainer}>
                <Text style={styles.userInfo}>User Information</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    headerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    header: {
        color: colors.darkBlue,
        fontSize: 40,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingVertical: 20,
    },
    settingsIcon: {
        paddingVertical: 20,
        paddingRight: 10,
    },
    profileContainer: {
        backgroundColor: colors.pink,
        borderRadius: 15,
        height: 350,
        
    },
    userInfo: {
        color: colors.darkBlue,
        fontSize: 30,
        fontWeight: 'bold',
    }
});
