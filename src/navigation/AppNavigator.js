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
import SplashScreen from '../screens/SplashScreen.js';
import UserInfoScreen from '../screens/UserInfoScreen.js';
import ForumFeedScreen from '../screens/ForumFeedScreen.js'
import AnswerPostScreen from '../screens/AnswerPostScreen.js'
import MakePostScreen from '../screens/MakePostScreen.js'
import OwnPostScreen from '../screens/OwnPostScreen.js'

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/index.js';


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
                      name="OwnPostScreen"
                      component={OwnPostScreen}
                      options={{headerShown: false}}
              />
           </Stack.Navigator>
         )}
      </NavigationContainer>
    );
  };

/*const InsideAppNavigator = () => (
  <MainStack.Navigator>
    {!currUser.displayName && (
      <MainStack.Screen
            name="UserInfo"
            component={UserInfoScreen}
            options={{headerShown: false}}
      />
    )}
    <MainStack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
    />
    
    <MainStack.Screen
            name="LogOut"
            component={LogOutScreen}
            options={{headerShown: false}}
    />

    <MainStack.Screen
            name="MakePostScreen"
            component={MakePostScreen}
            options={{headerShown: false}}
    />

    <MainStack.Screen
            name="ForumFeedScreen"
            component={ForumFeedScreen}
            options={{headerShown: false}}
    />
  </MainStack.Navigator>
)

const LogInNavigator = () => (
  <LogInStack.Navigator>
    <LogInStack.Screen 
      name = "LogInScreen"
      component={LogInScreen} 
      options={{headerShown: false}}
    />
  </LogInStack.Navigator>
  
);*/

const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: colors.lightBlue,
    },
  });

export default AppNavigator;

