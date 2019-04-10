import React, { Component } from "react";
import firebase from 'firebase';
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from "lodash";
import { itemsFetch, savedToResults } from "../actions";
//import { PRIMARY_COLOR } from "../constants/style";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import Button from '../components/Button';
import Card from '../components/Card';

class SavedItemsScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  
  static navigationOptions = {
    header: null,
    tabBarVisible: false
    };
    state = {
      itemList: [],
    };


  //////////////////////////////////////////////////////////////////////////////////
  // Initialize the component
 componentDidMount() {
  const { currentUser } = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/items/`);
  dbRef.on('value', snapshot => { 
    const dbSnapshot = snapshot.val();
    const keyPair = Object.entries(dbSnapshot).map(item => ({...item[1], key: item[0]}));
    const arr = _.values(keyPair);
    const itemValu = Object.values(arr);
    this.setState({itemList: itemValu});
    console.log(this.state.itemList);
    });
  }

  onHomePress = () => {
    this.props.navigation.navigate('Home');
  }  
onButtonPress() {
    console.log(this.props.item.itemInfo.upc);
    this.props.savedToResults(this.props.item.itemInfo.upc);
    this.props.navigation.navigate("searchResults");
}
//_keyExtractor = (this.state.itemList, item) => item.id;

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
    try {
    return (
      <View
        style={styles.container}>
      <FlatList
      data={_.values(this.state.itemList)}
      //keyExtractor = ({data, item})
          renderItem={({item}) => 
            <View 
              style={styles.itemContainer}>
              <Text>
                {item.name}
              </Text>
                    <Text>
                      {item.MSRP}
                    </Text>
                    <Text>
                      {item.salePrice}
                    </Text>
              <Text>
                {item.shortDescription}
              </Text>
            
            </View>
            }
        keyExtractor={(item) => item.key}      
      />
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
     </View>
    );
  } catch (e) {
    console.log("Range error");
  }
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  itemContainer: {
    borderColor: 'darkgrey',
    borderBottomWidth: 1
  },
 pricePos: {
   alignContent: 'flex-end',
   left: '45%',
   paddingBottom: 10,
 }
}
);

const mapStateToProps = state => {
  const items = _.map(state.item.savedItems, (val, uid) => {
   return { ...val, uid };
  }
); 
return { items };
};


export default connect(mapStateToProps, { itemsFetch, savedToResults })(SavedItemsScreen);
