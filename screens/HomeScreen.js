
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
import {Button, SearchBar} from 'react-native-elements';
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
                    style={styles.searchContainerStyle}>
            <SearchBar
                     placeholder='Type Here...' 
                     round={true}
                     inputStyle={{backgroundColor:"white"}}
                     lightTheme={false}
                     containerStyle={styles.containerStyle}
                      
                     />            
                     <TouchableOpacity onPress={this.onScantog.bind(this)}>
            
                     <Image
                       style={styles.scanButtonStyle}
                       source={require('../assets/images/scan.png')}
                     />
                   </TouchableOpacity>
            </View>            

    
               <Modal
        visible={this.state.cameraVisable}
        transparent
        animationType='slide'
        onRequestClose={() => {}}
        >
        <View
            style={styles.cameraStyle}>
            <Button
            title="Back to home"
            onPress={this.onScantog.bind(this)}
            />
            <CameraScreen />
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
    marginTop: '20%',
    width: '90%', 
    height: '40%',
    borderRadius: 20,
    backgroundColor: 'transparent',
    
  },
  containerStyle: {
    borderRadius: 30,
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent"

   },
  scanButtonStyle: {
  resizeMode: 'center',
  marginTop:"1%",
  height:"50%",
  width: "15%",
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
