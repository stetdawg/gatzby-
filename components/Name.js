import React from "react";
import { Text, View, StyleSheet, Dimensions} from "react-native";

const name = () => {
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
            fontSize: 40,
            fontWeight: 'bold',
            color: 'white',
            textShadowColor: 'black'
          },
          textsubStyle: {
            fontSize: 15,
            textAlign: "center",
            color: 'white',
            textShadowColor: 'black'
          },    })
 export default name;
