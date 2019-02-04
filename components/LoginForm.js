import React, { Component } from "react";
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Button } from "react-native-elements";
import { Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false};

    onButtonPress() {
        const {email, password} = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
        .this(this.onLoginSuccess.bind(this))
        .catch(() => { 
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .this(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '', 
            error: '', 
            loading: false
        });
    }

    onLoginFail() {
        this.setState({
            //email: '',
            //password: '', 
            error: 'Authenitcaiton Failed', 
            loading: false
        });
    }

 renderButton() {
     if (this.state.loading) {
         return <Spinner size="small" />;
     }
      
     return <Button onPress={this.onButtonPress.bind.this} title='Log In' />;  
 }

 render() {
    return (
        <View>
            <View>
                <Input
                placeHolder="user@gmail.com"
                label="Email"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                />
            </View>

            <View>
                <Input
                secureTextEntry
                placeHolder="password"
                label="Password"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                />
            </View>

            <Text style={styles.errorTextStyle}>
                {this.state.error}
            </Text>

            <View>
                {this.renderButton()}
            </View>
            
        </View>
    );
 }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

 export default LoginForm;