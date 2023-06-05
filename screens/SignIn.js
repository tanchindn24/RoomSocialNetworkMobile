import {
    ActivityIndicator,
    Image,
    SafeAreaView,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignIn(props) {

    const {navigation} = props
    const {navigate} = navigation

    const host = `${getApi.host}:${getApi.port}`;
    const api = '/api';
    const loginEndpoint = '/login';

    const [emailRegister, setEmailRegister] = useState(null);
    const [passwordRegister, setPasswordRegister] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const loginUser = () => {
        setIsLoading(true)
        const loginData = {
            email: emailRegister,
            password: passwordRegister,
        };
        axios
            .post(`${host}${api}${loginEndpoint}`, loginData)
            .then(response => {
                let userInfo = response.data
                setUserInfo(userInfo)
                setUserToken(userInfo.data.token)

                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                AsyncStorage.setItem('userToken', userInfo.data.token)
                setIsLoading(false)
                navigate('Home')
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (<SafeAreaView style={{
        backgroundColor: 'white', flex: 1, justifyContent: 'center',
        position: 'relative'
    }}>
        <View style={{paddingHorizontal: 25}}>
            <View style={{alignItems: 'center'}}>
                <Image source={images.signIn}
                       style={{width: 300, height: 350}}/>
            </View>
            <Text style={{
                fontWeight: 'bold', fontSize: 28, color: 'black', marginBottom: 30
            }}>Login</Text>
            <InputField label={'Email ID'} icon={'at'}
                        valueInput={emailRegister} onChange={setEmailRegister}/>
            <InputField label={'Password'} icon={'lock'}
                        inputType={'password'} fieldButtonLabel={'Forgot?'}
                        valueInput={passwordRegister} onChange={setPasswordRegister}/>
            <TouchableOpacity onPress={loginUser}
                              style={{
                                  backgroundColor: colors.primary, padding: 20, borderRadius: 10, marginBottom: 30
                              }}>
                <Text style={{
                    textAlign: 'center', fontWeight: '700', fontSize: 16, color: 'black'
                }}>Login</Text>
            </TouchableOpacity>
            <Text style={{
                textAlign: 'center', color: '#666', marginBottom: 30
            }}>Or, Login with</Text>
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
            <View style={{
                flexDirection: 'row', justifyContent: 'center', marginBottom: 30,
            }}>
                <Text>New to the app?</Text>
                <TouchableOpacity onPress={() => {
                    navigate('SignUp')
                }}>
                    <Text style={{
                        color: colors.primary, fontWeight: '700', marginLeft: 5
                    }}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
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

export default SignIn
