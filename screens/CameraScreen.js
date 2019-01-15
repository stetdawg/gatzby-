import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import { BarCodeScanner, Permissions} from "expo";
import { delay } from 'jquery';
import { barCodeType, 
         barCodeData, 
         walResponse,
         lightSwitch, 
         cameraTogle
        } from "../actions";
import { Button } from "react-native-elements";


class CameraScreen extends Component {
  static navigationOptions = {
    header: null
  };
 
  
        state = {
          hasCameraPermission: null,
        };
        async componentDidMount() {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          this.setState({ hasCameraPermission: status === 'granted' });
          }

        _handleBarCodeRead = async ({ type: BarCodeType, data: BarCodeData }) => {
          console.log(`BarCodeType = ${BarCodeType}`);
          console.log(`BarCodeData = ${BarCodeData}`);
          this.props.barCodeData(BarCodeType, BarCodeData);
          this.props.navigation.navigate("searchResults");
           await delay(1000);
        }
        render() {
          const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
            return (
              <View
              style={{ flex: 1 }}
              >
                <BarCodeScanner                  
                  onBarCodeRead={this._handleBarCodeRead}
                  style={StyleSheet.absoluteFill}
                >
                <Button
                />
                </BarCodeScanner>
              </View>
            );
        }
      }
      
  const mapStateToProps = state => {
      return {
        codeData: state.code.codeData,
        };
    };

  
  export default connect(mapStateToProps, { barCodeData,
                                barCodeType,
                                walResponse,
                                lightSwitch,
                                 })(CameraScreen);
