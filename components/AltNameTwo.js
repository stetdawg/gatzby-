import React from "react";
import { Text, View, StyleSheet, Dimensions} from "react-native";

const AltNameTwo = () => {
    return (
        <View
        style={styles.nameStyle}>
         <Text
         style={styles.textnameStyle}>
         Search Results
        </Text>
        </View>
    );
    };
    const styles = StyleSheet.create({
        nameStyle: {
           alignSelf: 'center',
            paddingTop: Dimensions.get('window').height / 20
        },
          textnameStyle: {
            fontFamily: 'Avenir-Roman',
            fontSize: 30,
            color: 'black',
            textShadowColor: 'white',
        //  shadowOpacity: 0.5 
          },  
         })
 export default AltNameTwo;
