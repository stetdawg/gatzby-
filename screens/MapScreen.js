import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('<MyAccessToken>');

export class MapScreen extends Component {
    render() {
        return (
          <ScrollView style={styles.container}>
            <Mapbox.MapView>
                styleURL={Mapbox.StyleURL.Street}
                zoomLevel={15}
                centerCoordinate={[11.256, 43.770]}
                style={styles.container}>
            </Mapbox.MapView>
          </ScrollView>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });
