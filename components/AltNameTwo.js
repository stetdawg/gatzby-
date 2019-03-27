import React from "react";
import { Text, View, StyleSheet, Dimensions} from "react-native";

const AltNameTwo = () => {
    return (
        <View
        style={styles.nameStyle}>
         <Text
         style={styles.textnameStyle}>
         GATZBY
        </Text>
        </View>
    );
    };
    const styles = StyleSheet.create({
        nameStyle: {
            alignSelf: 'center',
            paddingTop: Dimensions.get('window').height / 12
        },
          textnameStyle: {
            fontFamily: 'Avenir-Roman',
            fontSize: 60,
            color: 'black',
            textShadowColor: 'white',
          shadowOpacity: 0.2 
          },  
         })
 export default AltNameTwo;
