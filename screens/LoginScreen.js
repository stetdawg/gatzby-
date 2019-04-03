import React, { Component } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput,
  TouchableOpacity
} from 'react-native';
import AuthButtons from '../components/AuthComponents/AuthButtons';
import logo from '../assets//images/icon.png';
import { connect } from 'react-redux';
import { GOOGLE_FIREBASE_CONFIG } from "../assets/constants/api_keys";
import { Spinner } from "../components/common/Spinner";
import {  Card, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { Button } from '../components/AuthComponents/Button';
import { firebase } from 'firebase';

import {loginUser,
        signupUser,
        emailChanged,
        passwordChanged,
        signoutUser
    } from "../actions";
//const LoginScreen = ({ onChange1, onChange2, onChange3, form1, form2, form3, button1, Title, onCancelButton, onSubmitButton, signUpBool = false}, props) => {

class LoginScreen extends Component {
    state = {
        email: "",
        password: "",
        repeatPassword: "",
        textInput: '',
        error: '',
        loading: false,
        uID: ''
    }
    onEmailChange(text) {
      this.props.emailChanged(text);
    }
    onPasswordChange(text) {
      this.props.passwordChanged(text);
    }
    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      };
      validatePassword = (password) => {
        const re = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
          return re.test(password);
      }
      onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false });
      }
      onLoginSuccess() {
        this.setState({
          email: '',
          password: '',
          loading: false,
          error: '',
          logInBool: true
        });
        this.props.navigation.navigate('homescreen');
      }
      onLoginAttempt() {
        //console.log(this.state.email + ' ' + this.state.password);
        const { email, password } = this.state;
        // console.log(email + ' ' + password);
        //  if (!this.validateEmail(email)) {
        //    alert("This is not a valid email address!");
        //  } 
        //  if (!this.validatePassword(password)) {
        //    alert("Password must contain one lower case letter, one uppercase letter, one number, one special character, and be 8 characters long");
        //  }
        //  if (this.validateEmail(email) && this.validatePassword(password)) {
          this.setState({ error: '', loading: true });

          firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
              firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onLoginSuccess.bind(this))
                .catch(this.onLoginFail.bind(this));
            });

           this.props.loginUser(email, password);
           if (this.state.user !== '') {
            this.setState({logInBool: true});
          }
         //}
      }
      onSignupAttempt() {
        //console.log(this.state.email + ' ' + this.state.password + ' ' + this.state.repeatPassword);
         const { email, password, repeatPassword } = this.state;
        //  console.log(email + ' ' + password + ' ' + repeatPassword);
        //   if (!this.validateEmail(email)) {
        //     alert("This is not a valid email address!");
        //   } 
        //   if (!this.validatePassword(password)) {
        //     alert("Password must contain one lower case letter, one uppercase letter, one number, one special character, and be 8 characters long");
        //   }
        //   if (this.validateEmail(email) && this.validatePassword(password)) {
          this.props.signupUser(email, password, repeatPassword);
              if (this.state.user !== '') {
                this.onLoginSuccess();
              }
              if (this.state.user === '') {
                this.onLoginFail();
              }
           //}
        }

    render() {
        //if (signUpBool)
    return (
      <View
      style={styles.container}>
  <Image 
         style={styles.logo} 
          source={logo}   
          /> 
          <View />
     <View style={styles.emailContainer}>
          <FormInput 
            style={styles.textInput} placeholder='Email'
            onChangeText={(text) => this.setState({email: text})} />
        </View>
        <View style={styles.passwordContainer}>
          <FormInput 
            style={styles.textInput} 
            placeholder='Password'
            secureTextEntry 
            onChangeText={(text) => this.setState({password: text})} />
        </View>
        <Button
        styles={styles.buttonStyle}
        onPress={this.onLoginAttempt.bind(this)}
        >
        Sign In
        </Button>
        <View>
        <AuthButtons>
       Create Account?
        </ AuthButtons>
        </ View>
        </ View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  logo: {
    flex: .6,
    alignItems: 'center',
    marginBottom: '30%'
  },
  normalText: {
    fontFamily: 'Avenir-Roman',
  //  fontWeight: 'bold',
    color: '#3B1886',
    fontSize: 14,
    textAlign: 'center',
   // width: 330,
  },
  createText: {
    fontFamily: 'Avenir-Roman',
    color: '#FF7260',
    fontSize: 14,
    alignItems: 'center',
    textAlign: 'center',
    width: 330,
  },
  forgotText: {
    fontFamily: 'Avenir-Roman',
    color: '#5B5A5A',
    fontSize: 14,
    textAlign: 'right',
    width: 330,
  },
  textInput: {
    fontFamily: 'Avenir-Roman',
    color: '#989899',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
  },
  buttonStyle: {
    flex: 1, 
    //adding: '10%',
    width: '100%',
   height: '10%',
   marginTop: '10%',
   backgroundColor: '#0489B1',
  },
  emailContainer: {
    flex: .08, 
    opacity: 2, 
    // alignSelf: 'center',
    borderColor: '#CFD0D1',
    borderWidth: 3,
    height: '10%',
    width: '80%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
   backgroundColor: '#F5F6F7',
  // marginTop: '15%',
    marginBottom: '3%'
  },
  passwordContainer: {
    flex: .08, 
//alignSelf: 'center',
    opacity: 2, 
    borderColor: '#CFD0D1',
    borderWidth: 3,
    height: '10%',
    width: '80%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#F5F6F7',
    marginBottom: '3%'
    
  }
  
});
const mapStateToProps = state => {
    return {
      email: state.auth.email,
      password: state.auth.password,
      repeatPassword: state.auth.repeatPassword,
      user: state.auth.user
    };
  };
export default connect(mapStateToProps, {emailChanged,
                                        passwordChanged,
                                        signupUser,
                                        loginUser})(LoginScreen);
