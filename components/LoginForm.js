import React from "react";
import { Modal, View } from 'react-native';
import { Button, Card, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
//import customStyles from '../assets/constants/modal.css.js';

const LoginForm = ({ onChange1, onChange1Value, onChange2, onChange2Value, onChange3, onChange3Value, form1, form2, form3, button1, Title, visible = false, onCancelButton, onSubmitButton, signUpBool = false}, props) => {    
if (signUpBool)
return (
    <View 
    //style={styles.modalCotainer}
    >
    <Modal
        visible={visible}
        transparent
        avoidKeyboard
        animationType='slide'
        onRequestClose={() => {}}
        //style={customStyles.modal}
        >
         <View 
        //style={styles.modalStyle}
        >
            <View 
            style={styles.containerStyle}
            >
            <View 
            //style={styles.headerStyle}
            >
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
                    onPress={onSubmitButton}
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
        </View>
        </View>
    </Modal>
    </View>
);

return (
    <View 
    //style={styles.modalCotainer}
    >
    <Modal        
        visible={visible}
        transparent
        avoidKeyboard
        animationType='slide'
        onRequestClose={() => {}}
        //style={customStyles.modal}
        >
        
        <View 
        //style={styles.modalStyle}
        >
            <View 
            style={styles.containerStyle}
            >
            <View 
            //style={styles.headerStyle}
            >
                <Card 
                title={Title}
                style={styles.headerStyle}>
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
                            title={button1}
                            onPress={onSubmitButton}
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
        </View>
        </View>
    </Modal>
    </View>
    );
};


const marginPerc = 0.05;

const styles = {
    modalCotainer: {
        flexGrow: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    modalStyle: {

        //borderRadius: 15,
        //borderWidth: 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //presentationStyle: 'overFullScreen'
    },
    containerStyle: {
        //flex: 1,
        marginTop: '40%',
        marginBottom: marginPerc,
        marginLeft: marginPerc,
        marginRight: marginPerc,
        backgroundColor: 'white',
        borderRadius: 15,

    },
    headerStyle: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196F3'
      },
    textStyle: {
        fontSize: 16,
        fontWeight: '600',
        alignItems: 'center',
        //justifyContent: 'center'
    },
    viewStyle: {
        paddingTop: "35%",
        borderRadius: 15,
    },
    buttonStyle: {
        borderRadius: 10,
        borderWidth: 0.5,
        paddingBottom: 10,
    }
};

export default LoginForm;