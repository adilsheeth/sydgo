import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { Component } from 'react';
import Home from '../screens/Home';
import Trip from '../screens/Trip';
import Updates from '../screens/Updates';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabNav = createMaterialBottomTabNavigator();

class Tab extends Component {
    state = {  } 
    render() { 
        return (
            <TabNav.Navigator initialRouteName='Home' shifting screenOptions={({route})=>({
                tabBarIcon : ({focused, color, size}) => {
                    let iconName;
                    size = 24;
                    if(route.name == "Home"){
                        iconName = focused ? "home" : "home-outline";
                    } else if(route.name == "Updates"){
                        iconName = focused ? "alert-circle" : "alert-circle-outline";
                    } else if(route.name == "New Trip"){
                        iconName = focused ? "add-circle" : "add-circle-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}>
                <TabNav.Screen name='Home' component={Home} />
                <TabNav.Screen name='New Trip' component={Trip} />
                <TabNav.Screen name='Updates' component={Updates} />
            </TabNav.Navigator>
        );
    }
}
 
export default Tab;