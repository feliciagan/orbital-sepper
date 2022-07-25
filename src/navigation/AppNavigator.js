import React, { useState, useEffect } from 'react';
import {StyleSheet} from 'react-native';
import colors from '../assets/colors/colors.js';
import HomeScreen from '../screens/HomeScreen.js';
import ForumScreen from '../screens/ForumScreen.js';
import ChatScreen from '../screens/ChatScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LogInScreen from '../screens/LogInScreen.js';
import LogOutScreen from '../screens/LogOutScreen.js';
import ChangePasswordScreen from '../screens/ChangePasswordScreen.js';
import SplashScreen from '../screens/SplashScreen.js';
import UserInfoScreen from '../screens/UserInfoScreen.js';
import EditProfileScreen from '../screens/EditProfileScreen.js';
import ForumFeedScreen from '../screens/ForumFeedScreen.js';
import AnswerPostScreen from '../screens/AnswerPostScreen.js';
import MakePostScreen from '../screens/MakePostScreen.js';
import OwnPostScreen from '../screens/OwnPostScreen.js';
import OwnAnswerScreen from '../screens/OwnAnswerScreen.js';
import IndivChatScreen from '../screens/IndivChatScreen.js';
import MeetUpScreen from '../screens/MeetUpScreen.js';
import EditAnswerScreen from '../screens/EditAnswerScreen.js';
import ForumSearchScreen from '../screens/ForumSearchScreen.js';
import EditPostScreen from '../screens/EditPostScreen.js';
import AfterSearchScreen from '../screens/AfterSearchScreen.js';
import ChatHeader from '../components/ChatHeader.js';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/index.js';
import ResetPasswordScreen from '../screens/ResetPasswordScreen.js';


//const LogInStack = createNativeStackNavigator();
//const MainStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
      <Tab.Navigator initialRouteName='Home'
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.blue,
          tabBarInactiveTintColor: 'white',
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Entypo name="home" size={32} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Forum"
          component={ForumScreen}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="forum-outline" size={32} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Ionicons name="chatbubble" size={32} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" size={32} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
);
  
const AppNavigator = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const unsubscribeAuthStateChanged = onAuthStateChanged(
          auth,
          (authenticatedUser) => {
              setLoading(false);
              if (authenticatedUser) {
                  setCurrUser(authenticatedUser);
                  setIsAuth(true);
              } else {
                  setIsAuth(false);
              }
          }
      );

      return () => unsubscribeAuthStateChanged();
  }, []);

  if (loading) {
    return <SplashScreen/>
  }

    return (
      <NavigationContainer>
         {!isAuth ? (
           <Stack.Navigator>
              <Stack.Screen 
                  name = "LogInScreen"
                  component={LogInScreen} 
                  options={{headerShown: false}}
              />
              <Stack.Screen 
                  name = "ResetPasswordScreen"
                  component={ResetPasswordScreen} 
                  options={{headerShown: false}}
              />
           </Stack.Navigator>
         ) : (
           <Stack.Navigator>
             {!currUser.displayName && (
                <Stack.Screen
                      name="UserInfo"
                      component={UserInfoScreen}
                      options={{headerShown: false}}
                />
              )}
              <Stack.Screen
                      name="TabNavigator"
                      component={TabNavigator}
                      options={{headerShown: false}}
              />
              
              <Stack.Screen
                      name="LogOut"
                      component={LogOutScreen}
                      options={{headerShown: false}}
              />
              <Stack.Screen
                      name="ChangePasswordScreen"
                      component={ChangePasswordScreen}
                      options={{headerShown: false}}
              />
              <Stack.Screen
                      name="MakePostScreen"
                      component={MakePostScreen}
                      options={{headerShown: false}}
              />

              <Stack.Screen
                      name="ForumFeedScreen"
                      component={ForumFeedScreen}
                      options={{headerShown: false}}
              />
              <Stack.Screen 
                      name="IndivChatScreen" 
                      component={IndivChatScreen} 
                      options={{headerStyle: {backgroundColor: colors.pink},
                      headerTintColor: colors.darkBlue, 
                      headerTitle: (props) => <ChatHeader {...props} />}}
              />
              <Stack.Screen
                      name="MeetUpScreen"
                      component={MeetUpScreen}
                      options={{headerShown: false}}
              />
              <Stack.Screen
                      name="EditProfileScreen"
                      component={EditProfileScreen}
                      options={{headerShown: false}}
              />
              <Stack.Screen
                      name="OwnPostScreen"
                      component={OwnPostScreen}
                      options={{headerShown: false}}
              />
              <Stack.Screen
                      name="OwnAnswerScreen"
                      component={OwnAnswerScreen}
                      options={{headerShown: false}}
              />
              <Stack.Screen
                      name="AnswerPostScreen"
                      component={AnswerPostScreen}
                      options={{headerShown: false}}
              />
              <Stack.Screen
                      name="EditAnswerScreen"
                      component={EditAnswerScreen}
                      options={{headerShown: false}}
              />
              <Stack.Screen
                      name="EditPostScreen"
                      component={EditPostScreen}
                      options={{headerShown: false}}
              />
              <Stack.Screen
                      name="ForumSearchScreen"
                      component={ForumSearchScreen}
                      options={{headerShown: false}}
              />
              <Stack.Screen
                      name="AfterSearchScreen"
                      component={AfterSearchScreen}
                      options={{headerShown: false}}
              />
           </Stack.Navigator>
         )}
      </NavigationContainer>
    );
  };


const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: colors.lightBlue,
    },
  });

export default AppNavigator;

