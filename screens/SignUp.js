import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {colors, images} from "../constans/index";
import InputField from "../components/inputField";
import {useState} from "react";
import {getApi} from "../routes";
import axios from "axios";

function SignUp(props) {

    const {navigation} = props
    const {navigate} = navigation

    const [nameRegister, setNameRegister] = useState(null);
    const [emailRegister, setEmailRegister] = useState(null);
    const [passwordRegister, setPasswordRegister] = useState(null);
    const [confirmPasswordRegister, setConfirmPasswordRegister] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const host = `${getApi.host}:${getApi.port}`;
    const api = '/api';
    const registerEndpoint = '/register';

    const registerUser = () => {
        setIsLoading(true)
        if (passwordRegister !== confirmPasswordRegister) {
            Alert.alert('Error', 'Password and Confirm Password do not match');
        }
        const userData = {
            name: nameRegister,
            email: emailRegister,
            password: passwordRegister,
            confirmed_password: confirmPasswordRegister,
        };

        axios.post(host + api + registerEndpoint, userData)
            .then(response => {
                // Handle success response
                //console.log(response.data.token);
                Alert.alert('Success', 'Registration successful');
                // Reset form fields
                setNameRegister(null);
                setEmailRegister(null);
                setPasswordRegister(null);
                setConfirmPasswordRegister(null);
                setIsLoading(false)
                navigate('SignIn')
            })
            .catch(error => {
                // Handle error response
                console.error(error);
                setIsLoading(false)
                Alert.alert('Error', 'Registration failed');
            });
    }

    return (<SafeAreaView style={{
        backgroundColor: 'white', flex: 1, justifyContent: 'center',
        position: 'relative'
    }}>
        <ScrollView style={{paddingHorizontal: 25}}>
            <View style={{alignItems: 'center'}}>
                <Image source={images.signUp}
                       style={{width: 300, height: 350}}/>
            </View>
            <Text style={{
                fontWeight: 'bold', fontSize: 28, color: 'black', marginBottom: 30
            }}>Register</Text>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30
            }}>
                <TouchableOpacity style={{
                    borderColor: '#ddd', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10
                }}>
                    <Image source={images.google} style={{width: 24, height: 24}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    borderColor: '#ddd', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10
                }}>
                    <Image source={images.facebook} style={{width: 24, height: 24}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    borderColor: '#ddd', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10
                }}>
                    <Image source={images.phoneNumber} style={{width: 24, height: 24}}/>
                </TouchableOpacity>
            </View>
            <Text style={{
                textAlign: 'center', color: '#666', marginBottom: 30
            }}>Or, Login with</Text>
            <InputField label={'Name'} icon={'user'} valueInput={nameRegister} onChange={setNameRegister}/>
            <InputField label={'Email ID'} icon={'at'} valueInput={emailRegister} onChange={setEmailRegister}/>
            <InputField label={'Password'} icon={'lock'} inputType={'password'}
                        valueInput={passwordRegister} onChange={setPasswordRegister}/>
            <InputField label={'Confirm Password'} icon={'lock'} inputType={'password'}
                        valueInput={confirmPasswordRegister} onChange={setConfirmPasswordRegister}/>
            <TouchableOpacity
                onPress={registerUser}
                style={{
                    backgroundColor: colors.primary, padding: 20, borderRadius: 10, marginBottom: 30
            }}>
                <Text style={{
                    textAlign: 'center', fontWeight: '700', fontSize: 16, color: 'black'
                }}>Register</Text>
            </TouchableOpacity>
            <View style={{
                flexDirection: 'row', justifyContent: 'center', marginBottom: 30,
            }}>
                <Text>Already registered?</Text>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Text style={{
                        color: colors.primary, fontWeight: '700', marginLeft: 5
                    }}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        {isLoading === true ? (<View style={styles.overlay}>
            <ActivityIndicator size={"large"}/>
        </View>) : null }
    </SafeAreaView>)
}
const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        opacity: 0.8,
        justifyContent: 'center',
    },
})
export default SignUp
