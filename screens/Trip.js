import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Portal, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

class Trip extends Component {
    state = {  } 
    render() { 
        return (
            <SafeAreaView>
                <Text >New Trip</Text>
                <TextInput label={"Origin"} />
                <Text>to</Text>
                <TextInput label={"Destination"} />
            </SafeAreaView>
        );
    }
}
 
export default Trip;

