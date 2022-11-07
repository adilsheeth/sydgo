import axios from 'axios';
import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';

class DisplayTrip extends Component {
    state = {
        route: null,
    }
    componentDidMount(){
        this.setState({
            route: this.props.route.params.route,
        })
    }
    render() { 
        return(
            this.state.route == null ? 
                <ActivityIndicator />
            :
            <View>
                <View style={styles.map}>

                </View>
                <View style={styles.body}>
                    {
                        this.state.route.legs.map(item => {
                            let originTime = item.origin.departureTimeEstimated.slice(11).slice(0,5);
                            let destinationTime = item.destination.arrivalTimeEstimated.slice(11).slice(0,5)
                            return(
                                <Card style={styles.card}>
                                    <Text>{originTime}</Text>
                                    <Text>{item.origin.disassembledName}</Text>
                                    <View style={styles.info}>
                                        
                                    </View>
                                    <Text>{destinationTime}</Text>
                                    <Text>{item.destination.disassembledName}</Text>
                                </Card>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}
 
export default DisplayTrip;

const styles = StyleSheet.create({
    map: {
        height: "50%",
        backgroundColor: "dimgrey",
    },
    body: {
        
    },
    info : {
        height: "20%",
    },
    card : {
        padding: 20,
    }
})