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
import { Button, Icon } from "react-native-elements";
import { connect } from 'react-redux';
//import {Icon} from 'react-native-vector-icons/FontAwesome';
import { saveCode, walRes, itemsFetch } from "../actions";
import * as urls from "../services/urlbuilder";


class SearchResultsScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
    };
        state = {
          isVisible: false,
          isLiked: true, //TODO: do something with this
          sendTo: ""
        };
        onMapButtonPress = () => {
          this.props.navigation.navigate('Map');
        } 
        onMultPress = () => {
          this.props.navigation.navigate('multi');
        }
        onsavedPress = () => {
          console.log(this.props.itemInfo);
          //alert('Item favorited.');
          this.setState({isLiked: !this.state.isLiked});
          
          try { 
            this.setState({items: this.props.itemInfo});
            const { currentUser } = firebase.auth();
            firebase.database().ref(`/users/${currentUser.uid}/items`).push(this.props.itemInfo);
                console.log(this.state.isLiked);
            } catch (e) {
              if (e instanceof EvalError) {
                console.log(e.name + e.message);
              } else if (e instanceof RangeError) {
                console.log(e.name + e.message);
            }    
          }
      }
        componentDidMount = () => {
          //check if item exists in database
          // const upc = '';
          // const dbRef = firebase.database().ref(`/Items/${upc}`);
          // dbRef.once('value').then(_Snapshot => {
          //   const snap = _Snapshot.val();
          //   const a = snap.child(`Item/${upc}`).exists();
          //   console.log(a);
          // });
          //    var b = snapshot.child("name").exists(); // true
         }                    
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
          let likeColor = "black";
            if (this.state.isLiked === true) {
              likeColor = "black";
            } else {
              likeColor = "red";
            }
          return (
            <View
            style={styles.backgroundStyle}>
            <ScrollView
            horizontal
            style={{
             maxHeight: '5%',
             borderTopWidth: 0.1,
                borderColor: 'grey',
                shadowOpacity: 0.2,
            }}
            >  
                         <Text
                         style={styles.titleText}>
                         {this.props.itemInfo.name}
                         </Text>
                         </ScrollView>
              <Image
              source={{ uri: this.props.itemInfo.largeImage }} 
              style={styles.ImageStyle} />
              <View
                        style={styles.buttonBox}>
                        <Text
                        style={styles.DescritionTextStyle}>
                          MSRP: {this.props.itemInfo.MSRP}
                          {"\n"}
                          Current Price: {this.props.itemInfo.salePrice}
                          </Text>
                        <TouchableOpacity 
                        style={{marginLeft: 30}}
                        onPress={this.onSavedPress}
                        >
                         <Icon
                         style={{
                          paddingLeft: "48%",
                          paddingRight: "2%",
                          color: likeColor
                        }}
                        activeOpacity={10}
                           name="heart"
                           type='font-awesome'
                           size={30}
                            color= ({likeColor})
                                 /> 
                                 
                         </TouchableOpacity>  */}
                         <TouchableOpacity //SAVED ITEMS BUTTON
                       onPress={this.onsavedPress}
                       
                       >
                           <Icon 
                            activeOpacity={20}
                            style={{paddingLeft: "50%",
                            paddingTop: 0,
                            color: likeColor,
                          }}
                            name="heart"
                            size={30}
                       />
                       </TouchableOpacity>  
                         <TouchableOpacity 
                        style={{
                         marginLeft: 15
                        }}
                        onPress={this.onMapButtonPress}
                        >
                         <Icon
                         style={{
                             
                        }}
                        activeOpacity={10}
                           name="crosshairs"
                           type='font-awesome'
                           size={30}
                           color='black'
                                 /> 
                                 
                         </TouchableOpacity> 
                         </View>

              <TouchableOpacity
              onPress={this.onDescripTog.bind(this)}
              style={{
                height: '10%',
                width: '100%',
                marginLeft: 20,
                marginRight: 20,  
                borderColor: 'grey',
                shadowOpacity: 0.2,
                backgroundColor: '#ddffeb', 
              }}
              > 
              <Text
                style={{
                  flex: 2,
                  textAlign: "center",
                  textAlignVertical: 'center',

                }}>
                Description
              </Text>
              </TouchableOpacity>
              <ScrollView
              horizontal
              style={{
               maxHeight: '8%',
                borderTopWidth: 0.1,
              //  borderBottomWidth: .2,
                borderColor: 'black',
              }}
              >     
              <TouchableOpacity           
                 style={styles.storeButtonLeft}
                 onPress={() => Linking.openURL(urls.walmartUrl(this.props.itemInfo.name))
                }
                 >
                <Text>
                  Walmart
                </Text>
              </TouchableOpacity> 

              <TouchableOpacity              
                style={styles.storeButtonDefault}
                onPress={() => 
                  Linking.openURL(urls.targetUrl(this.props.itemInfo.name))
                }
                >
                <Text>
                  Target
                </Text>              
              </TouchableOpacity>

              <TouchableOpacity              
                style={styles.storeButtonDefault}
                onPress={() => Linking.openURL(urls.BestUrl(this.props.itemInfo.name))
                }
                >
                <Text>
                  Best Buy
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity            
                style={styles.storeButtonRight}
                onPress={() => Linking.openURL(urls.amazonUrl(this.props.itemInfo.name))
                }
                >
                <Text>
                  Amazon
                </Text>
              </TouchableOpacity>

              </ScrollView> 
              <View
            style={styles.foot}>
                <TouchableOpacity 
                  style={{
                    alignSelf: 'center',
                    position: "absolute",
                    left: 8,
                    top: 0
                  }}
                    onPress={this.onMultPress}
                >
                <Icon
                style={{
                      }}
                activeOpacity={10}
                  name="angle-double-left"
                  type='font-awesome'
                  size={40}
                  color='black'
                        /> 
                        
                </TouchableOpacity>   
            </View>
       

              <Modal
                visible={this.state.isVisible}
                animationType='slide'
                transparent
                onRequestClose={() => this.onDescripTog}
          >
                <View>
                <ScrollView
                style={styles.DescriptionModalStyle}
                >
                <View
                style={{
                  marginLeft: '2%',
                  marginRight: '2%'
                }}>
                     <Icon 
                     name='expand-more'
                     type='material'
                    onPress={() => { this.setState({isVisible: false}); }} />
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
              //codeData: state.code.codeData,
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
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
  },
  container: {
    width: '100%', 
      height: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
      borderColor: 'blue',
  },
  foot: {
  position: 'absolute',
    bottom: 0,
    width: '100%',
  height: '7%',
  backgroundColor: 'white',
  borderTopWidth: 0.2,
                borderColor: 'grey',
                shadowOpacity: 0.2,

  },
  head: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '8%',
    backgroundColor: 'white',
    },
  titleText: {
  fontSize: 20,
  color: 'black',
  fontWeight: 'bold',
  fontFamily: 'Avenir-Roman',

  
  },
  textBox: {
    height: '7%',
    width: '99%',
   // borderWidth: 1,
    //borderColor: 'red',
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '2%',
    justifyContent: 'center'
  },
  buttonBox: {
    flexDirection: 'row',
    height: '5%',
    width: '100%',
   // borderWidth: 1,
   // borderColor: 'red',
    alignItems: 'center',
    marginLeft: '2%',
    marginRight: '2%',
  },
      ImageStyle: {
        resizeMode: "contain",
        height: '58%',
        width: '100%',
        marginRight: '2%',
        marginLeft: '2%',
      //  borderWidth: 1,
      //  borderColor: 'red'
  
      },
      DescriptionModalStyle: {
        alignSelf: 'center',
        marginTop: '75%',
        height: '54%',
        width: "90%",
        backgroundColor: "rgba(52, 52, 52, 1)",
      },
      DescritionTextStyle: {
        marginLeft: '5%',
        fontSize: 13,
        color: 'black',
        textShadowColor: 'black',
        fontFamily: 'Avenir-Roman',
      },
      MobleDescritionTextStyle: {
        fontSize: 15,
        color: 'white',
        textShadowColor: 'black'
      },
  
      Save: {
      buttonStyle: {
        backgroundColor: '#0a8e05',
        borderRadius: 15
      } 
    },
    buttonPadding: {
      paddingRight: 30,
    },
    storeButtonLeft: {
      backgroundColor: '#51d688',
      flex: 1,
      marginLeft: 5,
      padding: 20,
      height: 20,
      borderTopLeftRadius: 2.4,
      borderBottomLeftRadius: 10

    }, 
    storeButtonRight: {
      backgroundColor: '#51d688',
      flex: 1,
      marginLeft: 5,
      padding: 20,
      height: 20,
      borderTopRightRadius: 2.4,
      borderBottomRightRadius: 10

    },
    storeButtonDefault: {
      backgroundColor: '#51d688',
      flex: 1,
      marginLeft: 5,
      padding: 20,
      height: 20,
    },
  };
    export default connect(mapStateToProps, { saveCode,
                                              walRes,
                                              itemsFetch })(SearchResultsScreen);
