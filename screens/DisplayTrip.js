import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { ActivityIndicator, Button, Card, IconButton, List, FAB } from 'react-native-paper';

const images = {
    1: require('../assets/icons/Train.png'),
    2: require('../assets/icons/Metro.png'),
    4: require('../assets/icons/LightRail.png'),
    5: require('../assets/icons/Bus.png'),
    7: require('../assets/icons/Coach.png'),
    9: require('../assets/icons/Ferry.png'),
    11: require('../assets/icons/SchoolBus.png'),
    24: require('../assets/icons/Metro.png')
}

const routeColors = require('../assets/colors.json');

class DisplayTrip extends Component {                                                                                                                                                                                                                                                                                                      
    state = {
        route: null,
        start: null,
        end: null,
        saved: false,
    } 
    componentDidMount() {
        console.log(this.props);
        this.setState({
            route: this.props.route.params.route, 
            start: this.props.route.params.start,
            end: this.props.route.params.end,
            saved: this.props.route.params.saved,
        })
    }
    render() { 
        if(this.state.route == null){
            return <ActivityIndicator />
        }
        return (
            <View>
                <View style={{height: "40%", borderBottomWidth: 3, borderBottomColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Map.</Text>
                </View>
                <ScrollView style={{height: "60%"}}>
                    <View style={[styles.row, {marginTop: 20, marginLeft: 10}]}>

                        <IconButton icon="star" size={20} style={{margin: 0}} selected={this.state.saved} animated onPress={()=>{
                            
                            this.setState({saved: !this.state.saved});

                        }} />
                            {
                                this.state.route.legs.map(icon => {
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
                    {
                        this.state.route.legs.map(item => {
                            let startTime = item.origin.departureTimePlanned.slice(11).slice(0,5);
                            let endTime = item.destination.arrivalTimePlanned.slice(11).slice(0,5);
                            return(
                                <Card style={styles.card}>
                                    <Text style={{fontSize: 17}}>
                                        <Text style={styles.time}>
                                            {startTime + "  "}
                                        </Text>
                                        {item.origin.disassembledName}
                                    </Text> 
                                    
                                    <View style={styles.row}>
                                        <Image source={images[item.transportation.iconId]} style={styles.image} />
                                        <Text style={{
                                            backgroundColor: routeColors[item.transportation.disassembledName] ? routeColors[item.transportation.disassembledName] : 'lightblue',
                                            padding: 5,
                                            borderRadius: 50,
                                            height: 30,
                                            color: "white", 
                                            fontWeight: 'bold',
                                        }} > {item.transportation.disassembledName} </Text>
                                        <Text style={{alignSelf: 'center'}}  >{" " + item.transportation.destination.name}</Text>
                                    </View>

                                    <List.Accordion title={'Stops at ' + item.stopSequence.length + ' stops'}>
                                        {
                                            item.stopSequence.map(stop => {
                                                return <Text style={{fontSize: 12, marginLeft: 17, marginVertical: 4,}} > {stop.name.split(',')[1]} </Text>
                                            })
                                        }
                                    </List.Accordion>
                                    

                                    <Text style={{fontSize: 17}}>
                                        <Text style={styles.time}>
                                            {endTime + "  "}
                                        </Text>
                                        {item.destination.disassembledName}
                                    </Text> 
                                </Card>
                            )
                        })
                    }
                </ScrollView>
            </View>
            
        );
    }
}
 
export default DisplayTrip;

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        fontSize: 55,
    },
    row: {
        flexDirection: 'row',
        marginVertical: 5,
        width: "90%",
    },
    image: {
        width: 30,
        height: 30,
    },
    time: {
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        bottom: -30,
        right: 16,
    },
});

/*Icon button: 
let storageKey = `${this.state.start.data}${this.state.end.data}`
if(this.state.saved){
    AsyncStorage.removeItem(storageKey);
    
} else {
    AsyncStorage.setItem(storageKey, JSON.stringify([this.state.start, this.state.end]));
}
*/