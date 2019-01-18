import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';


const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  ////////////////////////////////////////////////////////////////////////
  // Renders the last slide, which has an additional button
  renderLastSlideContent(index) {
    if (index === this.props.data.length - 1) {
      return (
        <View style={{ marginTop: 15 }}>
          <Button
            buttonStyle={styles.buttonStyle}
            title="Drink Soda!"
            raised
            onPress={this.props.onComplete}
          />
        </View>
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////
  // Renders the initial slides (no button)
  renderSlides() {
    return this.props.data.upc((slide, index) => (
        <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]}>
          <Text style={styles.textStyle}>{slide.text}</Text>
          {this.renderLastSlideContent(index)}
        </View>
      ));
  }

  ////////////////////////////////////////////////////////////////////////
  // Main render method
  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

////////////////////////////////////////////////////////////////////////
// Styles object
const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    textAlign: 'center',
    color: '#FFF'
  },
  buttonStyle: {
  }
};

export default Slides;
