// @refresh reset
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import React, { useCallback, useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from "../firebase/index.js";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
} from "react-native-gifted-chat";
import { pickImage, pickUploadImage, uploadImage } from "../utils/utils.js"
import ImageView from "react-native-image-viewing";
import colors from "../assets/colors/colors.js";
import { useRoute } from "@react-navigation/native";

const randomId = nanoid();

export default function IndivChatScreen({ navigation }) {
  const [roomHash, setRoomHash] = useState("");
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageView, setSelectedImageView] = useState("");
 
  const route = useRoute();
  const { currentUser } = auth;
  const room = route.params.room;
  const userB = route.params.user;

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.uid };

  const roomId = room ? room.id : randomId;

  const roomRef = doc(db, "rooms", roomId);
  const roomMessagesRef = collection(db, "rooms", roomId, "messages");

  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        const userBData = {
          displayName: userB.displayName || "",
          email: userB.email,
        };
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
      const emailHash = `${currentUser.email}:${userB.email}`;
      setRoomHash(emailHash);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function onSend(messages = []) {
    const writes = messages.map((m) => addDoc(roomMessagesRef, m));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));
    await Promise.all(writes);
  }

  async function sendImage(uri, roomPath) {
    const { url, fileName } = await uploadImage(
      uri,
      `images/rooms/${roomPath || roomHash}`
    );
    const message = {
      _id: fileName,
      text: "",
      createdAt: new Date(),
      user: senderUser,
      image: url,
    };
    const lastMessage = { ...message, text: "Image" };
    await Promise.all([
      addDoc(roomMessagesRef, message),
      updateDoc(roomRef, { lastMessage }),
    ]);
  }

  async function handlePhotoPicker() {
    const result = await pickImage();
    if (!result.cancelled) {
      await sendImage(result.uri);
    }
  }

  async function handleUploadPhotoPicker() {
    const result = await pickUploadImage();
    if (!result.cancelled) {
      await sendImage(result.uri);
    }
  }

const refRBSheet = useRef();

  return (
      <GiftedChat
        onSend={onSend}
        messages={messages}
        user={senderUser}
        renderAvatar={null}
        renderActions={(props) =>
            <View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={200}
                customStyles={{
                wrapper: {
                    backgroundColor: 'transparent',
                },
                container: {
                    backgroundColor: colors.pink
                },
                draggableIcon: {
                    backgroundColor: colors.darkBlue
                }
                }}
            >
                <TouchableOpacity 
                style={styles.bottomSheetButtons}
                onPress={handlePhotoPicker}>
                    <Entypo name='camera' color={colors.darkBlue} size={30}></Entypo>
                    <Text style={styles.bottomSheetButtonText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.bottomSheetButtons}
                onPress={handleUploadPhotoPicker}>
                    <MaterialCommunityIcons name='upload' color={colors.darkBlue} size={30}></MaterialCommunityIcons>
                    <Text style={styles.bottomSheetButtonText}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.bottomSheetButtons}
                onPress={() => {navigation.navigate('MeetUpScreen', { userB: userB });
                                  refRBSheet.current.close();}}>
                    <MaterialIcons name='book-online' color={colors.darkBlue} size={30}></MaterialIcons>
                    <Text style={styles.bottomSheetButtonText}>Arrange MeetUp</Text>
                </TouchableOpacity>
            </RBSheet>
            <Actions
                {...props}
                onPressActionButton={() => refRBSheet.current.open()}
            />
            </View>
        }
        timeTextStyle={{ right: { color: colors.blue } }}
        renderSend={(props) => {
          const { text, messageIdGenerator, user, onSend } = props;
          return (
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                marginRight: 5,
                backgroundColor: colors.darkBlue,
                alignSelf: 'center',
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                if (text && onSend) {
                  onSend(
                    {
                      text: text.trim(),
                      user,
                      _id: messageIdGenerator(),
                    },
                    true
                  );
                }
              }}
            >
              <Ionicons name="send" size={20} color='white' />
            </TouchableOpacity>
          );
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 2,
              borderRadius: 15,
            }}
          />
        )}
        renderBubble={(props) => (
          <Bubble
            {...props}
            textStyle={{ right: { color: colors.darkBlue } }}
            wrapperStyle={{
              left: {
                backgroundColor: colors.lightGray,
              },
              right: {
                backgroundColor: colors.lightBlue,
              },
            }}
          />
        )}
        renderMessageImage={(props) => {
          return (
            <View style={{ borderRadius: 15, padding: 2 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setSelectedImageView(props.currentMessage.image);
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: 200,
                    height: 200,
                    padding: 6,
                    borderRadius: 15,
                    resizeMode: "cover",
                  }}
                  source={{ uri: props.currentMessage.image }}
                />
                {selectedImageView ? (
                  <ImageView
                    imageIndex={0}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    images={[{ uri: selectedImageView }]}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          );
        }}
      />
  );
}

const styles = StyleSheet.create({
    bottomSheetButtons: {
        backgroundColor: colors.pink,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 20,
        paddingVertical: 10
    },
    bottomSheetButtonText: {
        color: colors.darkBlue,
        fontSize: 15,
        paddingLeft: 20
    },
});