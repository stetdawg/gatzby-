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
                  >
<View 
style={{ flex: 1,
        paddingTop: 20,
        borderRadius: 30,
        justifyContent: 'center'
               }}>
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
<Button 
title={button1}
/>
<Button 
title="Cancel"
onPress={onCancelButton}
/>
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
                  >
<View
style={{ flex: 1,
    paddingTop: 20,
    borderRadius: 30,
    justifyContent: 'center'
           }}
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
<Button 
title="Summit"
/>
<Button 
title="Cancel"
onPress={onCancelButton}
/>
</Card>
</View>
</Modal>
);
};
export default LoginForm;
