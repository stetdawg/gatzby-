// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';
// Make a component
const Footer = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
    <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
    viewStyle: {
      flex: .3,
      flexDirection: 'row',
      backgroundColor: '#3cb371',
     // justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      width: '100%',
      paddingTop: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
        elevation: 2,
        position: 'absolute',
        bottom:0
    },
    textStyle: {
        width: '75%',
          alignSelf: 'center',
          textAlign: 'center',
           fontFamily: 'Avenir-Roman',
            fontSize: 40,
            fontWeight: 'bold',
            color: '#3cb371',
            textShadowColor: 'black',
            shadowOpacity: .2 
    }
  };

// Make the component available to other parts of the app
export default Footer;
