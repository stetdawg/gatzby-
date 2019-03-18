import React, { Component } from "react";
import MapView from "react-native-maps";
import { View, StyleSheet, } from 'react-native';
import Header from '../components/common/Header';
import Footer from '../components/Footer';

export class MapScreen extends Component {
  render() {
      return (
      <View style={styles.container}>    
      <MapView
                 style={styles.map}
                 initialRegion={{
                     latitude: 37.78825,
                     longitude: -122.4324,
                     latitudeDelta: 0.0922,
                     longitudeDelta: 0.0421,
                 }}>
                <Header  
                 headerText=""
                />
                     <MapView.Marker
                         coordinate={{
                             latitude: 37.78825,
                             longitude: -122.4324,
                         }}>
                             <View style={styles.radius}>
                                 <View style={styles.marker} />
                             </View>
                         </MapView.Marker>      
                         <Footer /> 
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
            },
           map: {
               left: 0,
               right: 0,
               top: 0,
               bottom: 0,
               position: 'absolute'
           }
          });
          export default MapScreen;
 
