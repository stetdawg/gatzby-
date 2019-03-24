import React, { Component } from "react";
import {     
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Button 
} from 'react-native';
import MapView from "react-native-maps";

export default class MapScreen extends Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            where: {lat: null, lng: null},
            error: null
        };
    }
    componentDidMount() {
        let geoOptions = {
            enableHighAccuracy: true,
        };
        navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions);
    }
    geoSuccess = (position) => {
        //console.log(position.coords.latitude);
        
        this.setState({
            ready: true,
            where: {lat: position.coords.latitude, lng: position.coords.longitude }
        });
    }
    
    geoFailure = (err) => {
        this.setState({error: err.message});
    }
    
    
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: this.state.where.lat,
                        longitude: this.state.where.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                        <MapView.Marker
                            coordinate={{
                                latitude: Number(this.state.where.lat),
                                longitude: Number(this.state.where.lng),
                            }}>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    big: {
        fontSize: 48
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'

    }
});
