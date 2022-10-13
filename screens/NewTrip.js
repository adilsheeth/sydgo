import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';

class NewTrip extends Component {
    state = {  
        origin: '',
        destination: '',
        focused: '',
        originData: null,
        destinationData: null,
    } 
    render() { 
        return (
            <View style={styles.container}> 
                <View>
                    <TextInput 
                        label={'Origin'} 
                        style={styles.textInput} 
                        mode={'outlined'} 
                        autoFocus 
                        onFocus={()=>{
                            this.setState({
                                focused: 'origin',
                            });
                        }} 
                        onChangeText={text=>{
                            this.setState({
                                origin: text,
                            })
                        }}
                    />
                    <Text style={styles.totext}>TO</Text>
                    <TextInput 
                        label={'Destination'} 
                        style={styles.textInput} 
                        mode={'outlined'} 
                        onFocus={()=>{
                            this.setState({
                                focused: 'destination',
                            });
                        }} 
                        onChangeText={text=>{
                            this.setState({
                                destination: text,
                            })
                        }}
                    />
                </View>
            </View>
        );
    }
}
 
export default NewTrip;

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },
    totext: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    }
})