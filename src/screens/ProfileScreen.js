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

        onSnapshot(docRef, (doc) => {
            setUserDetails(doc.data())
        })

    }, []);

    return (
        <View>
            <SafeAreaView style={styles.headerContainer}>
                <Text style={{color: colors.darkBlue, fontSize: 30, fontWeight: 'bold', paddingLeft: 20, paddingVertical: 20}}>Hi {user.displayName}!</Text>
                <TouchableOpacity 
                    style={styles.settingsIcon}
                    onPress={() => navigation.navigate('LogOut')}>
                    <MaterialIcons name="settings" size={35} color={colors.darkBlue}></MaterialIcons>
                </TouchableOpacity>
            </SafeAreaView>

            <View style={styles.profpic}>
                <Avatar size={300} user={user}/>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.profileContainer}>
                <Text style={styles.userImportantInfo}>{userDetails.name}</Text>
                
                <View style={styles.infoContainer}>
                        <View style={styles.infoBox}>
                            <Text style={styles.subText}>Year</Text>
                            <Text style={styles.userInfo}>{userDetails.uniYear}</Text>
                        </View>
                        <View style={[styles.infoBox, { borderColor: colors.blue, borderLeftWidth: 1, borderRightWidth: 1 }]}>
                            <Text style={styles.subText}>Course</Text>
                            <Text style={styles.userInfo}>{userDetails.uniCourse}</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.subText}>Uni</Text>
                            <Text style={styles.userInfo}>{userDetails.uniName}</Text>
                        </View>
                </View>

                <Text style={styles.userInfo}>{userDetails.bio}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create ({
    headerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    settingsIcon: {
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
        paddingLeft: 20,
        borderRadius: 50,
        height: '50%'
    },
    infoContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 32
    },
    infoBox: {
        alignItems: "center",
        flex: 1
    },
    userImportantInfo: {
        color: colors.darkBlue,
        fontSize: 40,
        fontWeight: 'bold',
        paddingLeft: 10
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
});
