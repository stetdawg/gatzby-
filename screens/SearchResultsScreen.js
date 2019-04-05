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
import firebase from 'firebase';
import { Button } from "react-native-elements";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { saveCode, walRes, itemsFetch } from "../actions";
import * as urls from "../services/urlbuilder";


class SearchResultsScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
    };
        state = {
          isVisible: false,
          isLiked: false, //TODO: do something with this
          sendTo: ""
        };
        onMapButtonPress = () => {
          this.props.navigation.navigate('Map');
        } 
        onHomeButtonPress = () => {
          this.props.navigation.navigate('Home');
        }
        onsavedbuttonPress = () => {
          //alert('Item favorited.');
          try { 
            this.setState({isLiked: !this.state.isLiked});
            //this.setState({items: this.props.itemInfo});
            const { currentUser } = firebase.auth();
                //console.log({ itemInfo });
              firebase.database().ref(`/users/${currentUser.uid}/items`)
                .push(this.props.itemInfo);
            } catch (e) {
              if (e instanceof EvalError) {
                console.log(e.name + e.message);
              } else if (e instanceof RangeError) {
                console.log(e.name + e.message);
            }    
        }
      }
        componentWillMount = () => { }          
          
          onDescripTog() {
            this.setState({isVisible: !this.state.isVisible});
          }
          onStorePress = (text) => {
            if (this.props.itemInfo.codeData)
            switch (text) {
              case "ama":
              Linking.openURL(urls.amazonUrl(this.props.itemInfo.codeData));
              break;
              case "best":
              Linking.openURL(urls.BestUrl(this.props.itemInfo.codeData));
              break;
              case "wal":
              Linking.openURL(urls.walmartUrl(this.props.itemInfo.codeData));
              break;
              case "tar":
              Linking.openURL(urls.targetUrl(this.props.itemInfo.codeData));
              break;
              default:
              break;
            }
            else
            switch (text) {
              case "ama":
              Linking.openURL(urls.amazonUrl(this.props.itemInfo.name));
              break;
              case "best":
              Linking.openURL(urls.BestUrl(this.props.itemInfo.name));
              break;
              case "wal":
              Linking.openURL(urls.walmartUrl(this.props.itemInfo.name));
              break;
              case "tar":
              Linking.openURL(urls.targetUrl(this.props.itemInfo.name));
              break;
              default:
              break;
          }
        }
    render() {   
        return (
          <View>
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
            <ScrollView>
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
              buttonStyle={{borderRadius: 15}}
              />
              <Button
              title='Map'
              onPress={this.onMapButtonPress}
              buttonStyle={styles.buttonStyle}
              />
                 

            </View>
            <TouchableOpacity //SAVED ITEMS BUTTON
                       onPress={this.onsavedbuttonPress}>
                           <Icon 
                            activeOpacity={20}
                            style={{paddingLeft: "8%",
                            paddingRight: '70%',
                            paddingTop: 0}}
                            color='black'
                            name="heart"
                            size={30}
                       />
                       </TouchableOpacity>  
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
            onPress={() => Linking.openURL(urls.walmartUrl(this.props.itemInfo.name))}
            /> 
            </View>   
            <View
            style={styles.Target.ViewStyle}
            >   
            <Button
            buttonStyle={styles.Target.buttonStyle}
            title="Target"
            onPress={() => Linking.openURL(urls.targetUrl(this.props.itemInfo.name))}
            />
            </View>  
            <View
            style={styles.Best.ViewStyle}
            >
            <Button
            buttonStyle={styles.Best.buttonStyle}
            title="Best Buy"
            onPress={() => Linking.openURL(urls.BestUrl(this.props.itemInfo.name))}
            />
            </View>   
            <View
            style={styles.Amazon.ViewStyle}
            >               
            <Button
            buttonStyle={styles.Amazon.buttonStyle}
            title="Amazon"
            onPress={() => Linking.openURL(urls.amazonUrl(this.props.itemInfo.name))}
            />
            </View> 
            </ScrollView> 
            </ScrollView>

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
           color='black'
           style={{
            alignSelf: 'center'
          }}
                 /> 
                 
         </TouchableOpacity>
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
          style={styles.MobleDescritionTextStyle}
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
            </View>

        );
      }
      
}

const mapStateToProps = state => {
  //console.log(state.item.SingleResponseData);
  return {
    codeData: state.code.codeData,
    itemInfo: {
            name: state.item.SingleResponseData.name,
            MSRP: state.item.SingleResponseData.msrp,
            codeData: state.code.CodeData,
            salePrice: state.item.SingleResponseData.salePrice,
            shortDescription: state.item.SingleResponseData.shortDescription,
            largeImage: state.item.SingleResponseData.largeImage,
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
      width: '90%', 
      height: '90%',
      marginTop: "15%",
      borderRadius: 20,
      backgroundColor: "white",
      flexDirection: 'column'
    },
    buttonStyle: {
      backgroundColor: '#0489B1',
      borderRadius: 10,
      borderWidth: 0.5,
      width: 125,
      height: 45,
    },
    ItemNameViewStyle: {
      alignSelf: 'center',
      marginTop: '3%'
    },
    ItemNameTextStyle: {
      fontSize: 20,
      textAlign: "center",
      color: "black",
      textShadowColor: 'black'
    },
    ImageStyle: {
      height: '60%',
      resizeMode: "contain"
    },
    DescriptionModalStyle: {
      alignSelf: 'center',
      marginTop: '75%',
      height: '54%',
      width: "90%",
      backgroundColor: "rgba(52, 52, 52, 1)",
    },
    DescritionTextStyle: {
      fontSize: 15,
      color: 'black',
      textShadowColor: 'black'
    },
    MobleDescritionTextStyle: {
      fontSize: 15,
      color: 'white',
      textShadowColor: 'black'
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
