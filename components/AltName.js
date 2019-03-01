import React from "react";
import { Text, View, StyleSheet, Dimensions} from "react-native";

const AltName = () => {
    return (
        <View
        style={styles.nameStyle}>
         <Text
         style={styles.textnameStyle}>
         GATZBY
        </Text>
        <Text
         style={styles.textsubStyle}>
         Shop Smarter.
        </Text>
        <Text
         style={styles.textsubStyle}>
         Save Time.
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
          fontSize: 45,
          fontWeight: 'bold',
          color: 'black',
          textShadowColor: 'black'
        },
        textsubStyle: {
          fontFamily: 'Avenir-Roman',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: "center",
          color: 'black',
          textShadowColor: 'black'

          },    })
 export default AltName;