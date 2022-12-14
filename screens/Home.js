import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedFAB, Button } from 'react-native-paper';

class Home extends Component {
    state = {  } 
    render() { 
        return (
            <View style={styles.container}> 
                <Text style={styles.title}> Good Morning! </Text>
                <Text>This app is under development. Some features may not be available, and changes will be made over time. Jowever, the basic functionality works :)</Text>
                <AnimatedFAB 
                    label='New Trip' 
                    icon='plus' 
                    extended
                    style={styles.fab} 
                    onPress={()=>{
                        this.props.navigation.navigate('NewTrip');
                    }} 
                />
            </View>
        );
    }
}
 
export default Home;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    container: {
        flexGrow: 1,
    },
    title: {
        fontSize: 30,
        margin: 10,
    },
})

//Exporting: npx expo build:android || ios