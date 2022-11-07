import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

class Updates extends Component {
    state = {  
        data: null,
    } 
    render() { 
        return (
            <View>
                <List.Accordion 
                    title='Train Updates' 
                    left={props => <Image source={require('../assets/icons/Train.png')} style={styles.image} />}
                    
                >
                    <List.Item title='First' />
                    <List.Item title='Second' />
                </List.Accordion>
            </View>
        );
    }
}
 
export default Updates;

const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 30,
    }
})