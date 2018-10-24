import React from 'react';
import { Modal, Text, View } from 'react-native';
import { Button, Card } from "react-native-elements";

const confirm = ({ children, onNoPress, onYesPress, visible }) => {
    
    return (
        <Modal
        visible={visible}
        transparent
        animationType='slide'
        onRequestClose={() => {}}
        >
        <View>
        <Card
        title="Confirm"
        >
        <Text
        style={{ marginBottom: 10 }}
        >
        {children}
        </Text>
        <Button
        title="YES"
        onPress={onYesPress}
        buttonStyle={styles.noButtonStyle.buttonStyle}
        />
        <Button
        title="NO"
        onPress={onNoPress}
        buttonStyle={styles.noButtonStyle.buttonStyle}
        />
        </Card>
        </View>
        </Modal>
    );
};

const styles = {
    cardStyle: {
    
    },
    textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 10
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        jsutifyContent: 'center'
    },
    yesButtonStyle: {
            ViewStyle: {
              paddingTop: 15,
              marginBottom: 10,
              borderRadius: 15
            },
            buttonStyle: {
              marginBottom: 10,
              borderRadius: 15
            }

    },
    noButtonStyle: {
        ViewStyle: {
            paddingTop: 15,
            marginBottom: 10,
            borderRadius: 15
          },
          buttonStyle: {
            marginBottom: 10,
            borderRadius: 15
          }
    }
};

export default confirm;
