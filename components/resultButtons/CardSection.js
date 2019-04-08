import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
//CONTAINER FOR ITEMS IN A ROW
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
   alignItems: 'center',
   justifyContent: 'center',
    flexDirection: 'column',
    width: '50%',
    height: '100%',
    backgroundColor: 'grey',
  },
};

export default CardSection;
