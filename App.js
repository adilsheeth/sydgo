import React, { Component } from 'react';
import Tab from './navigation/Tab';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <NavigationContainer>
      <Tab />
    </NavigationContainer>
  );
}

