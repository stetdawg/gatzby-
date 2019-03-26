import React, { Component } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput,
} from 'react-native';
import Header from '../components/common/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../assets//images/icon.png';
import { Card } from '../components/AuthComponents/Card';
import { CardSection } from '../components/AuthComponents/CardSection';
import { connect } from 'react-redux';
import { GOOGLE_FIREBASE_CONFIG } from "../assets/constants/api_keys";
import { Spinner } from "../components/common/Spinner";
import { FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { Button } from '../components/AuthComponents/Button';
import {loginUser,
        signupUser,
        emailChanged,
        passwordChanged,
        signoutUser
    } from "../actions";
//const LoginScreen = ({ onChange1, onChange2, onChange3, form1, form2, form3, button1, Title, onCancelButton, onSubmitButton, signUpBool = false}, props) => {

  class LoginScreen extends React.Component {
    static navigationOptions = {
      header: null,
      tabBarVisible: false
    };
  state = {
        email: "",
        password: "",
        repeatPassword: "",
        textInput: '',
        error: '',
        loading: false
    };
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
                onLoginSuccess();
              }
              if (this.state.user === '') {
                onLoginFail();
              }
           //}
        }
        onHomePress = () => {
          this.props.navigation.navigate('Home');
        }  
    render() {
        //if (signUpBool)
    return (
  <View
  style={styles.container}>
  <CardSection>
      <Image 
         style={styles.logo} 
          source={logo} /> 
     </CardSection>
     <CardSection>

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
        <Button style={styles.buttonStyle}>
        Login
        </Button>
        </CardSection>
</View>
);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: '#3cb371'
  },
  logo: {
    
    flex: 1,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  createAccount: {
   flex: 1,
  },

  normalText: {
    color: '#5B5A5A',
    fontSize: 12,
    alignItems: 'center',
    textAlign: 'center',
    width: 330,
  },
  createText: {
    color: '#FF7260',
    fontSize: 12,
    alignItems: 'center',
    textAlign: 'center',
    width: 330,
  },
  forgotText: {
    color: '#5B5A5A',
    fontSize: 12,
    textAlign: 'right',
    width: 330,
  },
  textInput: {
    color: '#989899',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
  },
  buttonStyle: {
    flex: .2, 
   height: '10%',
    marginTop: '10%',
    backgroundColor: '#0489B1',
  },
  emailContainer: {
    flex: .2, 
   // alignSelf: 'center',
    borderColor: '#CFD0D1',
    borderWidth: 1,
    height: '10%',
    width: '80%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#F5F6F7',
   marginTop: '10%',
    marginBottom: '1%'
  },
  passwordContainer: {
    flex: .2, 
//alignSelf: 'center',
    borderColor: '#CFD0D1',
    borderWidth: 1,
    height: '10%',
    width: '80%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#F5F6F7',
    marginBottom: '8%'
    
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