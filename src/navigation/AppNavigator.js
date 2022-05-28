import React from 'react';
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
      <Tab.Navigator
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
  };
  
const AppNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: colors.lightBlue,
    },
  });

export default AppNavigator;
