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
  color: 'grey',
   fontSize: 16,
   alignSelf: 'center',
 //  marginRight: '12%'
  },
  buttonStyle: {
    
marginTop: "100%",
  marginBottom: "1%",
  width: "50%",
//  alignSelf: 'center'
      },
};

export default AuthButtons;
