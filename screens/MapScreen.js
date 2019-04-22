import React, { Component } from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from "react-native-maps";

export default class MapScreen extends Component {

    onHomePress = () => {
        this.props.navigation.navigate('Home');
      } 

    render() {
        return (
            <View 
           style={styles.container}>
           <View
           sytle={styles.head}>
           <Text
           style={styles.textStyle}>Map View</Text>
           </View>
            <View style={styles.box}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                        <MapView.Marker
                            coordinate={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                            }}>
                                <View style={styles.radius}>
                                    <View style={styles.marker} />
                                </View>
                            </MapView.Marker>
                    
                    </MapView>
                    </View>
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
               name="angle-double-left"
               size={40}
               color='black'
                     /> 
                     
             </TouchableOpacity>   
            </View>
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
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    //    justifyContent: 'flex-start'
      
    },
    box: {
        //  alignItems: 'center',
      //  justifyContent: 'center',
   // borderRadius: 15,
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
   backgroundColor: 'transparent',
        height: '80%',
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        borderWidth: .2,
        borderColor: 'grey',
        shadowColor: 'grey',
        shadowOpacity: .5,
        shadowRadius: 10
    

    },
    map: {
      height: '100%',
      width: '100%',
    //  marginLeft: '10%'


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
        head: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '10%',
         backgroundColor: 'blue',
            borderWidth: 3,
            borderColor: 'red',
            marginBottom: '5%'
            },
            textStyle: {
                fontSize: 50,
                color: 'black',
                fontWeight: 'bold',
                fontFamily: 'Avenir-Roman',
            }
            
});
