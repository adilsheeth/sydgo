import axios from 'axios';
import React, { Component } from 'react';
import { Alert, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

class DisplayTrip extends Component {
    state = {  
        origin: this.props.origin,
        destination: this.props.destination,
        routes: null,
    } 

    componentDidMount(){
        this.getRoutes();
    }

    render() { 
        if(this.state.origin == undefined || this.state.destination == undefined){
            Alert.alert("An Error occured.");
            this.props.navigation.navigate('Home');
        } else if(this.state.routes == null){
            return(
                <ActivityIndicator />
            );
        } else {

        }
    }
    getRoutes(){
        let origin = this.state.origin.data;
        let originType = this.state.origin.type == 'stop' ? 'any' : 'coord';
        let destination = this.state.destination.data;
        let destinationType = this.state.destination.type == 'stop' ? 'any' : 'coord';
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
            console.log(response);
        });
    }
}
 
export default DisplayTrip;