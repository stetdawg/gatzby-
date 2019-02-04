import React from 'react';
import {TextInput, View, Text} from 'react-native';

const Input = ({ label, value, onChangeText, placeHolder, secureTextEntry }) => {
    const { inputStyle, labelStyle, containerSyle} = styles;

    return (
        <View style={containerSyle}>
            <Text style={labelStyle}>
                {label}
            </Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeHolder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerSyle: {
        height: 40,
        flex: 1,
        flexDiretion: 'row',
        alignItems: 'center'
    }
};


export { Input };