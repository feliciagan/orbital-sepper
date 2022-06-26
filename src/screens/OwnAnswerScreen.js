import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AnswerInProfile from '../components/AnswerInProfile.js';
import { auth, db } from '../firebase/index.js'
import { onSnapshot, query, collection, orderBy, where } from 'firebase/firestore';
import colors from '../assets/colors/colors.js';

function OwnAnswerScreen({navigation}) {

    const { currentUser } = auth;
    const [ans, setAns] = useState([]);

    useEffect(
        () => onSnapshot(
            query(collection(db, "answers"), where("email", "==", currentUser.email)
            //, orderBy("timestamp", "desc")
            ),
            (snapshot) => {
                setAns(snapshot.docs);
            }
        ), [db]
    );

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.introtext}>Your Answers</Text>
        </View>
        <ScrollView style={styles.postContainer}>
            {ans.map((anss) => (
                <AnswerInProfile
                    key={anss.id}
                    id={anss.id}
                    ansID={anss.id}
                    userName={anss.data().username}
                    profilePic={anss.data().profileImg}
                    answer={anss.data().answer}
                    time={anss.data().timestamp.toDate()} 
                    indivpost={anss.data().postID}
                    header={anss.data().qnHeader}
                    OPImg={anss.data().OPImg}
                    navigation={navigation}
                />
                )
            )}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: colors.pink
    },

    headerContainer: {
        //flexDirection: 'row', 
        //justifyContent: 'space-between',
        alignContent: 'flex-start',
        height: 120
    }, 

    introtext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 40,
        paddingVertical: 50,
        paddingLeft: 10,
    },

    postContainer: {
        height: 300
    }
})
export default OwnAnswerScreen