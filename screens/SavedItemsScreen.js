import React, { Component } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import { itemsFetch, savedToResults } from "../actions";
//import { PRIMARY_COLOR } from "../constants/style";
import SavedList from "../components/SavedList";
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../components/Card';

class SavedItemsScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  onHomePress = () => {
    this.props.navigation.navigate('Home');
  }  
  static navigationOptions = {
    header: null,
    tabBarVisible: false
    };

  //////////////////////////////////////////////////////////////////////////////////
  // Initialize the component
 /* componentWillMount() {
    // ***DTG - JUST FOR TESTING SO I DON"T HAVE TO KEEP TYPING THIS IN
    //this.setState({ place: "McDonalds" });
    //this.setState({ location: "Azusa, CA" });
    // Upon loading the app, load any static resources...
<<<<<<< HEAD
   const { itemsFetch } = this.props;
   itemsFetch();
  }  */
=======
    const { itemsFetch } = this.props;
    itemsFetch();
  } 
>>>>>>> 0cb9aa656acd50738ce2609b1a3e5bcce3dbdeee

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
      <View
            style={styles.container}
            >
      
      <Text>Saved Items Class!</Text>
            <Card>
      <Button //SAVED ITEMS BUTTON
                onPress={this.onHomePress}  
                >
                        <Icon 
                            activeOpacity={20}
                            style={{paddingLeft: "8%",
                            paddingRight: '70%',
                            paddingTop: 0}}
                            color='black'
                            name="arrow-left"
                            size={50}
                       />
                       back to home (:
                       </Button>
        </Card>
        <FlatList
      style={{height: "100%",
              marginTop: "10%",
              marginBottom: "-10%"}}
       data={[{key: 'a'}, {key: 'b'}]}
       renderItem={({item}) => <SavedList 
                                          item={item} 
                                          navigation={this.props.navigation}
                                          />}
      keyExtractor={item => item.name}
      />
     </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
 }}
);

const mapStateToProps = state => {
  const items = _.map(state.item.savedItems, (val, uid) => {
   return { ...val, uid };
  }
);
return { items };
};
export default connect(mapStateToProps, { itemsFetch, savedToResults })(SavedItemsScreen);
