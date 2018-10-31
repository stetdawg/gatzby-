import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { BarCodeScanner, Permissions } from "expo";
import { delay } from 'jquery';
import { barCodeType, 
         barCodeData, 
         walResponse,
         lightSwitch } from "../actions";


class CameraScreen extends Component {
  static navigationOptions = {
    header: null,
  };
        state = {
          hasCameraPermission: null,
          light: "off"
        };
       
       
        async componentWillMount() {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          this.setState({ hasCameraPermission: status === 'granted' });
          }
          componentWillReceiveProps() {
          }
        
        onLightToggle = () => {
          //console.log(this.state.light);
          if (this.state.light === "off")
          this.setState({ light: "on" });
          else {
            this.setState({ light: "off" });
          }
          return {
            light: "OFF"
          };
        };
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
          } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
          } 
            return (
              <View style={{ flex: 1 }}>
                <BarCodeScanner
                  torchMode="on"
                  onBarCodeRead={this._handleBarCodeRead}
                  style={StyleSheet.absoluteFill}
                  torchMode={this.state.light}
                >
                <View
                style={{ 
                  position: "absolute",
                  bottom: 10,
                  borderRadius: 15 }}
                >
                <Button
                title={`light ${this.state.light}`}
                onPress={this.onLightToggle}
                buttonStyle={{ borderRadius: 15 }}
                />
                </View>
                </BarCodeScanner>
              </View>
            );
        }
      }
  const mapStateToProps = state => {
      return {
        codeData: state.code.codeData
        };
    };

  
  export default connect(mapStateToProps, { barCodeData,
                                barCodeType,
                                walResponse,
                                lightSwitch })(CameraScreen);
