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
import Card from '../components/SavedComponents/Card';
import CardSection from '../components/SavedComponents/CardSection';
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
      style={styles.listContainer}
      data={_.values(this.state.itemList)}
      //keyExtractor = ({data, item})
          renderItem={({item}) => 
         <Card>
          <TouchableOpacity onPress={this.onItemPress} style={{height: 300, borderBottomColor: 'gray', borderBottomWidth: 1}}>
                    <Image source={{uri: item.largeImage}} style={{width: '100%', height: '100%'}} />
                    </TouchableOpacity>  
                    <CardSection>
            <Text>
            {item.name}
            {"\n"}
            MSRP: {item.MSRP}
                      {"\n"}
                      Sale: {item.salePrice}
                    </Text>
                    </CardSection>
         <CardSection>
                    <Text>
            {item.shortDescription}
          </Text>
          </CardSection> 
            </Card>
            }
        keyExtractor={(item) => item.key}      
      />
      <View
      style={styles.foot}>
      <TouchableOpacity 
      style={{
        alignSelf: 'center',
        position: "absolute",
        left: 8,
        top: 0
      }}
      onPress={this.onHomePress}
      >
       <Icon
       style={{
      }}
      activeOpacity={10}
         name="arrow-left"
         size={40}
         color='black'
               /> 
               
       </TouchableOpacity>   
      </View>
      </View>

    );
  } catch (e) {
    console.log("Range error");
  }
}
}
const styles = StyleSheet.create({
  container: {
   height: '100%',
   width: '100%',
   backgroundColor: 'white',
   justifyContent: 'center',
   alignItems: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
  },
  listContainer: {
    marginTop: '15%', 
    marginBottom: '2%', 
    height: '90%',
     width: '100%'
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
 },
 foot: {
  position: 'absolute',
    bottom: 0,
    width: '100%',
  height: '7%',
  backgroundColor: 'white',
  borderTopWidth: .2,
                borderColor: 'grey',
                shadowOpacity: 0.2,

  },
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
