import YelpService from '../components/YelpApi';
import Map from '../components/Map';
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import Card from '../components/MapComponents/Card';
import CardSection from '../components/MapComponents/CardSection';
import { Location, Permissions, Marker } from 'expo';

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

/*////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //                                                     
//                                                                                                //                                                      
//////////////////////////////////////////////////////////////////////////////////////////////////*/
class MapItems extends Component {
    render() {
      return (
       <View
       style={styles.container}>
       <Card>
        <CardSection>
        <Text 
          style={styles.textStyle}>{this.props.item.name}
          </Text>
          </CardSection>
          <Image source={{uri: this.props.item.image}} style={styles.imageStyle} />
          <CardSection>
          <Text 
          style={styles.textSubStyle}>
          {this.props.item.addr} {", "}
          {"\n"}
          {this.props.item.city} {", "}
          {this.props.item.state1} {", "}
          {this.props.item.zip}
          {"\n"}
          {this.props.item.phone.toString().replace(/\D+1/g, '')}
          </Text>
          </CardSection>
        </Card>
        </View>
      );
    }
  }
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
  onHomePress = () => {
    this.props.navigation.navigate('Home');
    }  
/*////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //                                                     
//                                                                                                //                                                      
//////////////////////////////////////////////////////////////////////////////////////////////////*/
  render() {
    const { region, stores } = this.state;
    return (      
      <View
      style={styles.container}>
      
      
      <View style={styles.mapContainer}>
          <Map region={region} places={stores} />
        </View>
        <FlatList
        style={styles.listContainer}
         horizontal={true}
          data={this.state.stores}
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
            }}>
                <MapItems item={item}>
                </MapItems>
              
              </TouchableOpacity>             
          )}
          keyExtractor={item => item.id}
        /> 
        <View
      style={styles.foot}>
      <TouchableOpacity 
      style={{
        alignSelf: 'center',
        position: "absolute",
        left: 8,
        top: 0
      }}
      onPress={this.onHomePress}
      >
       <Icon
       style={{
      }}
      activeOpacity={10}
         name="arrow-left"
         size={40}
         color='black'
               /> 
               
       </TouchableOpacity>   
      </View>
        </View>
    );
  }
}
/*////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //                                                     
//                                                                                                //                                                      
//////////////////////////////////////////////////////////////////////////////////////////////////*/
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',

  },
  listContainer: {
   flex: .4,
    borderWidth: .2,
   borderColor: '#6495ed',
    marginTop: '2%',
    marginBottom: '8%',
    backgroundColor: 'white'
  }, 
  textStyle: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
          fontFamily: 'Avenir-Roman',

},
textSubStyle: {
  textAlign: 'center',
        fontSize: 12,
        fontFamily: 'Avenir-Roman',

},
  mapContainer: {
    height: '55%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: .1,
    borderRadius: 10,
    borderColor: '#6495ed',
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 2,
    marginRight: 2,
  },
  imageStyle: {
    flex: 2,
    resizeMode: 'contain',
    borderWidth: .1,
     borderColor: 'grey'
},
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
  foot: {
    position: 'absolute',
      bottom: 0,
      width: '100%',
    height: '7%',
    backgroundColor: 'white',
    borderTopWidth: .2,
                  borderColor: 'grey',
                  shadowOpacity: 0.2,
  
    },
});
