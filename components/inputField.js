import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {colors} from "../constans";

function InputField({label, icon, inputType, valueInput, onChange, keyboardType, fieldButtonLabel, fieldButtonFunction}) {

    return (<View style={{
        flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25
    }}>
        <Icon name={icon} size={20} color={'#666'} style={{marginRight: 5}}/>
        {inputType === 'password' ? (<TextInput secureTextEntry={true} placeholder={label}
                                                keyboardType={keyboardType} value={valueInput}
                                                onChangeText={onChange}
                                                style={{flex: 1, paddingVertical: 0}}></TextInput>) : (
            <TextInput placeholder={label} keyboardType={keyboardType}
                       value={valueInput} onChangeText={onChange}
                       style={{flex: 1, paddingVertical: 0}}></TextInput>)}
        <TouchableOpacity onPress={fieldButtonFunction}>
            <Text style={{color: colors.primaryHome, fontWeight: '700'}}>{fieldButtonLabel}</Text>
        </TouchableOpacity>
    </View>)
}

export default InputField
