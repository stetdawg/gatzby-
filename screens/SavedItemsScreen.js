import React, { Component } from "react";
import { FlatList, View, Text} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import { itemsFetch, savedToResults } from "../actions";
//import { PRIMARY_COLOR } from "../constants/style";
import SavedList from "../components/SavedList";

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
    // ***DTG - JUST FOR TESTING SO I DON"T HAVE TO KEEP TYPING THIS IN
    //this.setState({ place: "McDonalds" });
    //this.setState({ location: "Azusa, CA" });
    // Upon loading the app, load any static resources...
    //const { itemsFetch } = this.props;
   // itemsFetch();
  } 

onButtonPress() {
    console.log(this.props.item.itemInfo.upc);
    this.props.savedToResults(this.props.item.itemInfo.upc);
    this.props.navigation.navigate("searchResults");
}

  //////////////////////////////////////////////////////////////////////////////////
  // Handler for the serach button
  // onButtonPress = () => {
  //   this.props.fetchPlaces(this.state.upc () => {
  //     this.props.navigation.navigate("searchResults") // Passing a callback function
  //   });
  // };
renderRow(item) {
  return (<FlatList
  item={item} 
  navigation={this.props.navigation} 
  />);
}

  //////////////////////////////////////////////////////////////////////////////////
  // Render method
  render() {
    //console.log(this.props);
    return (
      <View>
     
     
      <View>
        <Text>
          Saved Item Class!
        </Text>
      </View>
     </View>
    );
  }
}
const mapStateToProps = state => {
  const items = _.map(state.item.savedItems, (val, uid) => {
   return { ...val, uid };
  }
);
return { items };
};
export default connect(mapStateToProps, { itemsFetch, savedToResults })(SavedItemsScreen);
