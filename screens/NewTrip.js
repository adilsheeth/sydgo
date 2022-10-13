import axios from 'axios';
import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Divider, TextInput } from 'react-native-paper';

class NewTrip extends Component {
    state = {  
        origin: '',
        destination: '',
        focused: '',
        originData: null,
        destinationData: null,
        originFinal: null,
        destinationFinal : null,
        originValue: '',
        destinationValue: '',        
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
                        value={this.state.originValue}
                        onFocus={()=>{
                            this.setState({
                                focused: 'origin',
                            });
                        }} 
                        onChangeText={text=>{
                            this.setState({
                                origin: text,
                                originFinal: null,
                                originValue: text,
                            });
                            this.getSuggestions(text, "origin");
                        }}
                    />
                    <Text style={styles.totext}>TO</Text>
                    <TextInput 
                        label={'Destination'} 
                        style={styles.textInput} 
                        mode={'outlined'} 
                        value={this.state.destinationValue}
                        onFocus={()=>{
                            this.setState({
                                focused: 'destination',
                            });
                        }} 
                        onChangeText={text=>{
                            this.setState({
                                destination: text,
                                destinationFinal: null,
                                destinationValue: text,
                            });
                            this.getSuggestions(text, "destination");
                        }}
                    />
                    <Button 
                        mode='outlined' 
                        disabled={ this.state.originFinal != null && this.state.destinationFinal != null ? false : true }
                        style={styles.goButton}
                    >
                        Search
                    </Button>
                        
                </View>
                <ScrollView style={styles.suggestions}>
                    {
                        this.state.focused == 'origin' && this.state.originData != null ?
                            this.state.originData.map(item => {
                                return(
                                    <Card 
                                        style={styles.card}
                                        onPress={()=>{
                                            this.setState({
                                                originFinal: {
                                                    type: item.type == 'stop' ? 'stop' : 'coord',
                                                    data: item.type == 'stop' ? item.id : item.coord,
                                                },
                                                originValue: item.disassembledName == undefined ? item.name : item.disassembledName,
                                                focused: '',
                                            }); 
                                        }}
                                    >
                                        <Card.Title 
                                            title={item.disassembledName == undefined ? item.name : item.disassembledName}
                                            subtitle={item.type == "suburb" ? "Suburb" : item.parent.name}
                                        />
                                    </Card>
                                )
                            })
                        : null
                    }
                    {
                        this.state.focused == 'destination' && this.state.destinationData != null ?
                            this.state.destinationData.map(item => {
                                return(
                                    <Card 
                                        style={styles.card}
                                        onPress={()=>{
                                            this.setState({
                                                destinationFinal: {
                                                    type: item.type == 'stop' ? 'stop' : 'coord',
                                                    data: item.type == 'stop' ? item.id : item.coord,
                                                },
                                                destinationValue: item.disassembledName == undefined ? item.name : item.disassembledName,
                                                focused: '',
                                            }); 
                                        }}
                                    >
                                        <Card.Title 
                                            title={item.disassembledName == undefined ? item.name : item.disassembledName}
                                            subtitle={item.type == "suburb" ? "Suburb" : item.parent.name}
                                        />
                                    </Card>
                                )
                            })
                        : null
                    }
                </ScrollView>
            </View>
        );
    }
    getSuggestions = (text, type) => {
        text = text.trim().replace(" ", "%20");

        axios.get(`https://api.transport.nsw.gov.au/v1/tp/stop_finder?outputFormat=rapidJSON&type_sf=any&name_sf=${text}&coordOutputFormat=EPSG%3A4326&TfNSWSF=true&version=10.2.1.42`,
            {
                headers: {
                    Authorization: "apikey 3l8JSGx9DoQ5ksMlLeZTyJC7L9O4YSZ61drC",
                },
            }
            ).then(response => {
                console.log(response.data)
                for (let i = 0; i < response.data.locations.length; i++) { 
                    if (response.data.locations[i].type == "street") {
                        response.data.locations.splice(i, 1);
                        i--;
                    }
                }
                data = response.data.locations.sort((a, b) => {
                    return b.matchQuality - a.matchQuality;
                });
                console.log(data);
                if(type === "origin"){
                    this.setState({
                        originData: data,
                    });
                }else if(type === "destination"){
                    this.setState({
                        destinationData: data,
                    });
                }

            }).catch(error => {
                Alert.alert(error.message);
            })
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
    },
    card: {
        marginTop: 10,
    },
    goButton: {
        margin: 10,
        width: '50%',
        alignSelf: 'center',
    }
})