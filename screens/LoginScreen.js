import React, { Component } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput,
  TouchableOpacity
} from 'react-native';
import logo from '../assets//images/icon.png';
import { connect } from 'react-redux';
import { GOOGLE_FIREBASE_CONFIG } from "../assets/constants/api_keys";
import { Spinner } from "../components/common/Spinner";
import { Button, Card, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
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
    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      };
      validatePassword = (password) => {
        const re = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
          return re.test(password);
      }
      onLoginFail() {
        //this.setState({ error: 'Authentication Failed', loading: false });
          alert(this.state.error);
      }
    
      onLoginSuccess() {
        console.log(this.state.uID);
        this.setState({
          uID: this.state.user,
          email: '',
          password: '',
          loading: false,
          error: '',
          logInBool: true
        });
        console.log(this.state.uID);
        this.props.navigation.navigate('Home');
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
          this.onLoginSuccess(); 
          }
          if (this.state.user === '') {
          this.onLoginFail();
          }
         //}
      }
      onSignupAttempt() {
        //console.log(this.state.email + ' ' + this.state.password + ' ' + this.state.repeatPassword);
         const { email, password } = this.state;
        //  console.log(email + ' ' + password + ' ' + repeatPassword);
        //   if (!this.validateEmail(email)) {
        //     alert("This is not a valid email address!");
        //   } 
        //   if (!this.validatePassword(password)) {
        //     alert("Password must contain one lower case letter, one uppercase letter, one number, one special character, and be 8 characters long");
        //   }
        //   if (this.validateEmail(email) && this.validatePassword(password)) {
          this.props.signupUser(email, password);
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
      <View>
        <View style={styles.logoContiner}>
         <Image 
         style={styles.logo} 
          source={logo} />
        </View>
      <View style={styles.container}>
       <Card title='Sign In'>
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
        </Card>
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={styles.button}>
            <TouchableOpacity>
              <Button 
                  buttonStyle={styles.buttonStyle}
                  title="Sign In"
                  onPress={this.onLoginAttempt.bind(this)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title="Sign Up"
                    onPress={this.onSignupAttempt.bind(this)}
                />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingTop: 50
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignItems: 'center'
  },
  createAccount: {
    height: 30,
  },
  normalContainer: {
    height: 20,
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
    alignItems: 'flex-end',
    textAlign: 'right',
    width: 330,
  },
  logoContiner: {
    //height: 170,
    //flexDirection: 'column',
    //justifyContent: 'flex-end',
  },
  textInput: {
    color: '#989899',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 200,
    //bottom: 15,
    backgroundColor: '#0489B1',
    //borderRadius: 10,
    //borderWidth: 0.5,
    width: 125,
    height: 45,
  },
  button: {
    
    // width: 325,
    // borderColor: '#0489B1',
    // borderWidth: 1,
    // height: 50,
    // padding: 10,
    // borderRadius: 24,
    // marginTop: 20,
    // backgroundColor: '#0489B1',
    flexDirection: 'column',
    flex: 1
    // //justifyContent: 'center',
    // //alignItems: 'center',
    // shadowColor: '#0489B1',
    // shadowOffset: {
    //   width: 0,
    //   height: 4
    // },
    // shadowRadius: 5,
    // shadowOpacity: 0.8
  },
  buttonText: {
    color: 'white',
    fontSize: 12
  },
  emailContainer: {
    width: 325,
    borderColor: '#CFD0D1',
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: '#F5F6F7'
  },
  passwordContainer: {
    width: 325,
    borderColor: '#CFD0D1',
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#F5F6F7'
    
  }
  
});

const mapStateToProps = state => {
    return {
      email: state.auth.email,
      password: state.auth.password,
      repeatPassword: state.auth.repeatPassword,
      user: state.auth.user,
      error: state.auth.error
    };
  };
export default connect(mapStateToProps, {emailChanged,
                                        passwordChanged,
                                        signupUser,
                                        loginUser})(LoginScreen);