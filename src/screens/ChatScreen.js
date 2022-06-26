import React, { useContext, useEffect } from "react";
import { View, SafeAreaView, Text, ScrollView, StyleSheet } from "react-native";
import GlobalContext from "../context/GlobalContext.js";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import ChatListItem from "../components/ChatListItem.js";
import colors from "../assets/colors/colors.js";

export default function ChatScreen() {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  return (
    <View /*style={{ flex: 1, padding: 5, paddingRight: 10 }}*/>
      <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Chat</Text>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
      {rooms.map((room) => (
        <ChatListItem
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={room.userB}
        />
      ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: colors.pink, 
      flexDirection: 'row', 
      justifyContent: 'space-between',
  },
  header: {
      color: colors.darkBlue,
      fontSize: 40,
      fontWeight: 'bold',
      paddingLeft: 20,
      paddingVertical: 5,
  },
});