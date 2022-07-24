import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { addDoc,
    onSnapshot,
    getDocs,
    query,
    collection,
    doc,
    deleteDoc, 
    where,
    serverTimestamp,
    writeBatch} from 'firebase/firestore'

import { db, auth } from '../firebase/index.js'
import Avatar from '../components/Avatar.js';
export default function ForumInProfile ({ indivpost, userName, profilePic, post, time, header, navigation }) {

    const user =  auth.currentUser;
    const onDeleteHandler = async (id) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));
            /*const ans = query(collection(db, "answers"), where("postID", "==", id));
            const batch = writeBatch(db);
            ans.forEach(doc => {
                batch.delete(doc);
            });
            await batch.commit(); */

            const ans = collection(db, "answers");
            const myQuery = query(ans, where("postID", "==", id));
            console.log(myQuery);
            const mySnapshot = await getDocs(myQuery);
            await Promise.all(mySnapshot.forEach((docc) => {
                deleteDoc(doc(db, "answers", docc.id))
            }));
            /*if (snapshot.empty) {
                console.log('No matching documents.');
                return;
              }  
              
              snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
              });
            //await deleteDoc(doc(db, 'answers', id), where("postID", "==", id));
            //await Promise.all([deleteDoc(doc(db, 'tasks', id))])
            console.log('onDeleteHandler success', id); */

            //showRes('Successfully deleted task!');
        } catch (err) {
            console.log('onDeleteHandler failure', err);
            //showRes('Failed to delete task!');
        }
    };

    const postDate = time;
    const todayDate = new Date();
    const diffTime = Math.abs(todayDate - postDate);
    const diffInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const printedOut = diffInDays <= 1 
                        ? Math.ceil(Math.abs(todayDate - postDate) / (60*60*1000)) + ' hours ago'
                        : diffInDays + ' days ago';
    //const individualpost = indivpost
    return(
        <TouchableOpacity style={styles.postcontainer}
                          onPress={() => 
                            navigation.navigate('AnswerPostScreen', {
                                userName: userName,
                                profilePic: profilePic,
                                indivpost: indivpost,
                                post: post,
                                header: header
                            })}>
            <View style= {styles.top}>
                <View style={styles.img}>
                    <Avatar size={70} user={user} />
                </View>
                {/*<Image style={styles.img} source = {{uri:profilePic}}></Image>*/}
                <Text style={styles.header}>{header}</Text>
                <TouchableOpacity 
                    style={styles.trash}
                    onPress={() => onDeleteHandler(indivpost)}
                >
                    <Ionicons name="trash-outline" size={25} color={colors.darkPink} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.edit}
                    onPress={() => navigation.navigate('EditPostScreen', {
                        //ansID: ansID, 
                        userName: userName,
                        profilePic: profilePic,
                        indivpost: indivpost,
                        post: post,
                        header: header,
                        indivpost: indivpost
                    })}
                >
                    <Ionicons name="create-outline" size={25} color={colors.darkPink} />
                </TouchableOpacity>
            </View>
            <Text style={styles.post}>{post}</Text>
            <Text style={styles.time}>{printedOut}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    top: {
        //backgroundColor: 'grey',
        flexDirection: 'row',
        //position: 'absolute'
    },

    postcontainer: {
        height: 170,
        width: 350,
        borderRadius : 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 20

    },

    header: {
        position: 'absolute',
        marginLeft: 115,
        marginTop: 30,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.darkBlue
    },

    trash: {
        marginLeft: 180,
        marginTop: 27,

    },

    img: {
        //width: 70,
        //height: 70,
        //borderRadius: 100,
        marginLeft: 30,
        marginTop: 10
    },

    post : {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 15
    },

    edit: {
        marginTop: 27,
        marginLeft: 15                                                                                                                                                                  
    },

    time : {
        marginLeft: 30,
        marginTop: 15,
        fontSize: 13,
        color: colors.blue
    }
})
