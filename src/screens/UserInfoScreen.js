import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, TextInput, Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { auth, db } from '../firebase/index.js';
import { updateProfile } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import colors from '../assets/colors/colors.js';
import { pickImage, askForPermission, uploadImage, pickUploadImage, askForUploadPermission } from '../utils/utils.js';
import RBSheet from 'react-native-raw-bottom-sheet';


export default function UserInfoScreen({navigation}) {
    const [displayName, setDisplayName] = useState('');
    const [name, setName] = useState('');
    const [uniName, setUniName] = useState('');
    const [uniYear, setUniYear] = useState('');
    const [uniCourse, setUniCourse] = useState('');
    const [bio, setBio] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null);
    const [uploadPermissionStatus, setUploadPermissionStatus] = useState(null);

    useEffect(() => {
        (async () => {
          const status = await askForPermission();
          setPermissionStatus(status);
        })();
    }, []);

    useEffect(() => {
        (async () => {
          const status = await askForUploadPermission();
          setUploadPermissionStatus(status);
        })();
    }, []);

    async function handlePress() {
        const user = auth.currentUser;
        let photoURL;
        if (selectedImage) {
          const { url } = await uploadImage(
            selectedImage,
            `images/${user.uid}`,
            "profilePicture"
          );
          photoURL = url;
        }
        const userData = {
          displayName,
          name,
          uniName,
          uniYear,
          uniCourse,
          email: user.email,
        };
        if (photoURL) {
          userData.photoURL = photoURL;
        }
        if (bio) {
            userData.bio = bio;
        }
    
        await Promise.all([
            updateProfile(user, userData),
            setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
        ]);
        navigation.navigate("TabNavigator");
        }

    async function handleProfilePicture() {
        const result = await pickImage();
        if (!result.cancelled) {
          setSelectedImage(result.uri);
        }
    }

    async function handleUploadProfilePicture() {
        const result = await pickUploadImage();
        if (!result.cancelled) {
          setSelectedImage(result.uri);
        }
    }

    //if (permissionStatus !== "granted") {
      //  return <Text>You need to allow this permission</Text>;
    //}
    
    const refRBSheet = useRef();

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.lightBlue,
            alignItems: 'center',
        }}>
            <Text style={{ fontSize: 22, color: colors.darkBlue, marginTop: 20 }}>
                Profile Info
            </Text>
            <Text style={{ fontSize: 14, color: colors.darkBlue, marginTop: 20 }}>
                Please provide your information below
            </Text>
            <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={{
                marginTop: 30,
                borderRadius: 120,
                width: 120,
                height: 120,
                backgroundColor: 'white',
                alignItems: "center",
                justifyContent: "center",
            }}
            >
            {!selectedImage ? (
                <MaterialCommunityIcons
                name='camera-plus'
                color={'gray'}
                size={45}
                />
            ) : (
                <Image
                source={{ uri: selectedImage }}
                style={{ width: "100%", height: "100%", borderRadius: 120 }}
                />
            )}
            </TouchableOpacity>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={160}
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
                onPress={handleProfilePicture}>
                    <Entypo name='camera' color={colors.darkBlue} size={30}></Entypo>
                    <Text style={styles.bottomSheetButtonText}>Take a picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.bottomSheetButtons}
                onPress={handleUploadProfilePicture}>
                    <MaterialCommunityIcons name='upload' color={colors.darkBlue} size={30}></MaterialCommunityIcons>
                    <Text style={styles.bottomSheetButtonText}>Upload a picture</Text>
                </TouchableOpacity>
            </RBSheet>
            <TextInput
            placeholder='Username'
            value={displayName}
            onChangeText={setDisplayName}
            style={styles.textInput}
            />
            <TextInput
            placeholder='Name'
            value={name}
            onChangeText={setName}
            style={styles.textInput}
            />
            <TextInput
            placeholder='Home University'
            value={uniName}
            onChangeText={setUniName}
            style={styles.textInput}
            />
            <TextInput
            placeholder='University Major'
            value={uniCourse}
            onChangeText={setUniCourse}
            style={styles.textInput}
            />
            <TextInput
            placeholder='Year'
            value={uniYear}
            onChangeText={setUniYear}
            style={styles.textInput}
            />
            <TextInput
            placeholder='Bio (anything about yourself!)'
            value={bio}
            onChangeText={setBio}
            style={styles.textInput}
            />
            <View style={{ marginTop: 'auto', width: 80 }}>
            <Button
                title='Next'
                color={colors.darkBlue}
                onPress={handlePress}
                disabled={!displayName || !name || !uniName || !uniCourse || !uniYear}
            />
            </View>
        </SafeAreaView>
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
    textInput: {
        borderBottomColor: colors.darkBlue,
        marginTop: 40,
        borderBottomWidth: 2,
        width: '80%',
    }
});