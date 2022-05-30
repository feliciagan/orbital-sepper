import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

const THEME = '#3F3F3F';

const AuthTextInput = props => {
    const { secureTextEntry, keyboardType, placeholder, value, textHandler } =
        props;

    return (
        <TextInput
            style={styles.textInput}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value}
            onChangeText={textHandler}
            selectionColor={THEME}
        />
    );
};

export default AuthTextInput;

const styles = StyleSheet.create({
    textInput: {
        width: '70%',
        height: 50,
        borderWidth:2,
        borderColor: 'white',
        borderRadius: 30,
        alignSelf:'center',
        backgroundColor: 'white'
    }
});