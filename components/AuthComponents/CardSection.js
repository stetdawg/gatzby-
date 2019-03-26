import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
   flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
  //  justifyContent: 'center',
   // flexDirection: 'row',
    borderColor: 'white',
    position: 'relative'
  }
};

export { CardSection };
