import {Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors.js';
import Feather from 'react-native-vector-icons/Feather';

export default function ChatScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Chat</Text>
            <TouchableOpacity style={styles.searchIcon}>
                    <Feather name="search" size={40} color={colors.lightGray}></Feather>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.pink, 
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
    searchIcon: {
        paddingVertical: 20,
        paddingRight: 10,
    }
});
