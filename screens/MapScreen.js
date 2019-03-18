import React, { Component } from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import MapView from "react-native-maps";
import { Constants, Location, Permissions } from 'expo';

export default class MapScreen extends Component {
    
    state = {
        local: null 
}
    componentWillMount = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        console.log(status);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
        else {
            console.log("high");
            const temploc = await Location.getCurrentPositionAsync();
            console.log(JSON.stringify(this.local));
            this.setState({local: temploc});         
        }  
    };

    render() {
        console.log(JSON.stringify(this.state.local));
        return (

            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={
                        this.state.local
                    }>
                        <MapView.Marker
                            coordinate={
                                this.state.local
                            }>
                                <View style={styles.radius}>
                                    <View style={styles.marker} />
                                </View>
                            </MapView.Marker>
                    
                    </MapView>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20 / 2,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'

    }
});
