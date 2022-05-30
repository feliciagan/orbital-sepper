import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function HeaderTabs(props) {
    
    return (
        <View style={styles.buttonWrapper}>
            <HeaderButton 
                text="Sign Up" 
                btnColor="rgb(255, 227, 227)" 
                textColor="rgb(24,47,84)" 
                activeTab={props.activeTab} 
                setActiveTab={props.setActiveTab}
            />
            <HeaderButton 
                text="Log In" 
                btnColor="rgb(24,47,84)" 
                textColor="black"
                activeTab={props.activeTab} 
                setActiveTab={props.setActiveTab}
            />
        </View>
    );
}

const HeaderButton = (props) => (
    <TouchableOpacity 
        style={[
            styles.indivButton, 
            {backgroundColor: props.activeTab === props.text ? "rgb(255, 227, 227)" : "rgb(220, 227, 244)"}
        ]}
        onPress={() => props.setActiveTab(props.text)}
    >
        <Text style={[
            styles.buttonWords, 
            {color: props.activeTab === props.text ? "rgb(24, 47, 84)" : "rgb(24, 47, 84)"}
        ]}
        >{props.text}</Text>
    </TouchableOpacity>
 
)

const styles = StyleSheet.create({
    buttonWrapper: {
        marginTop:20,
        flexDirection: "row",
        alignSelf: "center"
    },

    indivButton: {
         background: 'black',
         paddingVertical: 11,
         paddingHorizontal: 16,
         borderRadius: 30
    },

    buttonWords: {
        //text: "-",
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }

})

export default HeaderTabs;  