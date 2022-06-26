import AppNavigator from './src/navigation/AppNavigator.js';
import React from 'react';
import { LogBox } from 'react-native';
import ContextWrapper from './src/context/ContextWrapper.js';

LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  ]);

export default function App() {
    return (
        <ContextWrapper>
            <AppNavigator />
        </ContextWrapper>
    );
};