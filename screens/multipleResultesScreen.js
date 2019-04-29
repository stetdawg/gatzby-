import React, { Component } from "react";
import { FlatList, View, TouchableOpacity, StyleSheet, alert } from "react-native";
import { connect } from "react-redux";
//import {MapView} from "react-native-maps";
import Icon from 'react-native-vector-icons/FontAwesome';
import { itemsFetch, savedToResults } from "../actions";
//import { PRIMARY_COLOR } from "../constants/style";
import SavedList from "../components/SavedList";
import Name from "../components/Name";

class multipleResultesScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators

  static navigationOptions = {
    header: null,
    tabBarVisible: false
    };
  //////////////////////////////////////////////////////////////////////////////////
  // Initialize the component
 componentWillMount() {
   //alert("We found multiple items that fit your search criteria. Please click on the item you wish to see the the prices on!");
  } 
  onHomeButtonPress() {
    this.props.navigation.navigate('Home');
  } 
 
  //////////////////////////////////////////////////////////////////////////////////
  // Render method
  render() {
    return (
     <View>
       < Name />
      <View
      style={{ backgroundColor: "rgba(52, 52, 52, 0.5)",
      height: "60%",
      marginTop: "10%",
      marginBottom: "10%"}}>
      <FlatList
      style={{height: "100%",
              marginTop: "10%",
              marginBottom: "-10%"}}
       data={this.props.items}
       renderItem={({item}) => <SavedList 
                                          item={item} 
                                          navigation={this.props.navigation}
                                          />}
      keyExtractor={item => item.name}
      />
      </View>
      <TouchableOpacity 
        alignContent='center'
        onPress={this.onHomeButtonPress.bind(this)}
        style={{
          alignSelf: 'center',
          bottom: 0
        }}>
        
         <Icon
           activeOpacity={20}
           name="home"
           size={75}
           color='black'
           style={{
            alignSelf: 'center'
          }}
                 /> 
      </TouchableOpacity>
         </View>
    );
  }
}
const mapStateToProps = state => {
  const items = state.item.multiResponseData;
return { items };
};
export default connect(mapStateToProps, { itemsFetch, savedToResults })(multipleResultesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
},
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'

}
});
