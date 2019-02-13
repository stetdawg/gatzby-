import React from "react";
import { Modal, View } from 'react-native';
import { Button, Card, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";

const LoginForm = ({ onChange1, onChange2, onChange3, form1, form2, form3, button1, Title, visible = false, onCancelButton, signUpBool = false}, props) => {
    if (signUpBool)
    return (
    <Modal
                  visible={visible}
                  transparent
                  animationType='slide'
                  onRequestClose={() => {}}
                  style={styles.modalStyle}>
<View style={styles.viewStyle}>
    <Card
        title={Title}
        >
        <FormLabel>{form1}</FormLabel>
        <FormInput
        onChangeText={onChange1}
        />
        <FormLabel>{form2}</FormLabel>
        <FormInput
        secureTextEntry
        onChangeText={onChange2}
        />
        <FormLabel>{form3}</FormLabel>
        <FormInput
        secureTextEntry
        onChangeText={onChange3}
        />
        <View>
            <Button 
            title={button1}
            buttonStyle={styles.buttonStyle}
            />
        </View>
        <View>
            <Button 
            title="Cancel"
            buttonStyle={styles.buttonStyle}
            onPress={onCancelButton}
            />
        </View>
    </Card>
</View>
</Modal>
);

return (
    <Modal        
                  visible={visible}
                  transparent
                  animationType='slide'
                  onRequestClose={() => {}}
                  style={styles.modalStyle}>
<View style={styles.viewStyle}>
    <Card title={Title}>
        <FormLabel>{form1}</FormLabel>
        <FormInput
        onChangeText={onChange1}
        />
        <FormLabel>{form2}</FormLabel>
        <FormInput
        secureTextEntry
        onChangeText={onChange2}
        />
        <View>
            <Button 
            buttonStyle={styles.buttonStyle}
            title="Summit"
            />
        </View>
        <View>
            <Button 
            buttonStyle={styles.buttonStyle}
            title="Cancel"
            onPress={onCancelButton}
            />
        </View>
    </Card>
</View>
</Modal>
);
};
const styles = {
    modalStyle: {
    borderRadius: 15,
    borderWidth: 0.5
    },
    textStyle: {
    fontSize: 16,
    fontWeight: '600'
    },
    viewStyle: {
    paddingTop: "35%",
    borderRadius: 15,
    },
    buttonStyle: {
    borderRadius: 10,
    borderWidth: 0.5,
    }
  };
export default LoginForm;

