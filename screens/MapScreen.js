import YelpService from '../components/YelpApi';
import Map from '../components/Map';
import React, { Component } from "react";
import {     
    AppRegistry,
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    ListItem,
} from 'react-native';
import { Location, Permissions, Marker } from 'expo';
//import MapView from 'react-native-elements';
//import console = require('console');

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

  class HorizontalFlatListItem extends Component {
    render() {
      return (
        // <TouchableOpacity 
        // onPress={() => {
        // console.log(`lat: ${this.props.item.coords.region}, long: ${this.props.item.coords.longitude}`);
        // this.setState({region});
        // // this.map.fitToCoordinates({
        // //   latitude: 37.321996988,
        // //   longitude: -122.0325472123455,
        // //   latitudeDelta: 0.15,
        // //   longitudeDelta: 0.15
        // // },
        // // { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, 
        // // animated: true});
        // // this.mapView.animateToRegion({
        // //   latitude: 37.321996988,
        // //   longitude: -122.0325472123455,
        // //   latitudeDelta: 0.15,
        // //   longitudeDelta: 0.15
        // // }, 1000);
        // }}>
        <View 
          style={{
            flex: 1,
            //flexDirectection: 'column',
            alignItems: 'center',
            width: 125,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
            margin: 4,
          }}>
          <Text 
          style={{
          textAlign: 'center',
          flex: 1,
          fontSize: 12,
          fontWeight: 'bold',
          //color: 'white',
          //margin: 20
          }}>{this.props.item.name}
          </Text>
          <Image source={{uri: this.props.item.image}} style={{width: '100%', height: '50%'}} />
          <Text 
          style={{
          textAlign: 'center',
          flex: 1,
          fontSize: 12,
          //margin: 10,
          //color: 'white',
          }}>{`${this.props.item.addr} ${this.props.item.city}, ${this.props.item.state1} ${this.props.item.zip}`}
          </Text>
          <Text 
          style={{
          textAlign: 'center',
          flex: 1,
          fontSize: 12,
          margin: 10,
          //color: 'white',
          }}>{this.props.item.phone}
          </Text>

        </View>
        //</TouchableOpacity>
      );
    }
  }

  // class Map extends Component {
  //   renderMarkers() {
  //     return this.props.places.map((place, i) => (
  //       <MapView.Marker 
  //         key={i}
  //         title={place.name}
  //         coordinate={place.coords}
  //         description={`${place.addr} ${place.name}`}
  //       />
  //     ));
  //   }
    
  //   render() {
  //     const { region } = this.props;
  
  //     return (
  //       <MapView
  //       style={{ 
  //         left: 0,
  //         right: 0,
  //         top: 0,
  //         bottom: 0,
  //         position: 'absolute',
  //         width: '100%',
  //         height: '100%'}}
  //       region={region}
  //       showsUserLocation
  //       showsMyLocationButton
  //       >
  //         {this.renderMarkers()}
  //       </MapView>
  //     );
  //   }
  // }

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
      <View style={styles.main}>
        <View style={styles.container}>
          <Map region={region} places={stores} />
        </View>
         <FlatList
          horizontal={true}
          data={this.state.stores}
          //renderRow={this.onMarkerPress.bind(this)}
          renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={(e) => {
            console.log(`lat: ${item.coords.latitude}, long: ${item.coords.longitude}`);
            this.state.region = {
              latitude: item.coords.latitude,
              longitude: item.coords.longitude,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15
            };
            this.setState({
              latitude: item.coords.latitude,
              longitude: item.coords.longitude,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15
            });
            console.log({region});
            //console.log(e.nativeEvent.coordinate);
            //console.log(e.nativeEvent.key.showCallout());
            //this.map.animateToRegion(region, 100);
            //this.animateEvent(region);
            // this.setState({
            //   latitude: 37.321996988,
            //   longitude: -122.0325472123455
            // });
            // this.map.animateToRegion({
            //   latitude: item.coords.latitude,
            //   longitude: item.coords.longitude,
            //   latitudeDelta: 0.15,
            //   longitudeDelta: 0.15
            // }, 100);
            // this.map.fitToCoordinates({
            //   latitude: 37.321996988,
            //   longitude: -122.0325472123455,
            //   latitudeDelta: 0.15,
            //   longitudeDelta: 0.15
            // },
            // { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, 
            // animated: true});
            // this.mapView.animateToRegion({
            //   latitude: 37.321996988,
            //   longitude: -122.0325472123455,
            //   latitudeDelta: 0.15,
            //   longitudeDelta: 0.15
            // }, 1000);
            }}>
                <HorizontalFlatListItem item={item}>
                
                </HorizontalFlatListItem>
              
              </TouchableOpacity>             
          )}
          keyExtractor={item => item.id}
        /> 
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
      width: '100%',
      height: '100%',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //paddingBottom: 50
      // justifyContent: 'center',
      // overflow: 'hidden'
      // position: 'absolute',
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0
  },
  big: {
      fontSize: 48
  },
  // map: {
  //     left: 0,
  //     right: 0,
  //     top: 0,
  //     bottom: 0,
  //     position: 'absolute',
  //     width: 200,
  //     height: 200
  // },
  main: {
    flex: 1
  }
});
