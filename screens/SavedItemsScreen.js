import React, { Component } from "react";
import { ListView } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import _ from "lodash";
import { itemsFetch, savedToResults } from "../actions";
import { PRIMARY_COLOR } from "../constants/style";
import SavedList from "../components/SavedList";

class SavedItemsScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    title: "Saved Items",
    tabBarLabel: "main",
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


  //////////////////////////////////////////////////////////////////////////////////
  // Initialize the component
 componentWillMount() {
    // ***DTG - JUST FOR TESTING SO I DON"T HAVE TO KEEP TYPING THIS IN
    //this.setState({ place: "McDonalds" });
    //this.setState({ location: "Azusa, CA" });
    // Upon loading the app, load any static resources...
    const { itemsFetch } = this.props;
    itemsFetch();
    this.createDataSource(this.props);
  } 

componentWillReceiveProps(nextProps) {
  this.createDataSource(nextProps);
}
onButtonPress() {
    console.log(this.props.item.itemInfo.upc);
    this.props.savedToResults(this.props.item.itemInfo.upc);
    this.props.navigation.navigate("searchResults");
}

createDataSource({ items }) {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  this.dataSource = ds.cloneWithRows(items);
}
  //////////////////////////////////////////////////////////////////////////////////
  // Handler for the serach button
  // onButtonPress = () => {
  //   this.props.fetchPlaces(this.state.upc () => {
  //     this.props.navigation.navigate("searchResults") // Passing a callback function
  //   });
  // };
renderRow(item) {
  return (<SavedList 
  item={item} 
  navigation={this.props.navigation} 
  />);
}

  //////////////////////////////////////////////////////////////////////////////////
  // Render method
  render() {
    //console.log(this.props);
    return (
      <ListView
       enableEmptySections 
       dataSource={this.dataSource}
       renderRow={(item) => <SavedList item={item} navigation={this.props.navigation} />}
      />
      
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
