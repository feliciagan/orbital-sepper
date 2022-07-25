import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TextInput, Image, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView} from 'react-native';
import colors from '../assets/colors/colors.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { MaterialCommunityIcons } from "@expo/vector-icons";

import BackButton from '../components/BackButton.js';

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
    orderBy,
    where,
    increment,
    updateDoc,
    serverTimestamp } from 'firebase/firestore'

import { db, auth } from '../firebase/index.js'
import RNPickerSelect from 'react-native-picker-select';

const AnswerPostScreen = ({ route, navigation }) => {
  
  const { userName, anon, tag, profilePic, indivpost, post, header } = route.params;
  const [answer, setAnswer] = useState('');
  const [ans, setAns] = useState([]);
  const [anonymous, setAnonymous] = useState(false);
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const { currentUser } = auth;
  const [liked, setLiked] = useState(false);
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

useEffect(() => {
    const likedQuery = doc(collection(db, "tasks", indivpost, "likes"), currentUser.uid);
    
    const unsubscribe = onSnapshot(likedQuery, (snapshot) => {
        let currentUserLike = false;
        if (snapshot.exists()) {
            currentUserLike = true;
        }
        setCurrentUserLike(currentUserLike);
    });

    return unsubscribe;
}, []);

useEffect(() => {
    const likesRef = doc(db, "tasks", indivpost);
    
    const unsubscribe = onSnapshot(likesRef, (doc) => {
        setLikes(doc.get("likes"));
    });

    return unsubscribe;
}, []);
 
  const onSubmitHandler = async () => {
    if (answer.length === 0) {
        // showRes('Task description cannot be empty!');
        return;
    }

    try { //use setDoc so user can edit answer
        const answerRef = await addDoc(collection(db, 'answers',), {
            answer: answer,
            username: currentUser.displayName,
            anonymous: anonymous,
            profileImg: currentUser.photoURL,
            timestamp: serverTimestamp(),
            email: currentUser.email,
            postID: Object.values({indivpost})[0],
            qnHeader: Object.values({header})[0],
            OPImg: Object.values({profilePic})[0],
            likes: 0
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

    const onLike = async() => {
        setCurrentUserLike(true);
        await Promise.all([
            updateDoc(doc(db, "tasks", indivpost), {likes: increment(1)}),
            setDoc(doc(collection(doc(db, "tasks", indivpost), "likes"), currentUser.uid), 
                {user: currentUser.uid}),
        ]);
    };

    const onUnlike = async() => {
        setCurrentUserLike(false);
        await Promise.all([
            updateDoc(doc(db, "tasks", indivpost), {likes: increment(-1)}),
            deleteDoc(doc(collection(doc(db, "tasks", indivpost), "likes"), currentUser.uid)),
        ]);
    }

  return (
    <SafeAreaView style={styles.page}>
        <BackButton press={() => navigation.goBack()}></BackButton>
        
        <ScrollView style={styles.answerFeed}>
        <View style={styles.headerContainer}>

        {profilePic 
                ? !anon
                ? <Image style={styles.img} source = {{uri:profilePic}} /> 
                : <Image style={styles.img} source = {require("../assets/avatar1.png")} /> 
                : <Image style={styles.img} source = {require("../assets/avatar1.png")} /> }
            <View style={{flexShrink: 1}}>
                <Text style={styles.username}>{ !anon ? `@${userName}` : "anon"}</Text> 
                <Text style={styles.asks}>asks</Text> 
            </View>

        </View>
            <Text style={styles.question}>
                    "{post}"
            </Text>
            <View style={{alignSelf: 'flex-end', marginRight: 20, marginBottom: 20}}>
            <TouchableOpacity
            style={{}}
            onPress={currentUserLike === true ? onUnlike : onLike}>
                <Ionicons name='heart' color={currentUserLike ? colors.darkPink : 'white'} size={30}></Ionicons>
            </TouchableOpacity>
            <Text style={{fontSize: 13, color: colors.darkBlue}}>{likes !== 0 ? likes : ''}</Text>
            </View>
            {ans.map((ans) => (
                    <Answer
                        key={ans.id}
                        id={ans.id}
                        indivpost={ans.id}
                        userName={ans.data().username}
                        anonymous={ans.data().anonymous}
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightBlue,
                        paddingVertical: 10, borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
        <View style={{marginLeft: 20, }}>
            <RNPickerSelect
                onValueChange={(value) => setAnonymous(value)}
                placeholder={{label: 'Set Anonymity?', value: null}}
                items={[
                    { label: 'Be Anonymous', value: true },
                    { label: 'Show Username', value: false },
                ]}
            />
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
            <Ionicons name="send-sharp" size={32} color={colors.darkPink} />
        </TouchableOpacity>
        </View>
        <View style={{height: 750}}></View>
        </ScrollView>
    </SafeAreaView>
        
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
        alignItems: 'center',
        paddingVertical: 10,
    },

    username: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 20,
        flexShrink: 1
    },

    likebutton: {
        paddingTop: 60,
        alignSelf: 'center',
        paddingLeft: 20,
        justifyContent: 'flex-end'
    },

    question: {
        color: colors.darkPink,
        fontSize: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },

    asks:{
        fontSize: 15,
        color:'white',
        fontStyle: 'italic',
        fontWeight: 'bold',
        paddingLeft: 30,
    },

    img: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginLeft: 30,
    },

    input: {
        height: '30%',
        backgroundColor: colors.lightBlue,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 50,
        paddingLeft : 30,
    },

    button: {
        marginRight: 20
    },

    answerFeed: {
        backgroundColor: colors.pink,
    }

})