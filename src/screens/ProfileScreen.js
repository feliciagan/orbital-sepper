import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../assets/colors/colors.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { auth, db } from '../firebase/index.js';
import { doc, onSnapshot } from 'firebase/firestore';
import Avatar from '../components/Avatar.js';

export default function ProfileScreen({navigation}) {
    const user = auth.currentUser;

    const [userDetails, setUserDetails] = useState('');

    useEffect(() => {
        const docRef = doc(db, 'users', user.uid)

        const unsubscribe = onSnapshot(docRef, (doc) => {
            setUserDetails(doc.data())
        });

        return unsubscribe;

    }, []);

    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={styles.headerContainer}>
                <TouchableOpacity 
                    style={styles.settingsIcon}
                    onPress={() => navigation.navigate('LogOut')}>
                    <MaterialIcons name="settings" size={35} color={colors.darkBlue}></MaterialIcons>
                </TouchableOpacity>
            </SafeAreaView>

            <View style={styles.profpic}>
                <Avatar size={300} user={user}/>
            </View>

            <ScrollView vertical showsVerticalScrollIndicator={false} style={styles.profileContainer}>
                <Text style={styles.userImportantInfo}>{userDetails.name}</Text>
                        <View style={styles.infoBox}>
                            <Text style={styles.subText}>Uni</Text>
                            <Text style={styles.userInfo}>{userDetails.uniName}</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.subText}>Course</Text>
                            <Text style={styles.userInfo}>{userDetails.uniCourse}</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.subText}>Year</Text>
                            <Text style={styles.userInfo}>{userDetails.uniYear}</Text>
                        </View>
                        <View style={{marginVertical: 15, marginHorizontal: 10}}>
                            <Text style={{color: colors.darkBlue, fontSize: 18}}>{userDetails.bio}</Text>
                        </View>
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditProfileScreen")}>
                            <Text style={{color: colors.darkBlue, fontSize: 15}}>Edit profile</Text>
                        </TouchableOpacity>
                        <View style={{height: 35}}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create ({
    headerContainer: {
        //flexDirection: 'row', 
        //justifyContent: 'space-between',
    },
    settingsIcon: {
        alignSelf: 'flex-end',
        paddingVertical: 20,
        paddingRight: 10,
    },
    profpic: {
        borderRadius: 200,
        height: 300,
        width: 300,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",
    },
    profileContainer: {
        backgroundColor: colors.pink,
        marginTop: 20,
        paddingTop: 25,
        paddingHorizontal: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: '60%'
    },
    /*infoContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 32
    },*/
    infoBox: {
        //alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 20
    },
    userImportantInfo: {
        color: colors.darkBlue,
        fontSize: 40,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginBottom: 15
    },
    userInfo: {
        color: colors.darkBlue,
        fontSize: 24,
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500",
    },
    editButton: {
        backgroundColor: colors.darkPink, 
        marginTop: 10, 
        marginHorizontal: 50,
        paddingVertical: 5, 
        paddingHorizontal: 20, 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});
