import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Button, Card, Icon, StyleSheet } from 'react-native';
import { MapView } from 'expo';

import { itemsFetch, savedToResults } from "../actions";
//import { PRIMARY_COLOR } from "../constants/style";
import SearchResultsScreen from "../screens/SearchResultsScreen";
//import Button from '../components/Button';
//import Card from '../components/Card';

const Marker = MapView.Marker;

export default class Map extends Component {
  renderMarkers() {
    return this.props.places.map((place, i) => (
      <Marker 
        key={i}
        title={place.name}
        coordinate={place.coords}
        description={`${place.addr} ${place.name}`}
        // onPress={() => {
        //   this.onMarkerPress.bind(this);
        // }}
        onPress={e => console.log(e.nativeEvent)}
      />
    ));
  }
  
  onMarkerPress(e) {
    console.log(e.nativeEvent);
  }

  render() {
    const { region } = this.props;

    return (
      <MapView
      style={styles.map}
      region={region}
      showsUserLocation
      showsMyLocationButton
      >
        {this.renderMarkers()}
        
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: '100%'

},
main: {
  flex: 1
}
});
