import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const PlacesButton = ({ onPress, children }) => {
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
    color: 'white',
    fontFamily: 'Avenir-Roman',
    fontSize: 11,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
   paddingRight: '35%',
    paddingLeft: '35%',
    textShadowColor: 'black',
    shadowOpacity: 0.3,
  },
  buttonStyle: {
    width: '100%',
  height: '100%',
    backgroundColor: 'grey',
  //borderRadius: 30,
  borderWidth: .5,
    borderColor: '#cce850',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '2%',
    shadowOpacity: 0.2,
  }
};

export default PlacesButton;
