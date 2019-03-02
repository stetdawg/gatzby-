import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    fontFamily: 'Avenir-Roman',
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
   paddingRight: 8
  },
  buttonStyle: {
    flex: .5,
    //justifycontent: ''
    padding: "3.5%",
    backgroundColor: '#3cb371',
    borderRadius: 1,
    borderWidth: .1,
    borderColor: 'white',
    shadowOpacity: .2,
    //marginBottom: 8,
   // marginLeft: 1,
   // marginRight: 1
  }
};

export default Button;
