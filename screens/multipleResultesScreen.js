import React, { Component } from "react";
import { FlatList, View, TouchableOpacity, StyleSheet, alert, Text } from "react-native";
import Footer from '../components/Footer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import { connect } from "react-redux";
//import {MapView} from "react-native-maps";
import { itemsFetch, savedToResults } from "../actions";
//import { PRIMARY_COLOR } from "../constants/style";
import SavedList from "../components/SavedList";
import Header from "../components/common/Header";

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
  // alert("We found multiple items that fit your search criteria. Please click on the item you wish to see the the prices on!");
  } 
  onHomePress = () => {
    this.props.navigation.navigate('Home');
  }  
 
  //////////////////////////////////////////////////////////////////////////////////
  // Render method
  render() {
    return (
     <View
     style={styles.container}>
    <Header
    style={styles.headerStyle
    }> 
    <Text
    style={styles.textStyle}>
    Search Results
    </ Text>
    <Icon
    activeOpacity={20}
     style={{
       marginLeft: '5%'
     }}
     name="magnify"
     size={40}
     color='white'
    />  
    </ Header>
      <FlatList
      style={styles.listContainer}
       data={this.props.items}
       renderItem={({item}) => <SavedList 
                                          item={item} 
                                          navigation={this.props.navigation}
                                          />}
      keyExtractor={item => item.name}
      />
      <Footer>
      <Button //SCAN BUTTON
                     onPress={this.onHomePress}>
                         <Icon
                          activeOpacity={20}
                           style={{
                          alignSelf: 'flex-start'
                           }}
                           name="arrow-left"
                           size={40}
                           color='white'
                          />  
                     </Button> 
      </ Footer>
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
  backgroundColor: 'white',
    height: '100%',
      width: '100%',
},
listContainer: {
flex: .8,
backgroundColor: 'white',
borderColor: 'white',
borderWidth: .2,
borderRadius: 8
},
textStyle: {
  fontSize: 30,
  fontFamily: 'Avenir-Roman',
  textAlign: 'center',
  fontWeight: 'bold',
  color: 'white',
  textShadowColor: 'black'
},
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
}
});
