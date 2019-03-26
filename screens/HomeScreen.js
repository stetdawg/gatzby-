import React from 'react';
import firebase from "firebase";
import {
  StyleSheet,
  ImageBackground,
  View, 
  Dimensions,
} from 'react-native';
import {Permissions} from 'expo';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import Camera from "../components/Camera";
import { GOOGLE_FIREBASE_CONFIG } from "../assets/constants/api_keys";
import AltName from "../components/AltName";
import Card from "../components/Card";
import CardSectionTwo from "../components/CardSectionTwo";
import AuthButtons from "../components/AuthButtons";
import CardSection from "../components/CardSection";
import {
        multiResponce,
        singleResponce 

        } from "../actions";
import * as urls from "../services/urlbuilder"; 

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };
  state = {
    hasCameraPermission: null,
    cameraVisable: false,
    loginVisable: false,
    signUpVisable: false,
    logInBool: false,
    email: "",
    password: "",
    repeatPassword: "",
    textInput: ''
  };
  ///////////////////////////////////////////////
  // checks if we have permistion to used the camera from the user
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA); // ask for permistion to use camera
    this.setState({ hasCameraPermission: status === 'granted' }); // determase wether we can use camera'
    firebase.initializeApp({ GOOGLE_FIREBASE_CONFIG });
    }
    componentWillReceiveProps() {
    } 
    /////////////////////////////////////////////
    //first checks to see if app has permistion to use the camera
    // if not will re ask for permission and show camera if granted
  async onScantog() {
    if (this.state.hasCameraPermission)
        this.setState({cameraVisable: !this.state.cameraVisable });//toggle the camera
    else {
    alert("We need your permission to used the camera feture");
    const { status } = await Permissions.askAsync(Permissions.CAMERA); 
    this.setState({ hasCameraPermission: status === 'granted' }); 
    if (this.state.hasCameraPermission)
    this.setState({cameraVisable: !this.state.cameraVisable });
  }
  }
  onMapPress = () => {
    this.props.navigation.navigate('Map');
  }  
  onSavedPress = () => {
    this.props.navigation.navigate('saved');
  }  
  onLoginPress = () => {
    this.props.navigation.navigate('login');
  }  
  ////////////////////////////////////////////////////////////
  // grabs the an array of items info from walmart rest api, and 
  // checks where to send the user depending on the number of items  
  // sent back
  handleTextInput = async () => {
    const walinfo = await axios.get(urls.walmartTextUrl(this.state.textInput));
    console.log(walinfo.data.numItems);
    if (walinfo.data.numItems === 1) {
      console.log("hi");
      this.props.singleResponce(walinfo.data.items[0]);
      this.props.navigation.navigate('searchResults');
    } else if (walinfo.data.numItems > 1) {
      this.props.multiResponce(walinfo.data.items);
      this.props.navigation.navigate('multi');
    }
 }

  /////////////////////////////////////////////
  //after barcode is read will pass to this function
  //this function togles camera, sends bar code info to
  //reducers and sends the user to the results screen.
     handleBarCodeScanned = async ({data}) => {
      this.setState({cameraVisable: !this.state.cameraVisable });
      const walinfo = await axios.get(urls.walmartTextUrl(data));
      console.log(walinfo.data.numItems);
      if (walinfo.data.numItems === 1) {
        console.log("hi");
        this.props.singleResponce(walinfo.data.items[0]);
        this.props.navigation.navigate('searchResults');
      } else if (walinfo.data.numItems > 1) {
        this.props.multiResponce(walinfo.data.items);
        this.props.navigation.navigate('multi');
      }
    }
   ////////////////////////////////////////////////////////
   //gui for home screen   
  render() {
    return (
            <View
            style={styles.container}
            >      
         <ImageBackground
          style={styles.backgroundStyle}
          source={require("../assets/images/whiteBG.png")}
          resizeMode='cover'
          >
          {/************************************************************************************
          the name and sub text of the home screen
          */}
          <AltName />
          <View
                style={styles.searchContainerStyle}>
                <SearchBar
                     placeholder='Enter UPC' 
                     round
                     inputStyle={{backgroundColor: "white"}}
                     lightTheme={false}
                     containerStyle={styles.containerStyle}
                     onChangeText={(text) => this.setState({textInput: text})}
                     onSubmitEditing={this.handleTextInput.bind(this)}
                     />

                <CardSectionTwo   //ICON STYLING UNDER SEARCH BAR
                >  
                     <Button //SCAN BUTTON
                     onPress={this.onScantog.bind(this)}>
                         <Icon
                          activeOpacity={20}
                           style={{paddingLeft: "8%",
                           paddingRight: '70%',
                           paddingTop: 0}}
                           name="barcode-scan"
                           size={30}
                           color='black'
                          />  
                          scan
                     </Button> 
                     <Button //MAP BUTTON 
                     onPress={this.onMapPress}>
                         <Icon 
                         activeOpacity={20}
                         style={{paddingLeft: "8%",
                         paddingRight: '70%',
                         paddingTop: 0}}
                         color='black'
                         name="crosshairs"
                         size={30}
                         />
                         map
                       </Button>
                       <Button //SAVED ITEMS BUTTON
                       onPress={this.onSavedPress}>
                           <Icon 
                            activeOpacity={20}
                            style={{paddingLeft: "8%",
                            paddingRight: '70%',
                            paddingTop: 0}}
                            color='black'
                            name="heart"
                            size={30}
                       />
                       saved
                       </Button>
                     
                  </CardSectionTwo>   
                  <CardSection>

                  <AuthButtons
                  onPress={this.onLoginPress}>
                  Login/ Sign-Up 
                            </AuthButtons>
                            </CardSection>
            </View>
              <Camera
                  visible={this.state.cameraVisable}
                  camTog={this.onScantog.bind(this)}
                  BarCodeRead={this.handleBarCodeScanned.bind(this)}
                  />
          </ImageBackground>
      </View>
          );
  }

}
////////////////////////////////////////
//all the different style components for the home screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
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
  marginTop: "1%",
  height: "50%",
  width: "15%",
  marginLeft: "8%",
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
  textsubStyle: {
    fontSize: 15,
    textAlign: "center",
    color: 'white',
    textShadowColor: 'black'
  },

  cameraStyle: {
    marginTop: '40%',
    width: '90%', 
    height: '100%',
    alignSelf: 'center',
    marginBottom: '10%',

  },
  backgroundStyle: {
  width: '100%', height: '100%'}, 
  
}
);

const mapStateToProps = () => {
return ({});
};

//expots and conects home to the rest of the app.
export default connect(mapStateToProps, {
                                          multiResponce,
                                          singleResponce })(HomeScreen);
