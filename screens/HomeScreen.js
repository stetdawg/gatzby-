
import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Dimensions,
  Modal, 
  TouchableOpacity,
  Image
} from 'react-native';
import {Permissions} from 'expo';
import {Button} from 'react-native-elements';
import { connect } from 'react-redux';
import CameraScreen from "./CameraScreen";


class HomeScreen extends React.Component {
 
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA); // ask for permistion to use camera
    this.setState({ hasCameraPermission: status === 'granted' }); // determase wether we can use camer
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
    //console.log(this.state.cameraVisable); for debuging

    this.setState({cameraVisable:  true !== this.state.cameraVisable  });
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
       
            <View
            style={styles.searchContainerStyle}/>            
            <TouchableOpacity onPress={this.onScantog.bind(this)}>
            
      <Image
        style={styles.scanButtonStyle}
        source={require('../assets/images/scan.png')}
      />
    </TouchableOpacity>
    
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
  searchContainerStyle: {
    alignSelf: 'center',
    marginTop: '40%',
    width: '90%', 
    height: '10%',
    backgroundColor: 'blue',
    borderRadius: 20
    
  },
  scanButtonStyle: {
  resizeMode: 'cover',
  marginTop:"1%",
  height: "20%",
  width: "10%",
  marginLeft: "8%",

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
    
    };
};

export default connect(mapStateToProps, null )(HomeScreen);
