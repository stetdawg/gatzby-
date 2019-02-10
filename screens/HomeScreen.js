import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Dimensions,
  Modal, 
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Permissions} from 'expo';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from "axios";
import Camera from "../components/Camera";
import {
        walResUPC, 
        } from "../actions";
import * as urls from "../services/urlbuilder"; 

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };
  state = {
    hasCameraPermission: null,
    cameraVisable: false,
    textInput: '887256028299'
  };
  ///////////////////////////////////////////////
  // checks if we have permistion to used the camera from the user
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA); // ask for permistion to use camera
    this.setState({ hasCameraPermission: status === 'granted' }); // determase wether we can use camera
    }
    componentWillReceiveProps() {
    }
      logInBool = false;

    /////////////////////////////////////////////
    //first checks to see if app has permistion to use the camera
    // if not will re ask for permission and show camera if granted
  async onScantog() {
    if (this.state.hasCameraPermission)
        this.setState({cameraVisable: !this.state.cameraVisable });//toggle the camera
    else {
    alert("We need your permission to used the camera feture");
    const { status } = await Permissions.askAsync(Permissions.CAMERA); 
    this.setState({ hasCameraPermission: status === 'granted' }); 
    if (this.state.hasCameraPermission)
    this.setState({cameraVisable: !this.state.cameraVisable });
  }
  }

  ////////////////////////////////////////////////////////////
  // grabs the an array of items info from walmart rest api, and 
  // checks where to send the user depending on the number of items  
  // sent back
  handleTextInput = async () => {
    const walinfo = await axios.get(urls.walmartTextUrl(this.state.textInput));
    console.log(walinfo.data.numItems);
    if (walinfo.data.numItems === 1) {
      console.log("hi");
      this.props.walResUPC(walinfo.data.items[0]);
      this.props.navigation.navigate('searchResults');
    }
    else if (walinfo.data.numItems > 1) {
      this.props.walResUPC(walinfo.data.items);
      this.props.navigation.navigate('multi');
    }
 }

  /////////////////////////////////////////////
  //after barcode is read will pass to this function
  //this function togles camera, sends bar code info to
  //reducers and sends the user to the results screen.
     handleBarCodeScanned = async ({data}) => {
      this.setState({cameraVisable: !this.state.cameraVisable });
      const walinfo = await axios.get(urls.walmartTextUrl(data));
    console.log(walinfo.data.numItems);
    if (walinfo.data.numItems === 1) {
      console.log("hi");
      this.props.walResUPC(walinfo.data.items[0]);
      this.props.navigation.navigate('searchResults');
    }
      this.props.navigation.navigate('searchResults');
    }


   ////////////////////////////////////////////////////////
   //gui for home screen   
  render() {
    return (
      <View
      style={styles.container}
      >      
         <ImageBackground
          style={styles.backgroundStyle}
          source={require("../assets/images/home2.png")}
          resizeMode='cover'
          >
          {/************************************************************************************
          the name and sub text of the home screen
          */}
           <View
            style={styles.nameStyle}>
             <Text
             style={styles.textnameStyle}>
             GATZBY
            </Text>
            <Text
             style={styles.textsubStyle}>
             Shop Smarter.
            </Text>
            <Text
             style={styles.textsubStyle}>
             Save Time.
            </Text>
            </View>
            {/*
            end name and subText
            ****************************************************************************/}

            
            {/* **************************************************************************
            search section of the home screen
            */}
            <View
                    style={styles.searchContainerStyle}>
            <SearchBar
                     placeholder='Enter UPC' 
                     round
                     inputStyle={{backgroundColor: "white"}}
                     lightTheme={false}
                     containerStyle={styles.containerStyle}
                     onChangeText={(text) => this.setState({textInput: text})}
                     onSubmitEditing={this.handleTextInput.bind(this)}
                     />
                      
                    <TouchableOpacity onPress={this.onScantog.bind(this)}>
                     <Icon
                     activeOpacity={20}
                     style={{paddingLeft: "8%",
                     paddingRight: '70%',
                    paddingTop: 0}}
                     name="barcode-scan"
                     size={50}
                     />  
                     </TouchableOpacity>  
            </View>  
            {/*
            end seach section of home screen 
          ***************************************************************************************/}
           
            { /********************************************************************************
                bottom button section
            */
            }

           {
              /*
              end bottom button section
              *********************************************************************************/
            }

            {/************************************************************************************
              camera section and passes in function for the camera
            */}          
               <Modal
        visible={this.state.cameraVisable}
        transparent
        animationType='slide'
        onRequestClose={() => {}}
        >
        <View
            style={styles.cameraStyle}>
            <Camera
            camTog={this.onScantog.bind(this)}
            BarCodeRead={this.handleBarCodeScanned.bind(this)}
            />
            </View>
            </Modal>
            {/*
            end camera pop up
             **********************************************************************************/}

             { /********************************************************************************
                sign up pop up section
            */
            }


            {
              /*
              sign up pop up section
              *********************************************************************************/
            }


            { /********************************************************************************
                sign in pop up section
            */
            }


            {
              /*
              end sign in pop up section
              *********************************************************************************/
            }
          </ImageBackground>
      </View>
          );
  }
}
////////////////////////////////////////
//all the different style components for the home screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainerStyle: {
    alignSelf: 'center',
    marginTop: '20%',
    width: '90%', 
    height: '40%',
    borderRadius: 20,
    backgroundColor: 'transparent',
    
  },
  containerStyle: {
    borderRadius: 30,
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent"

   },
  scanButtonStyle: {
  resizeMode: 'center',
  marginTop: "1%",
  height: "50%",
  width: "15%",
  marginLeft: "8%",

    },
  cameraStyle: {
    
    marginTop: '40%',
    width: '90%', 
    height: '100%',
    alignSelf: 'center',
    marginBottom: '10%',
    
  },
  nameStyle: {
    alignSelf: 'center',
    paddingTop: Dimensions.get('window').height / 12
  },
  textnameStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black'
  },
  textsubStyle: {
    fontSize: 15,
    textAlign: "center",
    color: 'white',
    textShadowColor: 'black'
  },
  backgroundStyle: {
  width: '100%', height: '100%'}, 
  
}
);
const mapStateToProps = () => {
return ({});
};

//expots and conects home to the rest of the app.
export default connect(mapStateToProps, {
                                         walResUPC})(HomeScreen);
