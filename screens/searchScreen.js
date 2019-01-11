import React, { Component } from "react";
import { View } from "react-native";

import {SearchBar} from 'react-native-elements';

class searchScreen extends Component {
  static navigationOptions = {
    header: null
  };
   search = "";
   changnedText (){

   }

        render() {
            return (
              <View
              style={{flex:1,
              paddingTop: "10%"}}>
             <SearchBar
                     placeholder='Type Here...' />

              </View>
            );
            }
  }; 
  export default searchScreen;
