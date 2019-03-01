import React from 'react';
import firebase from "firebase";
import {
  StyleSheet,
  ImageBackground,
  View, 
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Permissions} from 'expo';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from "axios";
import Camera from "../components/Camera";
import LoginForm from "../components/LoginForm";
import HomeBottomButtons from '../components/HomeBottomButtons';
import { GOOGLE_FIREBASE_CONFIG } from "../assets/constants/api_keys";
import { Spinner } from "../components/common/Spinner";
import Name from "../components/Name";
//import AltName from "../components/AltName";
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

   leftButton = "Log In"
   rightButton= "Sign Up"
   leftIcon = 'person'
   rightIcon = 'person-add'
  ///////////////////////////////////////////////
  // checks if we have permistion to used the camera from the user
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA); // ask for permistion to use camera
    this.setState({ hasCameraPermission: status === 'granted' }); // determase wether we can use camera'
    firebase.initializeApp({ GOOGLE_FIREBASE_CONFIG });
    }
    componentWillReceiveProps() {
    } 
    
    
    renderButtons() {
      switch (this.state.logInBool) {
        case true:
          this.leftButton = "Log Out";
          this.rightButton = "Saved List";
          this.leftIcon = 'person-outline';
          this.rightIcon = 'list';
          this.forceUpdate();
          break;
        case false:
          this.leftButton = "Log In";
          this.rightButton = "Sign Up";
          this.leftIcon = 'person';
          this.rightIcon = 'person-add';
          this.forceUpdate();
          break;
        default:
          return (
            <View>
            <Spinner size="large" />
          </View>);
      }
    }

    logInfunction() {

    }

    async handleLeftButtonPush() {
      if (this.state.logInBool) {
      //console.log("Log In Button Pushed");
      this.setState({logInBool: false});
      this.renderButtons();
      } else {
        console.log(this.state.loginVisable);
        this.onLogintog(this);          
      }
    }
    handleRightButtonPush() {
      if (this.state.logInBool) {
        //console.log("Log In Button Pushed");
        this.setState({logInBool: false});
        this.renderButtons();
        } else {
          this.onSignUptog(this);          
        }
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


  onLogintog() {
    if (this.state.loginVisable)
    this.setState({loginVisable: false});
    else
    this.setState({loginVisable: true});
  }

  onSignUptog() {
    if (this.state.signUpVisable)
    this.setState({signUpVisable: false});
    else
    this.setState({signUpVisable: true});
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
          source={require("../assets/images/home2.png")}
          resizeMode='cover'
          >
          {/************************************************************************************
          the name and sub text of the home screen
          */}
           <Name />
            {/*
            end name and subText
            ****************************************************************************/}

            
            {/* **************************************************************************
            search section of the home screen
            */}
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
                      
                    <TouchableOpacity onPress={this.onScantog.bind(this)}>
                     <Icon
                     activeOpacity={20}
                     style={{paddingLeft: "8%",
                     paddingRight: '70%',
                    paddingTop: 0}}
                     name="barcode-scan"
                     size={50}
                     />  
                     </TouchableOpacity>  
            </View>  
            {/*
            end seach section of home screen 
            *************************************************************************************/}
           
            { /********************************************************************************
                bottom button section
            */
            }
           
            <HomeBottomButtons 
             leftButtonName={this.leftButton}
             leftButtonPush={this.handleLeftButtonPush.bind(this)}
             rightButtonName={this.rightButton}
             rightButtonPush={this.handleRightButtonPush.bind(this)}
             iconRight={this.rightIcon}
             iconLeft={this.leftIcon}
             />
            
           {
              /*
              end bottom button section
              *********************************************************************************/
            }

            {/************************************************************************************
              camera section and passes in function for the camera
            */}          
               
                  <Camera
                  visible={this.state.cameraVisable}
                  camTog={this.onScantog.bind(this)}
                  BarCodeRead={this.handleBarCodeScanned.bind(this)}
                  />
            {/*
            end camera pop up
             **********************************************************************************/}

             { /********************************************************************************
               log in pop up section
            */
            }
              <LoginForm 
              visible={this.state.loginVisable}
                Title="Log In"
                button1="Log In"
                onChange1={(text) => this.setState({email: text})}
                onChange2={(text) => this.setState({passowrd: text})} 
                form1='Email'
                form2='Password'
                onCancelButton={this.onLogintog.bind(this)}
                />

            {
              /*
              log in pop up section
              *********************************************************************************/
            }
              

            { /********************************************************************************
                sign up pop up section
            */
            }
              <LoginForm 
              visible={this.state.signUpVisable}
                Title="Sign Up"
                button1="Sign Up"
                onChange1={(text) => this.setState({email: text})}
                onChange2={(text) => this.setState({passowrd: text})} 
                onChange3={(text) => this.setState({repeatPassword: text})} 
                form1='Email:'
                form2='Password:'
                form3='Repeat Password:'
                signUpBool
                onCancelButton={this.onSignUptog.bind(this)}
                />
            {
              /*
              end sign up pop up section
              *********************************************************************************/
            }
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
