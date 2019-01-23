import React, { Component } from "react";
import { View, ScrollView, ImageBackground } from "react-native";
//import { Button } from "react-native-elements";
import { connect } from 'react-redux';
import _ from "lodash";
//import { AppLoading } from 'expo';
import { saveCode, walRes, itemsFetch } from "../actions";
import ItemDetals from "../components/ItemDetals";
//import Confirm from "../components/confirm";
//import { PRIMARY_COLOR } from "../constants/style";

class SearchResultsScreen extends Component {
  static navigationOptions = {
    header: null
  };
        state = {
          isVisible: false,
          saved: false
        };

        async componentWillMount() {
           const { codeData } = this.props;
          //await this.props.itemsFetch();
          console.log(this.props.itemInfo); 
          }          
          
          onNoButton() {
            this.setState({ isVisible: false });
          }
          onYesButton() {
            const { itemInfo, saveCode } = this.props;
            saveCode(itemInfo);
            this.setState({ isVisible: false });
            this.props.navigation.navigate('SavedItems');
          }
      //  onSaveButton() {
      //    const { itemInfo, saveCode } = this.props;
      //    //this.checkIfSaved.bind(this);
      //    const { codeData, codeType } = itemInfo;
      //    const length = this.props.savedItems.length;
      //    //console.log(length);
      //    for (let i = 0; i < length; i++) { 
      //    // console.log(this.props.savedItems[i].itemInfo);
      //    if (codeData === this.props.savedItems[i].itemInfo.codeData && 
      //      codeType === this.props.savedItems[i].itemInfo.codeType) {
      //       this.setState({ isVisible: true });
      //       console.log("already saved");
      //       return { isSaved: true };
      //      }
      //  }  
      //     saveCode(itemInfo);
      //     this.props.navigation.navigate('SavedItems');

       /* <Button
        buttonStyle={styles.save.buttonStyle} 
        raised
        title="SAVE!!!"
        onPress={this.onSaveButton.bind(this)}
        />
        </View>               
        </ScrollView>
       <Confirm
       onNoPress={this.onNoButton.bind(this)}
       onYesPress={this.onYesButton.bind(this)}
       visible={this.state.isVisible}
       >
       You curently have {this.props.itemInfo.name} saved. Would you like to save it again?
       </Confirm>*/
  
    render() {   
     // console.log(this.props.savedItems);  
     //console.log(this.props); 
        return (
          <View>
             <ImageBackground
          style={styles.backgroundStyle}
          source={require("../assets/images/Results.png")}
          resizeMode='cover'
          >
            <ScrollView>
             <ItemDetals {...this.props} />
            </ScrollView>
            </ImageBackground>
            </View>

        );
      }
      
}

const mapStateToProps = state => {
  const savedItems = _.values(state.item.savedItems);
  return {
    savedItems,
    codeData: state.code.codeData,
    itemInfo: {
            name: _.head(state.item.walResponseData.items).name,
            codeData: state.code.codeData,
            codeType: state.code.codeType,
            shortDescription: _.head(state.item.walResponseData.items).shortDescription,
            largeImage: _.head(state.item.walResponseData.items).largeImage,
          }
    };
};


const styles = { 
  backgroundStyle: {
    width: '100%', height: '100%'},
  save: {
    ViewStyle: {
      marginBottom: 10,
      borderRadius: 15
    },
    buttonStyle: {
      backgroundColor: '#0a8e05',
      borderRadius: 15
    } 
  },
};
  export default connect(mapStateToProps, { saveCode,
                                            walRes,
                                            itemsFetch })(SearchResultsScreen);
