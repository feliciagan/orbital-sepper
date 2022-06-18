import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors/colors.js';
import Feather from 'react-native-vector-icons/Feather';

export default function ForumScreen() {
    const [activeTab, setActiveTab] = useState('Newest');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.headerContainer}>
                <Text style={styles.introtext}>Forum</Text>
                <TouchableOpacity style={styles.searchIcon}>
                    <Feather name="search" size={40} color={colors.lightGray}></Feather>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.buttonContainer}>
                <TabButton text={'Newest'} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabButton text={'Most liked'} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </SafeAreaView>
            <View style={styles.feed}>
            <FlatList
                data={taskList}
                renderItem={({ item, index }) => (
                     <Task
                        data={item}
                        key={index}
                        //onDelete={onDeleteHandler}
                    />
                )}
                style={styles.list}
                showsVerticalScrollIndicator={true}
            />
            </View>
        </View>
    );
}

const TabButton = (props) => {
    return (
    <TouchableOpacity 
        style={{
            backgroundColor: colors.lightBlue,
            paddingVertical: 25,
            width: '50%'
        }}
        onPress={() => props.setActiveTab(props.text)}>
            <Text style={{
                color: props.activeTab === props.text ? colors.darkBlue : colors.blue,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center'
            }}>{props.text}</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.pink,
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    introtext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 40,
        paddingVertical: 20,
        paddingLeft: 10,
    },
    searchIcon: {
        paddingVertical: 20,
        paddingRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        //backgroundColor: 'lightpink'
    },
    feed: {
        //backgroundColor:'black',
        height: 500,
        width: 500,
    
        
    }
});