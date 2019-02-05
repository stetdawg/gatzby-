import React from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { BarCodeScanner} from "expo";
import Icon from 'react-native-vector-icons/FontAwesome';

const Camera = ({ camTog, BarCodeRead, visible }) => {
            return (
              <Modal
                  visible={visible}
                  transparent
                  animationType='slide'
                  onRequestClose={() => {}}
                  >
                <View
                  style={{ 
                  marginTop: '40%',
                  width: '90%', 
                  height: '100%',
                  alignSelf: 'center',
                  marginBottom: '10%'
                }}>
              <View
              style={{ flex: 1,
                borderRadius: 30
               }}
              >
                <BarCodeScanner                  
                  onBarCodeScanned={BarCodeRead}
                  style={{
                    width: '100%', 
                    height: '100%',
                     }}
                >
                <TouchableOpacity 
                onPress={camTog}>
                     <Icon
                     activeOpacity={20}
                     style={{paddingLeft: "85%",
                     paddingTop: 0 }}
                     name="home"
                     color='white'
                     size={50}
                     />  
                     </TouchableOpacity>
                </BarCodeScanner>
              </View>
              </View>
              </Modal>
            );
                    }
;
export default Camera;
