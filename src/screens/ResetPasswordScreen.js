import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/colors/colors';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPasswordScreen({navigation}) {
    const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.pink}}>
        <TouchableOpacity 
                style={{alignSelf: 'flex-start'}}
                onPress={() => navigation.goBack()}>
                <Ionicons name='chevron-back' size={30} color={colors.darkBlue}></Ionicons>
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: colors.darkBlue, marginTop: 100, marginLeft: 30}}>Email</Text>
        <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
        />
        <TouchableOpacity
        style={{marginTop: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkPink,
        paddingVertical: 20, width: 150, alignSelf: 'center', borderRadius: 50}}
        onPress={() => {sendPasswordResetEmail(auth, email)
                            .catch((error) => {const errorCode = error.code;
                                                const errorMessage = error.message;
                                                console.error(errorCode, errorMessage);});
                            navigation.goBack();}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Send</Text>
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