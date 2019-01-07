import React from 'react';
import { ImageBackground, View } from 'react-native';

////////////////////////////////////////////////////////////////
// Make component: ActivityIndicator has a builtin property
// called "size"; if pass in a size property use it, otherwise,
// use 'large'
const Background = (image) => { 
  console.log(image);
   return (
     <View
     style={styles.VeiwStyle}
     >
    
    </View>
    
  );
 };

////////////////////////////////////////////////////////////////
// Styling
const styles = {
  VeiwStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  backgroundStyle: {
      width: '100%', 
      height: '100%'
    }
};

////////////////////////////////////////////////////////////////
// Make the component available to other parts of the app
export default Background;
