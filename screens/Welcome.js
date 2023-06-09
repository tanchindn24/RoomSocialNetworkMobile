import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, images} from "../constans/index";
import {getApi} from "../routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

function Welcome(props) {

    // navigation
    const {navigation,} = props
    // functions of navigate to/back
    const {navigate,} = navigation

    const host = `${getApi.host}:${getApi.port}`;
    const api = '/api';
    const checkStatusToken = '/check-token-status';

    const checkTokenStatus = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken')
            if (!userToken) {
                console.log('Token does not exist')
            }

            const response = await axios.get(host + api + checkStatusToken, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })

            const { statusToken } = response.data;

            if (statusToken === false) {
                console.log('Token expires')
                Alert.alert('Thông báo!', 'Token hết hạn')
                await AsyncStorage.removeItem('userToken');
            } else if (statusToken === true) {
                console.log('Token true')
            }
        } catch (error) {
            console.error('Error check status token: ', error)
        }
    }

    useEffect(() => {
        checkTokenStatus().then((result) => {
            console.log(result)
        });
    }, []);

    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                height: 100,
                flex: 15
            }}>
                <Icon
                    name={'home'}
                    color={colors.primary}
                    size={30}
                />
                <Text style={{
                    color: colors.primary,
                    fontWeight: 'bold',
                    fontSize: 23,
                    textTransform: 'uppercase'
                }}>
                    WellCome MotelRoom Social
                </Text>
            </View>
            <View style={{
                flex: 40,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    source={images.welcome}
                    style={{
                        width: 350,
                        height: 350,
                    }}/>
            </View>
            <View style={{
                flex: 30,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                }}>MotelRoom Social Mobile App</Text>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'gray',
                    textAlign: 'center',
                }}>MotelRoom Social Mobile App is a powerful and user-friendly application designed to revolutionize the
                    way you find and book motel rooms. </Text>
            </View>
            <View style={{
                flex: 15,
                justifyContent: 'center'
            }}>
                <TouchableOpacity style={{
                    borderColor: colors.primary,
                    backgroundColor: colors.primary,
                    borderWidth: 1,
                    borderRadius: 20,
                    height: 60,
                    marginHorizontal: 35,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                                  onPress={()=>{
                                      navigate('Home')
                                  }}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
export default Welcome
