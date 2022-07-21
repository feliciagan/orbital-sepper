import { View, SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, Button, DatePickerAndroid } from 'react-native';
import React, { useState } from 'react';
import colors from '../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db } from '../firebase/index.js';
import { setDoc, doc, collection } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import "react-native-get-random-values";
import { nanoid } from "nanoid";

export default function MeetUpScreen() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [location, setLocation] = useState('');
    const { currentUser } = auth;
    const navigation = useNavigation();
    const route = useRoute();
    const userB = route.params.userB;

    async function handlePress() {
        date.setHours(time.getHours());
        date.setMinutes(time.getMinutes());

        const randomId = nanoid();

        await Promise.all([ 
            setDoc(doc(collection(doc(db, "users", currentUser.uid), "meetups"), randomId), 
                {date: date,
                location: location,
                friend: userB.displayName,
                friendUID: userB.uid}),
            setDoc(doc(collection(doc(db, "users", userB.uid), "meetups"), randomId), 
                {date: date,
                location: location,
                friend: currentUser.displayName,
                friendUID: currentUser.uid})
        ]);

        navigation.goBack();
    };

  return (
    <View style={{
        flex: 1,
        backgroundColor: colors.pink,
        paddingLeft: 30
    }}>
        <SafeAreaView>
            <TouchableOpacity 
                style={{alignSelf: 'flex-start'}}
                onPress={() => navigation.goBack()}>
                <Ionicons name='chevron-back' size={30} color={colors.darkBlue}></Ionicons>
            </TouchableOpacity>
            <Text style={{color: colors.darkBlue, fontSize: 40, fontWeight: 'bold', paddingTop: 30, paddingBottom: 20}}>MeetUp</Text>
        </SafeAreaView>
        <View>
            <Text style={styles.datetimeText}>Date:</Text>
            <DateTimePicker 
            mode="date"
            value={date}
            onChange={(event, date) => setDate(date)} />
            <Text style={styles.datetimeText}>Time:</Text>
            <DateTimePicker 
            mode="time" 
            value={time}
            minuteInterval={30}
            onChange={(event, time) => setTime(time)}/>
            <Text style={styles.datetimeText}>Location:</Text>
            <TextInput
            value={location}
            onChangeText={setLocation}
            style={styles.textInput}
            />
            <TouchableOpacity 
            style={{backgroundColor: colors.darkBlue, marginTop: 100, marginRight: 30,
            paddingVertical: 15, paddingHorizontal: 20, borderRadius: 20, alignItems: 'center'}}
            onPress={handlePress}>
                <Text style={{color: colors.lightBlue, fontSize: 20, fontWeight: 'bold'}}>Confirm</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    datetimeText: {
        fontSize: 20,
        color: colors.darkBlue,
        marginTop: 30
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        height: 40,
        width: '80%',
    }
});