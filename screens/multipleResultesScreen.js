import React, { Component } from "react";
import { StyleSheet, ImageBackground, FlatList, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { itemsFetch, savedToResults } from "../actions";
//import { PRIMARY_COLOR } from "../constants/style";
import SavedList from "../components/SavedList";
import AltNameTwo from "../components/AltNameTwo";

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
      <View
          style={styles.container}
            >      
         <ImageBackground
          style={styles.backgroundStyle}
          source={require("../assets/images/SilverBackground.png")}
          resizeMode='cover'
          >
          <AltNameTwo />
      <View
      style={{ backgroundColor: 'white',
      alignSelf: 'center',
      height: "80%",
      width: '100%',
    //  marginLeft: '10%',
      //marginTop: "10%",
      marginBottom: '10%'
    }}>
      <FlatList
      style={
        { 
        height: "80%",
              marginTop: "10%",
              }}
       data={this.props.items}
       renderItem={({item}) => <SavedList 
                                          item={item} 
                                          navigation={this.props.navigation}
                                          />
                  }
      keyExtractor={item => item.name}
      />
      </View>
      <TouchableOpacity 
        alignContent='center'
        onPress={this.onHomeButtonPress}
        style={{
         
        }}>
         <Icon
           activeOpacity={20}
           name="home"
           size={50}
           color='black'
           style={{
            alignSelf: 'center'
          }}
                 /> 
      </TouchableOpacity>
      </ImageBackground>
         </ View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: .9,
    flexDirection: 'column',
    backgroundColor: '#3cb371',
    alignItems: 'center'
  },
  backgroundStyle: {
    width: '100%', height: '100%'}, 
  }
);
const mapStateToProps = state => {
  const items = state.item.multiResponseData;
return { items };
};
export default connect(mapStateToProps, { itemsFetch, savedToResults })(multipleResultesScreen);
