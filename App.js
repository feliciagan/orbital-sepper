import AppNavigator from './src/navigation/AppNavigator.js';
import React from 'react';
import ContextWrapper from './src/context/ContextWrapper.js';

export default function App() {
    return (
        <ContextWrapper>
            <AppNavigator />
        </ContextWrapper>
    );
};