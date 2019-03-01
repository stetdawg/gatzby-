import React from "react";
import { Button } from "react-native-elements";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const homeBottomButtons = ({rightButtonPush,
                            rightButtonName,
                            leftButtonName,
                          leftButtonPush,
                          iconLeft,
                          iconRight}) => {  
//console.log(ifLogedIn);
    return (
      <View style={{
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        //alignItems: 'stretch',
      }}>>
        <View style={styles.ViewStyle}>
          <Button 
          icon={{name: iconLeft,
                color: 'white'}}
          buttonStyle={styles.buttonStyle}
          title={leftButtonName}
          onPress={leftButtonPush}   
          />
        </View>
      
      <View style={styles.ViewStyle}>
      
        <Button 
        icon={{name: iconRight,
              color: 'white'}}
        buttonStyle={styles.buttonStyle}
        title={rightButtonName} 
        onPress={rightButtonPush}
        />
      </View>
      
    </View>
    );
  

  };
const styles = {
  textStyle: {
    fontSize: 16,
    fontWeight: '600'
  },
  orientation: {
    
  },
  viewStyle: {
    color: '#0489B1',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    borderRadius: 15,
    paddingBottom: 10
  },
  buttonStyle: {
    //flex: 1,
    //alignSelf: 'stretch'
    backgroundColor: '#0489B1',
    borderRadius: 10,
    borderWidth: 0.5,
    //BorderColor: '#007aff',
    //marginLeft: 10,
    //marginRight: 10,
    //marginBottom: 10
    width: 125,
    height: 45,
  }
};
export default homeBottomButtons;
