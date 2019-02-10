import React, { Component } from "react";
import { View, 
  ScrollView, 
  ImageBackground, 
  Text, 
  Image,
  Linking,
  TouchableOpacity,
  Modal
} from "react-native";
import { Button } from "react-native-elements";
import { connect } from 'react-redux';
import _ from "lodash";
import { saveCode, walRes, itemsFetch } from "../actions";
import * as urls from "../services/urlbuilder";
import Icon from 'react-native-vector-icons/FontAwesome';

class SearchResultsScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
    };
        state = {
          isVisible: false,
        };
        onHomeButtonPress() {
          this.props.navigation.navigate('Home');
        };
        async componentWillMount() {
           const { codeData } = this.props;
          //await this.props.itemsFetch();
          console.log(this.props.itemInfo); 
          }          
          
          onDescripTog() {
            this.setState({isVisible: !this.state.isVisible});
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
            <View
            style={styles.borderStyle}>
            <View
            style={styles.ItemNameViewStyle}>
              <Text
                style={styles.ItemNameTextStyle}>
                {this.props.itemInfo.name}
              </Text>
            </View>
            <Image
            source={{ uri: this.props.itemInfo.largeImage }} 
            style={styles.ImageStyle} />
            <View
            style={styles.DescriptionViewStyle}>
            <View
            style={{
              marginTop: "2%",
              paddingLeft: "2%",
              marginBottom: "2%"}}>
            <Text
            style={styles.DescritionTextStyle}>
              MSRP: {this.props.itemInfo.MSRP}
              </Text>
              <Text
            style={styles.DescritionTextStyle}>
              Current Price: {this.props.itemInfo.salePrice}
              </Text>
              </View>
              <Button
              title='Description'
              onPress={this.onDescripTog.bind(this)}
              buttonStyle={{borderRadius:15}}
              />
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

            </View>
            
            <ScrollView
            horizontal
            style={{
              maxHeight: 100
            }}
            >
            <View
              style={styles.Walmart.ViewStyle}
              >           
            <Button
            buttonStyle={styles.Walmart.buttonStyle}
            title="Walmart"
            onPress={() => Linking.openURL(urls.walmartUrl(this.props.itemInfo.codeData))}
            /> 
            </View>   
            <View
            style={styles.Target.ViewStyle}
            >   
            <Button
            buttonStyle={styles.Target.buttonStyle}
            title="Target"
            onPress={() => Linking.openURL(urls.targetUrl(this.props.itemInfo.codeData))}
            />
            </View>  
            <View
            style={styles.Best.ViewStyle}
            >
            <Button
            buttonStyle={styles.Best.buttonStyle}
            title="Best Buy"
            onPress={() => Linking.openURL(urls.BestUrl(this.props.itemInfo.codeData))}
            />
            </View>   
            <View
            style={styles.Amazon.ViewStyle}
            >               
            <Button
            buttonStyle={styles.Amazon.buttonStyle}
            title="Amazon"
            onPress={() => Linking.openURL(urls.amazonUrl(this.props.itemInfo.codeData))}
            />
            </View> 
            </ScrollView> 

             
            </View>
            <Modal
        visible={this.state.isVisible}
        animationType='fade'
        transparent
        onRequestClose={() => {}}
        >
        <View
        >
        <ScrollView
        style={styles.DescriptionModalStyle}
        >
        <View
        style={{
          marginLeft: '2%',
          marginRight: '2%'
        }}>
          <Text 
          style={styles.DescritionTextStyle}
          >Description: {this.props.itemInfo.shortDescription}</Text>
          
          </View>
          
        </ScrollView>
        <Button
          title='Close'
          onPress={this.onDescripTog.bind(this)}
          buttonStyle={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            width: '97%',
            alignSelf: 'center',
            
          }}
          />
          </View>
        </Modal>  
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
            name: state.item.walResponseData.name,
            MSRP: state.item.walResponseData.msrp,
            codeData: state.code.codeData,
            salePrice: state.item.walResponseData.salePrice,
            shortDescription: state.item.walResponseData.shortDescription,
            largeImage: state.item.walResponseData.largeImage,
          }
    };
};


const styles = { 
  backgroundStyle: {
    width: '100%', 
    height: '100%',
},
    borderStyle: {
      alignSelf: 'center',
      marginTop: '15%',
      width: '90%', 
      height: '90%',
      backgroundColor: "rgba(52, 52, 52, 0.5)",
      borderRadius: 20,
      flexDirection: 'column'
    },
    ItemNameViewStyle: {
      alignSelf: 'center',
      marginTop: '1%'
    },
    ItemNameTextStyle: {
      fontSize: 20,
      textAlign: "center",
      color: 'white',
      textShadowColor: 'black'
    },
    ImageStyle: {
      height: '30%',
      resizeMode: "cover"
    },
    DescriptionModalStyle: {
      alignSelf: 'center',
      marginTop: '65%',
      height: '54%',
      width: "90%",
      backgroundColor: "rgba(52, 52, 52, 1)",
    },
    DescritionTextStyle: {
      fontSize: 15,
      color: 'white',
      textShadowColor: 'black'
    },
    storButtonStyle:{
      
    },

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
  Target: { 
    ViewStyle: {
      paddingTop: 15,
      borderRadius: 15
    },
    buttonStyle: {
      backgroundColor: '#d82424',
      borderRadius: 15
    } 
    },
  Amazon: { 
    ViewStyle: {
    paddingTop: 15,
    borderRadius: 15
  },
  buttonStyle: {
    backgroundColor: '#ffaa00',
    borderRadius: 15,
    marginBottom: 10
  } 

  }, 
  Best: { 
    ViewStyle: {
    paddingTop: 15,
    borderRadius: 15
  }, 
    buttonStyle: {
      backgroundColor: '#0000ff',
      borderRadius: 15
    }
  },
  Walmart: {
    ViewStyle: {
      paddingTop: 15,
      borderRadius: 15,
    },
    buttonStyle: {
      backgroundColor: '#2093e5',
      borderRadius: 15
    } 
  }
};
  export default connect(mapStateToProps, { saveCode,
                                            walRes,
                                            itemsFetch })(SearchResultsScreen);
