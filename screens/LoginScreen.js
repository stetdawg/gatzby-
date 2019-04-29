import React, { Component } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormValidationMessage } from "react-native-elements";
import logo from '../assets//images/icon.png';
import { Spinner } from "../components/common/Spinner";
import { Button } from '../components/AuthComponents/Button';
import {loginUser,
        emailChanged,
        passwordChanged,
        signupUser
    } from "../actions";

class LoginScreen extends Component {
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
        loading: false,
        uID: ''
    }
    onEmailChange(text) {
      this.props.emailChanged(text);
    }
    onPasswordChange(text) {
      this.props.passwordChanged(text);
    }
    onLoginFail() {
      //this.props.navigation.navigate('loginScreen');
      alert(this.state.error);
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
    }
    onLoginAttempt() {
      const { email, password } = this.props;
      this.props.loginUser(email, password);
      }
    onSignupAttempt() {
        const { email, password } = this.props;
        this.props.signupUser(email, password);

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
        <View>
        <TouchableOpacity>
        <Button 
          styles={styles.buttonStyle}
          title="Sign In"
          onPress={this.onLoginAttempt.bind(this)}
        >
        Sign In
        </Button>
      </TouchableOpacity>
      <TouchableOpacity>
      <Button 
        styles={styles.buttonStyle}
        title="Sign up"
        onPress={this.onSignupAttempt.bind(this)}
      >
      Sign Up
      </Button>
    </TouchableOpacity>
    </View>
      );
    }

    render() {
    if (!this.props.uID)
      return (
      <View
      style={styles.container}>
        <Image 
          style={styles.logo} 
          source={logo}
          resizeMode="contain"   
          /> 
          <View />
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
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            //onChangeText={(text) => this.setState({password: text})} 
            />
        </View>
        <View>
            {this.renderError()}
        </View>
        <View>
          {this.renderButton()}
        </View>
        {/* <View>
        <AuthButtons
        onPress={this.props.onSignupAttempt}>
        Create Account?
        </ AuthButtons>
        </ View> */}
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
    flex: .5,
    alignItems: 'center',
    top:"5%",
    marginBottom: '20%'
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
const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};


export default connect(mapStateToProps, {emailChanged,
                      passwordChanged,
                      signupUser,
                      loginUser,})(LoginScreen);