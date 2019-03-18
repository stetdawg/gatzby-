// Import libraries for making a component
import React from 'react';
import { View } from 'react-native';


// Make a component
const Header = (props) => {
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
    flexDirection: 'row',
    backgroundColor: '#3cb371',
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
};

// Make the component available to other parts of the app
export default Header;
