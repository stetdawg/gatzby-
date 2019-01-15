import React from "react";
import { View, TouchableOpacity } from "react-native";
import { BarCodeScanner} from "expo";
import Icon from 'react-native-vector-icons/FontAwesome';

const CameraScreen = ({ camTog, BarCodeRead }) => {
            return (
              <View
              style={{ flex: 1,
                borderRadius: 30
               }}
              >
                <BarCodeScanner                  
                  onBarCodeRead={BarCodeRead}
                  style={{
                    width: '100%', 
                    height: '100%',
                     }}
                >
                <TouchableOpacity 
                onPress={camTog}>
                     <Icon
                     activeOpacity={20}
                     style={{paddingLeft:"85%",
                     paddingTop:0 }}
                     name="home"
                     color='white'
                     size={50}
                     />  
                     </TouchableOpacity>
                </BarCodeScanner>
              </View>
            );
                    }
;
export default CameraScreen;
