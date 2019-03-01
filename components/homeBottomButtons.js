import React from "react";
import { Button } from "react-native-elements";
import { View } from "react-native";
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeBottomButtons = (
  {rightButtonPush, rightButtonName,
    leftButtonName, leftButtonPush,
    iconLeft, iconRight}) =>  {  

 const { viewStyle, buttonStyle } = styles;
//console.log(ifLogedIn);
return (

<View 
    style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      }}>>
  <View 
    style={viewStyle}>     
    
      <Button 
        icon={{name: iconLeft,
        color: 'white'}}
        buttonStyle={buttonStyle}
        title={leftButtonName}
        onPress={leftButtonPush}   
      />    
  </View>
     
  <View style={viewStyle}>

        <Button 
          icon={{name: iconRight,
          color: 'white'}}
          buttonStyle={buttonStyle}
          title={rightButtonName} 
          onPress={rightButtonPush}
          />

  </View>
            
</View>
    );
  };
const styles = {
  viewStyle: {
    paddingTop: 10,
    borderRadius: 15,
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#0489B1',
    borderRadius: 10,
    borderWidth: 0.5,
    width: 125,
    height: 45,
  }
};
export default HomeBottomButtons;
