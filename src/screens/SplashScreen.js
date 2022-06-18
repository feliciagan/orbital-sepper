import {Text, View} from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors.js';

export default function SplashScreen() {
    return (
        <View style={{flex: 1, backgroundColor: colors.darkPink}}>
            <Text>SplashScreen</Text>
        </View>
    );
}