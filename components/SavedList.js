import React, { Component } from 'react';
import { Dimensions, View, ImageBackground, Text, TouchableOpacity } from 'react-native';

import { connect } from "react-redux";
import { singleResponce
 } from "../actions";


const SCREEN_WIDTH = Dimensions.get('window').width;

class SavedList extends Component {
  
  ////////////////////////////////////////////////////////////////////////
  // Renders the last slide, which has an additional button
  //static navigationOptions = ({ navigation }) => {};
  onItemPress = () => {
    console.log("");
    this.props.singleResponce(this.props.item);
    this.props.navigation.navigate('searchResults');  
  };

  componentWillMount() {}

    render() {
          return (
            <TouchableOpacity
            onPress={this.onItemPress}>
            <View
            style={styles.viewStyle}>
            <View>
            <Text
            style={styles.textStyle}
            >{this.props.item.name}</Text>
            </View>
        <ImageBackground
        source={{ uri: this.props.item.largeImage }}
        style={{width: Dimensions.get('window').width / 2, 
        height: Dimensions.get('window').height / 4, 
        flex: 1,
        marginBottom: '10%'}}
        resizeMode="cover"
        />
      </View>
      </TouchableOpacity>
    );
    }

}
////////////////////////////////////////////////////////////////////////
// Styles object
const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF'
  },
  viewStyle: {
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.1,
    alignSelf: 'center',
    paddingTop: "3%",
    margin: "3%",
    borderRadius: 20,
    backgroundColor: "rgba(52, 52, 52, 0.5)"
  },
  buttonStyle: {
    backgroundColor: '#00074f',
    borderRadius: 15
  }
};

export default connect(null, { singleResponce })(SavedList);
