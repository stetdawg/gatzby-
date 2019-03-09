import React from 'react';
import { StyleSheet, Text, ImageBackground, View, Dimensions, TouchableOpacity } from 'react-native';
//import ReduxThunk from 'redux-thunk';
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
import Camera from "../components/Camera";
//import { loginUser, signupUser } from "../actions/auth_actions";
import LoginForm from "../components/LoginForm";
import HomeBottomButtons from '../components/HomeBottomButtons';
import { GOOGLE_FIREBASE_CONFIG } from "../assets/constants/api_keys";
import { Spinner } from "../components/common/Spinner";
import {barCodeData,
        walRes,
        loginUser,
        signupUser,
        emailChanged,
        passwordChanged,
        signoutUser
        } from "../actions";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    hasCameraPermission: null,
    cameraVisable: false,
    loginVisable: false,
    signUpVisable: false,
    
    email: "",
    password: "",
    repeatPassword: "",
    textInput: ''
  };
  logInBool=false;
   leftButton = "Log In"
   rightButton= "Sign Up"
   leftIcon = 'person'
   rightIcon = 'person-add'
  ///////////////////////////////////////////////
  // checks if we have permistion to used the camera from the user
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA); // ask for permistion to use camera
    this.setState({ hasCameraPermission: status === 'granted' }); // determase wether we can use camera'
    firebase.initializeApp(GOOGLE_FIREBASE_CONFIG);
    }
    componentDidUpdate(oldprops) {
      console.log(this.props.user);
      if ( this.props.user.uid !== "" && oldprops.user.uid !== this.props.user.uid) {
        console.log(this.props.user);
        this.props.logInBool = true;
        this.renderButtons(); 
        this.setState({loginVisable: false});
        this.setState({signUpVisable: false}); 
      }
      if (this.props.user.uid !== oldprops.user.uid) {
        this.props.logInBool = false; 
      }
    } 
    
    onEmailChange(text) {
      this.props.emailChanged(text);
    }
    onPasswordChange(text) {
      this.props.passwordChanged(text);
    }
    //onRepeatPasswordChange(text) {
    //  this.props.repeatPasswordChanged(text);
    //}
    validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    validatePassword = (password) => {
      const re = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
        return re.test(password);
    }
    onLoginAttempt() {
      //console.log(this.state.email + ' ' + this.state.password);
      const { email, password } = this.state;
      //console.log(email + ' ' + password);
       if (!this.validateEmail(email)) {
         alert("This is not a valid email address!");
       } 
       if (!this.validatePassword(password)) {
         alert("Password must contain one lower case letter, one uppercase letter, one number, one special character, and be 8 characters long");
       }
       if (this.validateEmail(email) && this.validatePassword(password)) {
         this.props.loginUser(email, password);
          // if (this.state.user !== '') {
          //   this.setState({logInBool: true});
          //   this.setState({loginVisable: false});
          //   this.renderButtons();
          // }
       }
    }
    onLogOutAttempt() {
      this.props.signoutUser(this.props.uid);
    }
    onSignupAttempt() {
     //console.log(this.state.email + ' ' + this.state.password + ' ' + this.state.repeatPassword);
      const { email, password, repeatPassword } = this.state;
      console.log(email + ' ' + password + ' ' + repeatPassword);
       if (!this.validateEmail(email)) {
         alert("This is not a valid email address!");
       } 
       if (!this.validatePassword(password)) {
         alert("Password must contain one lower case letter, one uppercase letter, one number, one special character, and be 8 characters long");
       }
       if (this.validateEmail(email) && this.validatePassword(password)) {
       this.props.signupUser(email, password, repeatPassword);
          // if (this.state.user !== '') {
          //   this.setState({logInBool: true});
          //   this.setState({loginVisable: false});
          //   this.renderButtons();
          // }
       }
    }
    
    renderButtons = () => {
      switch (this.props.logInBool) {
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
    handleLeftButtonPush() {
      if (!this.props.logInBool) {
        this.onLogintog(this);
        console.log("Log in Button Pushed"); 
      //this.setState({logInBool: false});
      this.renderButtons();
      } else {
        this.onLogOuttog(this);
        console.log("Log Out Button Pushed"); 
        this.renderButtons();        
      }
    }
    handleRightButtonPush() {
      if (!this.props.logInBool) {
          this.onSignUptog(this); 
        //this.setState({logInBool: false});
        this.renderButtons();
        } else {
          console.log("Saved List Button Pushed");
          this.renderButtons();
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
  onLogOuttog() {
    if (this.state.logoutVisable)
    this.setState({logoutVisable: false});
    else
    this.setState({logoutVisable: true});
  }

  onSignUptog() {
    if (this.state.signUpVisable)
    this.setState({signUpVisable: false});
    else
    this.setState({signUpVisable: true});
  }

  handleTextInput = async () => {
    console.log(`${this.state.textInput}`);
   this.props.barCodeData("UPC", this.state.textInput);
   await this.props.walRes(this.state.textInput);
   this.props.navigation.navigate('searchResults');
 }

  /////////////////////////////////////////////
  //after barcode is read will pass to this function
  //this function togles camera, sends bar code info to
  //reducers and sends the user to the results screen.
     handleBarCodeScanned = async ({data, type}) => {
       console.log(`${data} ${type}`);
      this.setState({cameraVisable: !this.state.cameraVisable });
      this.props.barCodeData(type, data);
      await this.props.walRes(data);
      this.props.navigation.navigate('searchResults');
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
           <View
            style={styles.nameStyle}>
             <Text
             style={styles.textnameStyle}>
             GATZBY
            </Text>
            <Text
             style={styles.textsubStyle}>
             Shop Smarter.
            </Text>
            <Text
             style={styles.textsubStyle}>
             Save Time.
            </Text>
            </View>
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
                onChange1={this.onEmailChange.bind(this)}
                onChange1={(text) => this.setState({email: text})}
                onChange2={this.onPasswordChange.bind(this)} 
                onChange2={(text) => this.setState({password: text})} 
                form1='Email'
                form2='Password'
                onCancelButton={this.onLogintog.bind(this)}
                onSubmitButton={this.onLoginAttempt.bind(this)}
                />
            {
              /*
              log in pop up section
              *********************************************************************************/
            }
            <LoginForm 
              visible={this.state.logoutVisable}
                Title="Log Out"
                button1="Log Out"
                //onChange1={this.onEmailChange.bind(this)}
                //onChange1={(text) => this.setState({email: text})}
                //onChange2={this.onPasswordChange.bind(this)} 
                //onChange2={(text) => this.setState({password: text})} 
                //form1='Email'
                //form2='Password'
                onCancelButton={this.onLogOuttog.bind(this)}
                onSubmitButton={this.onLogOutAttempt.bind(this)}
                />
              
            { /********************************************************************************
                sign up pop up section
            */
            }
            <LoginForm
              visible={this.state.signUpVisable}
                Title="Sign Up"
                button1="Sign Up"
                onChange1={this.onEmailChange.bind(this)}
                onChange1={(text) => this.setState({email: text})}
                onChange2={this.onPasswordChange.bind(this)} 
                onChange2={(text) => this.setState({password: text})} 
                onChange3={(text) => this.setState({repeatPassword: text})}
                form1='Email:'
                form2='Password:'
                form3='Repeat Password:'
                signUpBool
                onCancelButton={this.onSignUptog.bind(this)}
                onSubmitButton={this.onSignupAttempt.bind(this)}
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
  backgroundStyle: {
  width: '100%', height: '100%'}, 
  
}
);

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    repeatPassword: state.auth.repeatPassword,
    user: state.auth.user
  };
};
//expots and conects home to the rest of the app.


export default connect(mapStateToProps, { emailChanged,
                                          passwordChanged,
                                          signupUser,
                                          loginUser, 
                                          barCodeData,
                                          walRes})(HomeScreen);
