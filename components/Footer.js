// Import libraries for making a component
import React from 'react';
import { View } from 'react-native';


// Make a component
const Footer = (props) => {
    //CONTAINER FOR ITEMS IN A ROW
    return (
        <View style={styles.viewStyle}>
          {props.children}
        </View>
      );
    };

const styles = {
  viewStyle: {
    flex: .1,
    bottom: 0,
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#8ed36b',
    borderColor: 'white',
    borderTopWidth: 8,
    borderRadius: 5,
    shadowRadius: 5,
  },
};

// Make the component available to other parts of the app
export default Footer;