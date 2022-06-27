import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView} from 'react-native';
import colors from '../assets/colors/colors.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Answer from '../components/Answer.js';
import { useRoute } from '@react-navigation/native'
import { addDoc,
    setDoc,
    onSnapshot,
    query,
    collection,
    doc,
    deleteDoc, 
    getDocs,
    where,
    serverTimestamp} from 'firebase/firestore'
import { db, auth } from '../firebase/index.js'

const AnswerPostScreen = ({ route, navigation }) => {
  
  const { userName, profilePic, indivpost, post, header } = route.params;
  const [answer, setAnswer] = useState('');
  const [ans, setAns] = useState([])
  const { currentUser } = auth;
  /*const handleChange = (e) => {
    setDetails({
        ...details,
        [e.target.name]: e.target.value,
    });
  }; */

  useEffect(
    () => onSnapshot(
        query(collection(db, "answers"), where("postID", "==", Object.values({indivpost})[0])),
        (snapshot) => {
            setAns(snapshot.docs);
        }
    ), [db]
);
 
  const onSubmitHandler = async () => {
    if (answer.length === 0) {
        // showRes('Task description cannot be empty!');
        return;
    }

    try { //use setDoc so user can edit answer
        const answerRef = await addDoc(collection(db, 'answers',), {
            answer: answer,
            username: currentUser.displayName,
            profileImg: currentUser.photoURL,
            timestamp: serverTimestamp(),
            email: currentUser.email,
            postID: Object.values({indivpost})[0],
            qnHeader: Object.values({header})[0],
            OPImg: Object.values({profilePic})[0]
        });

        console.log('onSubmitHandler success', );
        //showRes('Successfully added task!');
        clearForm();
    } catch (err) {
        console.log('onSubmitHandler failure', err);
        //showRes('Failed to add task!');
    }
  };


    const clearForm = () => {
        setAnswer('');
        Keyboard.dismiss();
    };

  return (
    <View style={styles.page}>
        <View style={styles.headerContainer}>
            {/*<Image style={styles.img} source = {{uri:profilePic}}></Image>*/}
            <Image style={styles.img} source = {require("../assets/avatar1.png")} />
            <View>
                <Text style={styles.username}>@{userName}</Text> 
                <Text style={styles.asks}>asks</Text> 
            </View>
            
        </View>
        <ScrollView style={styles.answerFeed}>
            <View>
                <Text style={styles.question}>
                    "{post}"
                </Text>
            </View>
            {ans.map((ans) => (
                    <Answer
                        key={ans.id}
                        id={ans.id}
                        indivpost={ans.id}
                        userName={ans.data().username}
                        profilePic={ans.data().profileImg}
                        post={ans.data().answer}
                        //time={ans.data().timestamp.toDate()} 
                        //header={ans.data().header}
                        navigation={navigation}
                    />
                  )
                )}  
        
        <TextInput style={styles.input} 
                   multiline={true}
                   value={answer}
                   placeholder="type a response!"
                   onChangeText={setAnswer}></TextInput>
        
        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
            <Ionicons name="send-sharp" size={32} color={colors.darkPink} />
        </TouchableOpacity>
        </ScrollView>
    </View>
        
  )
}

export default AnswerPostScreen

const styles = StyleSheet.create({

    page: {
        backgroundColor: colors.pink,
        flex: 1
    },

    headerContainer: {
        flexDirection: 'row', 
        //justifyContent: 'spa',
        height: 130
    },

    username: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
        fontWeight: 'bold',
        paddingLeft: 20,
        //paddingRight: 140,
        paddingTop: 60,
    },

    question: {
        color: colors.darkPink,
        fontSize: 30,
        paddingVertical: 10,
        paddingLeft: 30,
    },

    asks:{
        fontSize: 15,
        color:'white',
        fontStyle: 'italic',
        fontWeight: 'bold',
        paddingLeft: 30,
        
        //paddingLeft: 20
        
    },

    img: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginLeft: 30,
        marginTop: 50
    },

    input: {
        height: '30%',
        backgroundColor: colors.lightBlue,
        borderRadius: 30,
        paddingTop: 50,
        paddingLeft : 30
    },

    button: {
        marginTop : - 50,
        marginBottom: 750,
        alignSelf: 'flex-end',
        marginRight: 20
    },

    answerFeed: {
        backgroundColor: colors.pink,
        height: '2%'
    }

})