import React from "react";
import { TouchableOpacity } from "react-native";
import colors from "../assets/colors/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BackButton(props) {
    return (
        <TouchableOpacity 
            style={{alignSelf: 'flex-start'}}
            onPress={props.press}>
            <Ionicons name='chevron-back' size={30} color={colors.darkBlue}></Ionicons>
        </TouchableOpacity>
    );
}