import React from "react";
import Button from './common/Button';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeBottomButtons = () => {  
return (
  <View style={styles.buttonContainer}>
  <Button>
         <Text>Log-in</Text>
         <Icon name='inbox' />
    </Button>
   <Button>
          <Text>Sign-Up</Text>
         <Icon name='inbox' />
         </Button>
    </View>    
          );
  };
  const styles = {
      buttonContainer: {
       
        flexDirection: 'row',
        justifyContent: 'flex-end',
       // alignItems: 'stretch'
      } 
    };
export default HomeBottomButtons;
