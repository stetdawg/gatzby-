import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const AuthButtons = ({ onPress, children }) => {
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
    //fontWeight: 'bold',
    color: '#3B1886',
    opacity: .8,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonStyle: {
 marginTop: "3%",
    marginBottom: "1%",
//  alignSelf: 'center'
      },
};
export default AuthButtons;

