import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, TextInput, Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import BackButton from '../components/BackButton.js';
import { auth, db } from '../firebase/index.js';
import { doc, updateDoc, onSnapshot, deleteField } from '@firebase/firestore';
import colors from '../assets/colors/colors.js';
import { pickImage, askForPermission, uploadImage, pickUploadImage, askForUploadPermission } from '../utils/utils.js';
import RBSheet from 'react-native-raw-bottom-sheet';
import { updateProfile } from 'firebase/auth';


export default function EditProfileScreen({navigation}) {
    const user = auth.currentUser;
    const [userDetails, setUserDetails] = useState('');
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

    useEffect(() => {
        const docRef = doc(db, 'users', user.uid)

        const unsubscribe = onSnapshot(docRef, (doc) => {
            setUserDetails(doc.data())
            //setSelectedImage(user.photoURL);
        });

        return unsubscribe;

    }, []);

    const handleSubmit = async() => {
        let photoURL;
        if (selectedImage) {
          const { url } = await uploadImage(
            selectedImage,
            `images/${user.uid}`,
            "profilePicture"
          );
          photoURL = url;
        }
        const userData = {};
        if (photoURL) {
            updateProfile(user, {photoURL: photoURL});
            userData.photoURL = photoURL;
        }
        if (displayName) {
            updateProfile(user, {displayName: displayName});
            userData.displayName = displayName;
        }
        if (name) {
            userData.name = name;
        }
        if (uniName) {
            userData.uniName = uniName;
        }
        if (uniCourse) {
            userData.uniCourse = uniCourse;
        }
        if (uniYear) {
            userData.uniYear = uniYear;
        }
        if (bio) {
            userData.bio = bio;
        }
        
        /*await Promise.all([
            updateProfile(user, userData),
            updateDoc(doc(db, "users", user.uid), userData),
        ]);*/
        await updateDoc(doc(db, "users", user.uid), userData);

        navigation.navigate("TabNavigator");
    };
    

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

    const handleDeleteProfilePicture = async() => {
        await updateDoc(doc(db, "users", user.uid), {photoURL: deleteField()});
        refRBSheet.current.close();
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.lightBlue,}}>
        <SafeAreaView style={{
            //flex: 1,
            //backgroundColor: colors.lightBlue,
            alignItems: 'center',
        }}>
            <BackButton press={() => navigation.goBack()}></BackButton>
            <Text style={{ fontSize: 22, color: colors.darkBlue}}>
                Edit Profile
            </Text>
            <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={{
                marginTop: 30,
                marginBottom: 20,
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
                height={250}
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
                <TouchableOpacity
                style={styles.bottomSheetButtons}
                onPress={handleDeleteProfilePicture}>
                    <MaterialCommunityIcons name='delete' color={colors.darkBlue} size={30}></MaterialCommunityIcons>
                    <Text style={styles.bottomSheetButtonText}>Remove current profile picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.bottomSheetButtons}
                onPress={() => setSelectedImage(null)}>
                    <MaterialCommunityIcons name='refresh' color={colors.darkBlue} size={30}></MaterialCommunityIcons>
                    <Text style={styles.bottomSheetButtonText}>Clear</Text>
                </TouchableOpacity>
            </RBSheet>
            </SafeAreaView>
            <ScrollView vertical showsVerticalScrollIndicator={false}>
            <Text style={styles.textInputHeader}>Username</Text>
            <TextInput
            placeholder={user.displayName}
            value={displayName}
            onChangeText={setDisplayName}
            style={styles.textInput}
            />
            <Text style={styles.textInputHeader}>Name</Text>
            <TextInput
            placeholder={userDetails.name}
            value={name}
            onChangeText={setName}
            style={styles.textInput}
            />
            <Text style={styles.textInputHeader}>Home University</Text>
            <TextInput
            placeholder={userDetails.uniName}
            value={uniName}
            onChangeText={setUniName}
            style={styles.textInput}
            />
            <Text style={styles.textInputHeader}>University Major</Text>
            <TextInput
            placeholder={userDetails.uniCourse}
            value={uniCourse}
            onChangeText={setUniCourse}
            style={styles.textInput}
            />
            <Text style={styles.textInputHeader}>Year</Text>
            <TextInput
            placeholder={userDetails.uniYear}
            //keyboardType='numeric'
            //maxLength={1}
            value={uniYear}
            onChangeText={setUniYear}
            style={styles.textInput}
            />
            <Text style={styles.textInputHeader}>Bio</Text>
            <TextInput
            placeholder={userDetails.bio}
            value={bio}
            onChangeText={setBio}
            style={styles.textInput}
            />
            <View style={{height: 200}}></View>
            </ScrollView>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity 
            style={{height: 100, justifyContent: 'center', alignItems: 'center'}}
            onPress={handleSubmit}>
                <Text style={{color: colors.darkBlue, fontSize: 20}}>Edit</Text>
            </TouchableOpacity>
            </View>
        </View>
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
    textInputHeader: {
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginTop: 30,
        marginBottom: 10
    },
    textInput: {
        borderBottomColor: colors.darkBlue,
        //marginTop: 40,
        borderBottomWidth: 2,
        width: '80%',
        alignSelf: 'center'
    }
});