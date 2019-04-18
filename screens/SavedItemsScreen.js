import React, { Component } from "react";
import firebase from 'firebase';
import { FlatList, View, Text, StyleSheet, Modal, Image, TouchableOpacity, TouchableHighlight } from "react-native";
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
      itemDetail: false,
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
onItemPress() {
 this.setState({itemDetail: !this.state.itemDetail});
console.log('press');
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
          <TouchableOpacity onPress={this.onItemPress} style={{height: 200, borderBottomColor: 'gray', borderBottomWidth: 1}}>
                    <Image source={{uri: item.largeImage}} style={{width: '100%', height: '50%'}} />

            <View style={{flexDirection: "row"}}>
              <View >
                
                <Text>
                  {item.name}
                </Text>
             
                <View style={styles.pricePos}>
                        <Text style={styles.textStyle}>
                          MSRP: {item.MSRP}
                        </Text>
                        <Text>
                          Sale: {item.salePrice}
                        </Text>
                  </View>
              <Text>
                {item.shortDescription}
              </Text>
            </View>
                </View>
            </TouchableOpacity>   

            }
        keyExtractor={(item) => item.key}      
      />
            <Card>
      <Button 
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
    justifyContent: 'flex-start'
  },
  itemContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    borderColor: 'darkgrey',
    borderBottomWidth: 1
  },
 pricePos: {
   paddingBottom: 10,
 },
 textStyle: {
  textDecorationLine: 'line-through', 
  textDecorationStyle: 'solid', 
 },
 textPos: {
   alignItems: 'flex-start',
 },
 imageView: {
   overflow: 'visible',
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
