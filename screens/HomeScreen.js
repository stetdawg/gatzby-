import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View
} from 'react-native';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View
      style={styles.container}
      >      
         <ImageBackground
           style={styles.backgroundStyle}
          source={require("../assets/images/home2.png")}
          resizeMode='cover'
          >
          <View
          style={styles.nameStyle}>
          <Text>
            GATZBY
          </Text>
          </View>

          </ImageBackground>
      </View>
          );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  nameStyle: {
  },
  backgroundStyle: {
  width: '100%', height: '100%'},

  
});
