import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import colors from '../assets/colors/colors';
import { auth } from '../firebase';
import { updatePassword, signOut } from 'firebase/auth';

export default function ChangePasswordScreen({navigation}) {
    const [password, setPassword] = useState('');
    const {currentUser} = auth;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.pink}}>
        <BackButton press={() => navigation.goBack()}></BackButton>
        <Text style={{fontSize: 20, color: colors.darkBlue, marginTop: 100, marginLeft: 30}}>New password</Text>
        <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.textInput}
        />
        <TouchableOpacity
        style={{marginTop: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkPink,
        paddingVertical: 20, width: 150, alignSelf: 'center', borderRadius: 50}}
        onPress={() => {updatePassword(currentUser, password).catch((error) => {console.log('update unsuccessful')});
                        signOut(auth);}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Confirm</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    textInput: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 15,
        height: 40,
        width: '80%',
    }
});