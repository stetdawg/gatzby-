import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { connect } from 'react-redux';
//import { AppLoading } from 'expo';
import ItemDetals from "../components/ItemDetals";

import { PRIMARY_COLOR } from "../constants/style";

class ItemDetalsScreen extends Component {
    static navigationOptions = ({ navigation }) => (
    {
        tabBarVisible: false,
        title: "",
        headerTitleStyle: {
          textAlign: "center",
          alignSelf: "center"
        }, 
        headerLeft: (
            <Button
              navigate={navigation.navigate}
              large
              icon={{ name: "menu" }}
              backgroundColor={PRIMARY_COLOR}
              onPress={() => navigation.navigate("DrawerOpen")}
            />
          )
        });          

    render() {
      //console.log(this.props.itemInfo);
      
        return (
            <ScrollView>
             <ItemDetals {...this.props} />             
            </ScrollView>
        );
      }
      
}
const mapStateToProps = state => {
    return {
    itemInfo: state.item.itemInfo
    };
};
  export default connect(mapStateToProps, null)(ItemDetalsScreen);
