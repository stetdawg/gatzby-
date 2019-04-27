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
    borderBottomWidth: 1,
    padding: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: '#ddd',
  }
};

export default CardSection;
