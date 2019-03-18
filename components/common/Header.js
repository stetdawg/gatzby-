// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../Button';

// Make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
   <Button>
    <Icon
    activeOpacity={20}
     style={{paddingLeft: "5%",
     paddingRight: '0%',
     paddingTop: 0,
     //display: 'fixed'
    }}
     name="arrow-left"
     size={30}
     color='black'
    /> 
    </Button> 
    <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    flex: .1,
    flexDirection: 'row',
    backgroundColor: 'white',
   // justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
   // elevation: 2,
    position: 'relative'
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
export default Header;
