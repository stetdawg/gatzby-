import React, { Component } from "react";
import { ImageBackground, FlatList, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { itemsFetch, savedToResults } from "../actions";
//import { PRIMARY_COLOR } from "../constants/style";
import SavedList from "../components/SavedList";
import Name from "../components/Name";

class SavedItemsScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators

  static navigationOptions = {
    header: null,
    tabBarVisible: false
    };
  //////////////////////////////////////////////////////////////////////////////////
  // Initialize the component
 componentWillMount() {
   alert("We found multiple items that fit your search Criteria please click on the item you wish to see the the prices on!");
  } 
  onHomeButtonPress() {
    this.props.navigation.navigate('Home');
  }
  //////////////////////////////////////////////////////////////////////////////////
  // Handler for the serach button
  // onButtonPress = () => {
  //   this.props.fetchPlaces(this.state.upc () => {
  //     this.props.navigation.navigate("searchResults") // Passing a callback function
  //   });
  // };
 
 
  //////////////////////////////////////////////////////////////////////////////////
  // Render method
  render() {
    //console.log(this.props);
    return (
      <ImageBackground
          style={{width: '100%', 
          height: '100%'}}
          source={require("../assets/images/MultiResults.jpg")}
          resizeMode='cover'
          >  
          <Name />
      <View
      style={{ backgroundColor: "rgba(52, 52, 52, 0.5)",
      height:"50%",
      marginTop: "20%"}}>
      <FlatList
       data={this.props.items}
       renderItem={({item}) => <SavedList 
                                          item={item} 
                                          navigate={this.props.navigation}
                                          />
                  }
      keyExtractor={item => item.name}
      />
      </View>
      <TouchableOpacity 
        alignContent='center'
        onPress={this.onHomeButtonPress}
        style={{
          alignSelf: 'center',
          position: "absolute",
          bottom: 0
        }}>
        
         <Icon
           activeOpacity={20}
           name="home"
           size={75}
           color='white'
           style={{
            alignSelf: 'center'
          }}
                 /> 
                 
         </TouchableOpacity>
      </ImageBackground>
      
    );
  }
}
const mapStateToProps = state => {
  const items = state.item.walResponseData;
return { items };
};
export default connect(mapStateToProps, { itemsFetch, savedToResults })(SavedItemsScreen);