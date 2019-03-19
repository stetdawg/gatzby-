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
import { Input } from "../components/common/Input";
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
        //this.setState({ error: 'Authentication Failed', loading: false });
          alert(this.state.error);
      }
    
      onLoginSuccess() {
        this.setState({
          uID: this.state.user,
          email: '',
          password: '',
          loading: false,
          error: '',
          logInBool: true
        });
        this.props.navigation.navigate('Home');
      }
      onLoginAttempt() {
        const { email, password } = this.props;

        this.props.loginUser(email, password);
          if (this.state.user !== '') {
          this.onLoginSuccess(); 
          }
          if (this.state.user === '') {
          this.onLoginFail();
          }
      }
      onLogOutAttempt() {
        this.props.signoutUser(this.props.uid);
      }
      onSignupAttempt() {
         const { email, password } = this.props;
         this.props.signupUser(email, password);
              if (this.state.user !== '') {
                this.onLoginSuccess(); 
              }
              if (this.state.user === '') {
                this.onLoginFail();
              }
           //}
        }
    renderError() {
      if (this.props.error) {
        return (
          <View style={{ backgroundColor: 'white'}}>
            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>
          </View>
        );
      }
    }
    renderButton() {
      if (this.props.loading) {
        return <Spinner size='large' />;
      }
      return (
        <TouchableOpacity>
        <Button 
            buttonStyle={styles.buttonStyle}
            title="Sign In"
            onPress={this.onLoginAttempt.bind(this)}
        />
      </TouchableOpacity>
      );
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
            style={styles.textInput}
            label='Email' 
            placeholder='Email@gmail.com'
            //onChangeText={(text) => this.setState({email: text})}
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email} 
            />
        </View>
        <View style={styles.passwordContainer}>
          <FormInput 
            style={styles.textInput}
            label="Password" 
            placeholder='Password'
            secureTextEntry 
            //onChangeText={(text) => this.setState({password: text})}
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password} 
            />
        </View>
        </Card>
        <View>
            {this.renderError()}
        </View>
        <View 
          style={{
            justifyContent: 'center',
          }}>
          <View>
            {this.renderButton()}
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
    height: 20,
    width: 100,
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
    
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
  
});

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;

    return { email, password, error, loading };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        emailChanged: (emailAddress) => dispatch(emailChanged(emailAddress)),
        passwordChanged: (password) => dispatch(passwordChanged(password)),
        loginUser: (email, password) => dispatch(loginUser(email, password))
    };
};

export default connect(mapStateToProps, 
                    mapDispatchToProps)(LoginScreen);