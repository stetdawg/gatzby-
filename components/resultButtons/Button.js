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
  color: '#20b2aa',
   fontSize: 14,
  },
  buttonStyle: {
  marginTop: "1%",
  marginBottom: "1%",
 // width: "12%",
  //alignSelf: 'center'
      },
};

export default Button;
