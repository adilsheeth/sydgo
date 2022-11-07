import axios from 'axios';
import { createErrorHandler } from 'expo/build/errors/ExpoErrorManager';
import React, { Component } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, Card, Divider, TextInput } from 'react-native-paper';

const images = {
    1: require('../assets/icons/Train.png'),
    2: require('../assets/icons/Metro.png'),
    4: require('../assets/icons/LightRail.png'),
    5: require('../assets/icons/Bus.png'),
    7: require('../assets/icons/Coach.png'),
    9: require('../assets/icons/Ferry.png'),
    11: require('../assets/icons/SchoolBus.png'),
}

const routeColors = require('../assets/colors.json');

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
        routes: null,      
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
                                routes: null,
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
                                routes: null,
                            });
                            this.getSuggestions(text, "destination");
                        }}
                    />
                    <Button 
                        mode='outlined' 
                        disabled={ this.state.originFinal != null && this.state.destinationFinal != null ? false : true }
                        style={styles.goButton}
                        onPress={()=>{
                            this.setState({
                                focused: 'routes',
                            });
                            this.getRoutes();
                        }}
                    >
                        Search
                    </Button>
                        
                </View>
                <ScrollView  style={styles.suggestions}>
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
                                            subtitle={item.parent.name}

                                        />
                                        <Card.Content>
                                            <View style={styles.row}>
                                                {
                                                    item.modes != undefined ?
                                                        item.modes.map((mode,id) => {
                                                            return(
                                                                <Image style={styles.image} source={
                                                                    mode == 1 ? require('../assets/icons/Train.png') :
                                                                    mode == 2 ? require('../assets/icons/Metro.png') :
                                                                    mode == 4 ? require('../assets/icons/LightRail.png') :
                                                                    mode == 5 ? require('../assets/icons/Bus.png') :
                                                                    mode == 7 ? require('../assets/icons/Coach.png') :
                                                                    mode == 9 ? require('../assets/icons/Ferry.png') :
                                                                    mode == 11 ? require('../assets/icons/SchoolBus.png') :
                                                                    null
                                                                } />
                                                            )
                                                        })
                                                    : null
                                                }
                                            </View>
                                        </Card.Content>
                                    </Card>
                                )
                            })
                        : this.state.focused == 'origin' && this.state.originData == null && this.state.origin != '' ?
                            <ActivityIndicator />
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
                                            subtitle={item.parent.name}
                                        />   
                                        <Card.Content>
                                            <View style={styles.row}>
                                                {
                                                    item.modes != undefined ?
                                                        item.modes.map((mode,id) => {
                                                            return(
                                                                <Image style={styles.image} source={
                                                                    mode == 1 ? require('../assets/icons/Train.png') :
                                                                    mode == 2 ? require('../assets/icons/Metro.png') :
                                                                    mode == 4 ? require('../assets/icons/LightRail.png') :
                                                                    mode == 5 ? require('../assets/icons/Bus.png') :
                                                                    mode == 7 ? require('../assets/icons/Coach.png') :
                                                                    mode == 9 ? require('../assets/icons/Ferry.png') :
                                                                    mode == 11 ? require('../assets/icons/SchoolBus.png') :
                                                                    null
                                                                } />
                                                            )
                                                        })
                                                    : null
                                                }
                                            </View>
                                        </Card.Content>                                     
                                    </Card>
                                )
                            })
                        : this.state.focused == 'destination' && this.state.destinationData == null && this.state.destination != '' ?
                            <ActivityIndicator />
                        : null
                    }
                    {
                        this.state.focused == 'routes' && this.state.routes != null ? 
                            this.state.routes.map(item => {
                                let length = item.legs.length - 1;
                                console.log(item.legs[length].destination.name)
                                let start = item.legs[0].origin.name.split(',')[0];
                                let end = item.legs[length].destination.name.split(',')[0];
                                let startTime = item.legs[0].origin.departureTimePlanned.slice(11).slice(0,5);
                                let endTime = item.legs[length].destination.arrivalTimePlanned.slice(11).slice(0,5);
                                

                                return(
                                    <Card                                                                 
                                        style={styles.card}
                                        onPress={()=>{
                                            this.props.navigation.navigate("DisplayTrip", {
                                                route: item,
                                            })
                                        }}
                                    >
                                        <View style={styles.cardContainer}>   
                                            <View style={styles.left}>
                                                <Text>{start}</Text>
                                                <Text style={[styles.time, {position: 'absolute', top: 20, left: -2}]}>{startTime}</Text>
                                            </View>
                                            <View style={styles.centre}>
                                                <View>
                                                    
                                                </View>
                                                <View style={{flexDirection: "row", width: '50%'}}>
                                                    {
                                                        item.legs.map(icon => {
                                                            let iconId = icon.transportation.product.iconId;
                                                            let route = icon.transportation.disassembledName;
                                                            let routeColor = routeColors[route] != undefined ? routeColors[route] : "lightblue";


                                                            return(
                                                                <View style={{flexDirection: "row"}}>
                                                                    <Image style={styles.image} source={images[iconId]} />
                                                                    <Text style={{
                                                                        backgroundColor: routeColor, 
                                                                        color: "white", 
                                                                        fontWeight: 'bold',
                                                                        borderRadius: 15,
                                                                        paddingHorizontal: 5,
                                                                        paddingTop: 4,
                                                                        height: 30,
                                                                    }}>{route}</Text>
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.right}>
                                                <Text>{end}</Text>
                                                <Text style={styles.time}>{endTime}</Text>
                                                
                                            </View>
                                        </View>
                                    </Card>
                                )
                            })
                        : this.state.focused == 'routes' && this.state.routes == null ?
                            <ActivityIndicator />
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
                    if (response.data.locations[i].type == "street" || response.data.locations[i].type == 'poi' || response.data.locations[i].type == 'suburb') {
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
    getRoutes(){
        let origin = this.state.originFinal.data;
        let originType = this.state.originFinal.type == 'stop' ? 'any' : 'coord';
        let destination = this.state.destinationFinal.data;
        let destinationType = this.state.destinationFinal.type == 'stop' ? 'any' : 'coord';
        if(originType == 'coord'){
            origin = `${origin[1]}%3A${origin[0]}%3AEPSG%3A4326`
        }
        if(destinationType == 'coord'){
            destination = `${destination[1]}%3A${destination[0]}%3AEPSG%3A4326`
        }

        axios.get(`https://api.transport.nsw.gov.au/v1/tp/trip?outputFormat=rapidJSON&coordOutputFormat=EPSG%3A4326&depArrMacro=dep&type_origin=${originType}&name_origin=${origin}&type_destination=${destinationType}&name_destination=${destination}&calcNumberOfTrips=8&TfNSWTR=true&version=10.2.1.42&itOptionsActive=1`,
        {
            headers: {
                Authorization: "apikey 3l8JSGx9DoQ5ksMlLeZTyJC7L9O4YSZ61drC",
            },
        }).then(response => {
            response = response.data;
            console.log(response)
            this.setState({
                routes: response.journeys,
            });
        });

    }
}
 
export default NewTrip;

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },
    suggestions: {
        marginBottom: 80,
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
    },
    row: {
        flexDirection: 'row',
    },
    image: {
        width: 30,
        height: 30,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    time: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'flex-end',
    },
    routeCardContainer: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    left: {
        alignItems: 'flex-start',
    },
    right: {
        alignItems: 'flex-end',
    }

})