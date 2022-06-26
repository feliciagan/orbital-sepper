import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import colors from '../assets/colors/colors.js';
import AppLoading from 'expo-app-loading';
import { useFonts, Comfortaa_700Bold, Comfortaa_300Light } from '@expo-google-fonts/comfortaa';

import { collection, onSnapshot, query, where } from "@firebase/firestore";
import RBSheet from 'react-native-raw-bottom-sheet';
import GlobalContext from "../context/GlobalContext.js";
import { auth, db } from "../firebase";
import Avatar from '../components/Avatar.js';
  
export default function HomeScreen({ navigation }) {
    /*let [fontsLoaded] = useFonts({
        Comfortaa_700Bold,
        Comfortaa_300Light
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }*/

    const { currentUser } = auth;
    const [userList, setUserList] = useState([]);
    const { unfilteredRooms, rooms } = useContext(GlobalContext);
    
    
    useEffect(() => {
        const usersQuery = query(collection(db, 'users'), where("uid", "!=", currentUser.uid));

        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
            const users = [];

            snapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });

            setUserList([...users]);
        });

        return unsubscribe;
    }, []);

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

    return (
        <View>
            <SafeAreaView>
                <Text style={styles.introtext}>Hi {currentUser.displayName}!</Text>
            </SafeAreaView>
            <View>
                <Text style={styles.meetuptext}>Upcoming meet-ups</Text>
            </View>
            <View>
                <Text style={styles.sayhellotext}>say hello to</Text>
                <FlatList
                    //style={{ flex: 1, padding: 10 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={userList}
                    keyExtractor={(_, i) => i}
                    renderItem={({ item }) => <RenderUser item={item}/>}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    introtext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 40,
        paddingBottom: 10,
        paddingLeft: 10,
        //fontFamily: 'Comfortaa_700Bold'
    },

    meetuptext: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        fontSize: 25,
        backgroundColor: colors.pink,
        paddingBottom: 300,
        paddingTop: 10,
        paddingLeft: 10,
        //fontFamily: 'Comfortaa_300Light'
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
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
  });
