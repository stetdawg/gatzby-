import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
   flex: 1,
   flexDirection: 'column',
    borderWidth: .2,
    borderRadius: 10,
    borderColor: '#6495ed',
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 5
  }
};

export default Card;
