import React from "react";
import { Button } from "react-native-elements";
import { View } from "react-native";

const homeBottomButtons = ({rightButtonPush,
                            rightButtonName,
                            leftButtonName,
                          leftButtonPush,
                          iconLeft,
                          iconRight}) => {  
//console.log(ifLogedIn);
    return (
      <View 
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
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
  viewStyle: {
    color: '#0489B1',
    fontSize: 16,
    fontWeight: '600',
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
export default homeBottomButtons;
