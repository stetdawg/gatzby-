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
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
   paddingRight: '35%',
    paddingLeft: '35%',
    textShadowColor: 'black',
    shadowOpacity: 0.3,
  },
  buttonStyle: {
  //  width: '100%',
    backgroundColor: '#acee8a',
    borderRadius: 30,
    borderWidth: .5,
    borderColor: '#cce850',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '2%',
    shadowOpacity: 0.2,
  }
};

export { Button };
