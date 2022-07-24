import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList, TouchableOpacity, Modal} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import colors from '../assets/colors/colors.js';
import AppLoading from 'expo-app-loading';
import { useFonts, Comfortaa_700Bold, Comfortaa_300Light } from '@expo-google-fonts/comfortaa';

import { collection, doc, onSnapshot, query, where, orderBy, deleteDoc, updateDoc, arrayUnion } from "@firebase/firestore";
import RBSheet from 'react-native-raw-bottom-sheet';
import GlobalContext from "../context/GlobalContext.js";
import { auth, db } from "../firebase";
import Avatar from '../components/Avatar.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
    /*let [fontsLoaded] = useFonts({
        Comfortaa_700Bold,
        Comfortaa_300Light
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }*/

    const { currentUser } = auth;
    //const [notShownProfiles, setNotShownProfiles] = useState([]);
    const [userList, setUserList] = useState([]);
    const [meetupList, setMeetupList] = useState([]);
    const { unfilteredRooms, rooms } = useContext(GlobalContext);
    
    /*useEffect(() => {
        const hiddenProfileRef = doc(db, 'users', currentUser.uid);

        const usersQuery = query(collection(db, 'users'), 
                            where("email", "not-in", notShownProfiles));

        const unsubscribe = onSnapshot(hiddenProfileRef, (doc) => {
            setNotShownProfiles(doc.get("hiddenProfiles"));
            //console.log(notShownProfiles);

            const usersQuery = query(collection(db, 'users'), 
                            where("email", "not-in", notShownProfiles));
            
            onSnapshot(usersQuery, (snapshot) => {
                const users = [];
                    
                snapshot.forEach((doc) => {
                    users.push({ id: doc.id, ...doc.data() });
                });
                    
                setUserList([...users]);
            });
            
        });

        return () => {
            onSnapshot(hiddenProfileRef, (doc) => {
                setNotShownProfiles(doc.get("hiddenProfiles"));
            });
            const usersQuery = query(collection(db, 'users'), 
                            where("hiddenProfiles", "not-in", [currentUser.email]));
            onSnapshot(usersQuery, (snapshot) => {
                const users = [];
                    
                snapshot.forEach((doc) => {
                    users.push({ id: doc.id, ...doc.data() });
                });
                    
                setUserList([...users]);
    
            });

        };
    }, [notShownProfiles, userList]);*/
    
    useEffect(() => {
        const usersQuery = query(collection(db, 'users'), where("uid", "!=", currentUser.uid));
                            //where("hiddenProfiles", "not-in", [[currentUser.email]]));

        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
            const users = [];

            snapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });

            setUserList([...users]);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const meetupQuery = query(collection(db, 'users', currentUser.uid, "meetups"), 
                                where("date", ">", new Date()), 
                                orderBy("date"));

        const unsubscribe = onSnapshot(meetupQuery, (snapshot) => {
            const meetups = [];

            snapshot.forEach((doc) => {
                meetups.push({ id: doc.id, ...doc.data() });
            });

            setMeetupList([...meetups]);
        });

        return unsubscribe;
    }, []);

    /*const handleHideProfile = async(item) => {
        await Promise.all([
            updateDoc(doc(db, "users", currentUser.uid), {hiddenProfiles: arrayUnion(item.email)}),
            updateDoc(doc(db, "users", item.uid), {hiddenProfiles: arrayUnion(currentUser.email)})
        ]);
    };*/

    function RenderUser({item}) {
        const refRBSheet = useRef();
        const room = unfilteredRooms.find((room) =>
            room.participantsArray.includes(item.email)
        );
    
        return (
            <View style={{width: 150, height: 150, borderRadius: 150, marginHorizontal: 20}}>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    <Avatar size={150} user={item}/>
                </TouchableOpacity>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    dragFromTopOnly={true}
                    closeOnPressMask={true}
                    height={600}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'transparent',
                        },
                        container: {
                            backgroundColor: colors.lightBlue,
                            alignItems: 'center'
                        },
                        draggableIcon: {
                            backgroundColor: colors.darkBlue,
                        }
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{marginVertical: 30}}>
                            <Avatar size={180} user={item}/>
                        </View>
                        <Text style={styles.profImptText}>{item.name}</Text>
                        <Text style={styles.profText}>{item.uniName}</Text>
                        <Text style={styles.profText}>{item.uniCourse}</Text>
                        <Text style={styles.profText}>Year {item.uniYear}</Text>
                        <Text style={styles.profText}>{item.bio}</Text>
                        <TouchableOpacity 
                        style={styles.chatButton} 
                        onPress={() => {navigation.navigate("IndivChatScreen", { user: item, room: room}); 
                                            refRBSheet.current.close();}}>
                            <Text style={styles.profText}>Chat</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </RBSheet>
            </View>
        );
    };

    const dateFormatting = (date) => {
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        const [day, month, year, hour, minute] = [
          date.getDate(),
          date.getMonth(),
          date.getFullYear(),
          date.getHours(),
          minutes,
        ];
    
        return day.toString() + "/" + month.toString() + "/" + year.toString() + "      " + hour.toString() + ":" + minute.toString();
    };

    const handleDeleteMeetup = async(item) => {
        await Promise.all([
            deleteDoc(doc(collection(doc(db, "users", currentUser.uid), "meetups"), item.id)),
            deleteDoc(doc(collection(doc(db, "users", item.friendUID), "meetups"), item.id))
        ]);
    };

    function RenderMeetup({item}) {
        return (
            <View style={{borderBottomWidth: 1, borderBottomColor: colors.darkPink, marginBottom: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: 10}}></View>
                    <MaterialCommunityIcons name="clock" size={20} color={colors.darkPink}></MaterialCommunityIcons>
                    <Text style={styles.renderMeetupText}>{dateFormatting(new Date(item.date.seconds*1000))}</Text>
                    <TouchableOpacity
                    style={{position: 'absolute', right: 20}}
                    onPress={() => handleDeleteMeetup(item)}
                    >
                        <MaterialCommunityIcons name="delete" size={20} color={colors.blue}></MaterialCommunityIcons>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: 10}}></View>
                    <Ionicons name="location" size={20} color={colors.darkPink}></Ionicons>
                    <Text style={styles.renderMeetupText}>{item.location}</Text>
                </View>
                <Text style={{fontSize: 15, color: colors.darkPink, marginLeft: 10, marginVertical: 10}}>with {item.friend}</Text>
            </View>
        );
    };

    return (
        <ScrollView vertical showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <Text style={styles.introtext}>Hi {currentUser.displayName}!</Text>
            </SafeAreaView>
            <View style={{backgroundColor: colors.pink, height: 350}}>
                <Text style={styles.meetuptext}>Upcoming meet-ups</Text>
                {meetupList.length > 0 ? 
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    data={meetupList}
                    keyExtractor={(_, i) => i}
                    renderItem={({ item }) => <RenderMeetup item={item}/>}
                />
                : <Text style={{color: colors.darkBlue, alignSelf: 'center'}}>
                    You have no upcoming meetups</Text>
                }           
            </View>
            <View>
                <Text style={styles.sayhellotext}>say hello to</Text>
                {userList.length > 0 ?
                <FlatList
                    //style={{ flex: 1, padding: 10 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={userList}
                    keyExtractor={(_, i) => i}
                    renderItem={({ item }) => <RenderUser item={item}/>}
                />
                : <Text style={{color: colors.darkBlue, alignSelf: 'center'}}>
                There are no users to discover</Text>
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    introtext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 10,
        paddingLeft: 10,
        //fontFamily: 'Comfortaa_700Bold'
    },
    meetuptext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 25,
        //backgroundColor: colors.pink,
        paddingBottom: 20,
        paddingTop: 10,
        paddingLeft: 10,
        //fontFamily: 'Comfortaa_300Light'
    },
    renderMeetupText: {
        color: colors.darkPink, 
        fontSize: 20,
        marginLeft: 10
    },
    sayhellotext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 10,
        //fontFamily: 'Comfortaa_300Light'
    },
    profImptText: {
        color: colors.darkBlue,
        fontSize: 35,
        fontWeight: 'bold',
        marginVertical: 5
    },
    profText: {
        color: colors.darkBlue,
        fontSize: 15,
        marginVertical: 5
    },
    chatButton: {
        backgroundColor: colors.pink, 
        marginTop: 10, 
        marginHorizontal: 10,
        paddingVertical: 5, 
        paddingHorizontal: 20, 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
  });
