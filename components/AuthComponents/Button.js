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
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'Avenir-Roman',
    fontSize: 16,
   // fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
   paddingRight: '35%',
    paddingLeft: '35%'
  },
  buttonStyle: {
  //  width: '100%',
    backgroundColor: '#3cb371',
    borderRadius: 30,
    borderWidth: .5,
    borderColor: 'yellow',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '2%'
  }
};

export { Button };
