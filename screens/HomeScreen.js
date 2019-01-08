
import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Dimensions,
  Modal
} from 'react-native';
import {Permissions} from 'expo';
import {Button} from 'react-native-elements';
import { connect } from 'react-redux';
import CameraScreen from "./CameraScreen";
import {cameraTogle} from "../actions";

class HomeScreen extends React.Component {
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    }
    componentWillReceiveProps() {
    }
  static navigationOptions = {
    header: null,
  };
  state = {
    hasCameraPermission: null,
    cameraVisable: false
  };
  onScantog() {
    console.log(this.state.cameraVisable);
    this.setState({cameraVisable: true !== this.state.cameraVisable });
  }
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
             <Text
             style={styles.textnameStyle}>
             GATZBY
              </Text>
            </View>
            <Button
            title='scan'
            onPress={this.onScantog.bind(this)}
            />
            
               <Modal
        visible={this.state.cameraVisable}
        transparent
        animationType='slide'
        onRequestClose={() => {}}
        >
        <View
            style={styles.cameraStyle}>
            <CameraScreen />
            <Button
            title="Back to home"
            onPress={this.onScantog.bind(this)}
            />
            </View>
            </Modal>
            
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
  cameraStyle: {
    marginTop: '30%',
    width: '100%', 
    height: '100%'
  },
  nameStyle: {
    alignSelf: 'center',
    paddingTop: Dimensions.get('window').height / 12
  },
  textnameStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black'
  },
  backgroundStyle: {
  width: '100%', height: '100%'}, 
  
}

);
const mapStateToProps = state => {
  return {
    cameraVisable: state.home.cameraTogle
    };
};

export default connect(mapStateToProps, { cameraTogle })(HomeScreen);
