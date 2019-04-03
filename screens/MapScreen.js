import YelpService from '../components/YelpApi';
import Map from '../components/Map';
import React, { Component } from "react";
import {     
    AppRegistry,
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';
//import MapView from "react-native-maps";
import { Location, Permissions } from 'expo';

const region = {
  latitude: 37.321996988,
  longitude: -122.0325472123455,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15
}

const deltas = {
  latitudeDelta: 0.15,
  longitudeDelta: 0.15
};

export default class MapScreen extends Component {
  state = {
    region: null,
    stores: []
  };

  getStores = async () => {
    const { latitude, longitude } = this.state.region;
    const userLocation = { latitude, longitude };
    const stores = await YelpService.getStores(userLocation);
    this.setState({ stores });
  };

  componentWillMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
    await this.getStores();
  }

  render() {
    const { region, stores } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Map region={region} places={stores} />
      </SafeAreaView>
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