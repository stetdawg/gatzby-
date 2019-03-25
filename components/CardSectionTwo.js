import React from 'react';
import { View } from 'react-native';

const CardSectionTwo = (props) => {
//CONTAINER FOR ITEMS IN A ROW
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
};

export default CardSectionTwo;
