import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from "react-redux";
import Swipeout from "react-native-swipeout";
import Confirm from './confirm';
import { savedToResults,
         deleteItem } from "../actions";


const SCREEN_WIDTH = Dimensions.get('window').width;

class SavedList extends Component {
  
  ////////////////////////////////////////////////////////////////////////
  // Renders the last slide, which has an additional button
  //static navigationOptions = ({ navigation }) => {};
  
  state = {
    visible: false
  };
  componentWillMount() {}
  
  onButtonPress() {
    console.log(this.props.item.itemInfo);
    this.props.savedToResults(this.props.item.itemInfo);
    this.props.navigation.navigate("ItemDetal");
  }
  onYesButton() {
    console.log('delete me :(');
    this.setState({ visible: false });  
    this.props.deleteItem(this.props.item);
  }
  onNoButton() {
    this.setState({ visible: false });
  }
  
  deleteCheck() {
    this.setState({ visible: true });
  }

    render() {
      const swipeoutBtns = [
          {
           text: "DELETE",
           backgroundColor: "#ff0000",
           color: "#000000",
            onPress: this.deleteCheck.bind(this)
          }
      ];

    return (
      <View>
      <Swipeout 
      right={swipeoutBtns}
      autoClose={true}
      >
          <Card
          image={{ uri: this.props.item.itemInfo.largeImage }}
          >
              <Button
              buttonStyle={styles.buttonStyle}
              title={this.props.item.itemInfo.name}
              onPress={this.onButtonPress.bind(this)}
              />
          </Card>
      </Swipeout>
      <Confirm
           onNoPress={this.onNoButton.bind(this)}
           onYesPress={this.onYesButton.bind(this)}
           visible={this.state.visible}
      >
           Are you sure that you want to deleate {this.props.item.itemInfo.name}?
           </Confirm>
      </View>
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
    fontSize: 30,
    textAlign: 'center',
    color: '#FFF'
  },
  viewStyle: {
    paddingTop: 15,
    borderRadius: 15
  },
  buttonStyle: {
    backgroundColor: '#00074f',
    borderRadius: 15
  }
};

export default connect(null, { savedToResults, deleteItem })(SavedList);
