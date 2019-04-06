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
  paddingTop: 33,
width: '100%',
  backgroundColor: '#8ed36b',
  borderColor: 'white',
  borderBottomWidth: 8,
  borderRadius: 2,
  alignItems: 'center',
  justifyContent: 'center',


},
};

// Make the component available to other parts of the app
export default Header;
