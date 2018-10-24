import React, { Component } from "react";
import { Text, View, Linking } from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from 'react-redux';

import { saveCode, walRes } from "../actions";
import * as urls from "../services/urlbuilder";

class SearchResultsScreen extends Component { 

       onSaveButton() {
         const { itemInfo, saveCode } = this.props;
         console.log(itemInfo);
          saveCode(itemInfo);
          this.props.navigation.navigate('SavedItems');
       }
      //  onwalPress() {
      //    const { upc } = this.props.itemInfo.upc;
      //    Linking.openURL(urls.walmartUrl(upc));
      //  }
      //  onTargetPress() {
      //   const { upc } = this.props.itemInfo.upc;
      //   Linking.openURL(urls.targetUrl(upc));
      // }
      // onBestPress() {
      //   const { upc } = this.props.itemInfo.upc;
      //   Linking.openURL(urls.BestUrl(upc));
      // }
      // onAmPress() {
      //   const { upc } = this.props.itemInfo.upc;
      //   Linking.openURL(urls.amazonUrl(upc));        
      // }

    render() {
     // console.log(this.props.itemInfo);
      
        return (
            <View>
              <Card 
              title={this.props.itemInfo.name}
              image={{ uri: this.props.itemInfo.largeImage }}
              >
              <Text
              style={{ marginBottom: 10 }}
              >
              Description: {this.props.itemInfo.shortDescription}
              </Text>
              </Card>
              <View
              style={styles.Walmart.ViewStyle}
              >           
            <Button
            buttonStyle={styles.Walmart.buttonStyle}
            title="Walmart"
            onPress={() => Linking.openURL(urls.walmartUrl(this.props.itemInfo.codeData))}
            /> 
            </View>   
            <View
            style={styles.Target.ViewStyle}
            >   
            <Button
            buttonStyle={styles.Target.buttonStyle}
            title="Target"
            onPress={() => Linking.openURL(urls.targetUrl(this.props.itemInfo.codeData))}
            />
            </View>  
            <View
            style={styles.Best.ViewStyle}
            >
            <Button
            buttonStyle={styles.Best.buttonStyle}
            title="Best Buy"
            onPress={() => Linking.openURL(urls.BestUrl(this.props.itemInfo.codeData))}
            />
            </View>   
            <View
            style={styles.Amazon.ViewStyle}
            >               
            <Button
            buttonStyle={styles.Amazon.buttonStyle}
            title="Amazon"
            onPress={() => Linking.openURL(urls.amazonUrl(this.props.itemInfo.codeData))}
            />
            </View>                       
            </View>
        );
      }
      
}

const styles = { 
  Target: { 
    ViewStyle: {
      paddingTop: 15,
      borderRadius: 15
    },
    buttonStyle: {
      backgroundColor: '#d82424',
      borderRadius: 15
    } 
    },
  Amazon: { 
    ViewStyle: {
    paddingTop: 15,
    borderRadius: 15
  },
  buttonStyle: {
    backgroundColor: '#ffaa00',
    borderRadius: 15,
    marginBottom: 10
  } 

  }, 
  Best: { 
    ViewStyle: {
    paddingTop: 15,
    borderRadius: 15
  }, 
    buttonStyle: {
      backgroundColor: '#0000ff',
      borderRadius: 15
    }
  },
  Walmart: {
    ViewStyle: {
      paddingTop: 15,
      borderRadius: 15,
    },
    buttonStyle: {
      backgroundColor: '#2093e5',
      borderRadius: 15
    } 
  }
};
  export default connect(null, { saveCode,
                                 walRes    })(SearchResultsScreen);