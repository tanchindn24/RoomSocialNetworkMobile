import {Alert, Image, Text, TouchableOpacity, View} from "react-native";
import {colors, images} from "../constans/index";
import SlideHome from "../components/slideHome";
import CategoryPost from "../components/categoryPost";
import ItemPost from "../components/itemPost";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";

function Home(props) {

    const {navigation} = props
    const {navigate} = navigation

    const [existenceToken, setExistenceToken] = useState(false);

    const checkExistenceToken = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken')
            console.log(userToken)
            if (userToken) {
                setExistenceToken(true)
                console.log('Token exists')
            } else {
                setExistenceToken(false)
                Alert.alert('Thông báo!', 'Token hết hạn')
                console.log('Token expires')
            }
        } catch (error) {
            console.error('Error check existence token: ', error)
        }
    }

    useEffect(() => {
        checkExistenceToken().then((result) => {
            console.log(result)
        });
    }, []);

    return (<View style={{
        flex: 1, backgroundColor: 'white'
    }}>
        <View style={{
            flex: 10, marginHorizontal: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'
        }}>
            <View style={{
                flexDirection: 'column'
            }}>
                <Text style={{
                    color: colors.primaryHome, fontSize: 20, fontWeight: 'bold', marginBottom: 3
                }}>MotelRoom Social</Text>
                <Text style={{
                    color: 'gray', fontSize: 15, fontWeight: 'normal'
                }}>List Post</Text>
            </View>
            <View>
                {existenceToken ? (
                    <TouchableOpacity onPress={() => {
                        navigate('Profile')
                    }}>
                        <Icon name={'user-circle'}
                              size={30}
                              color={'gray'}/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => {
                        navigate('SignIn')
                    }}>
                        <Icon name={'user-circle'}
                              size={30}
                              color={'gray'}/>
                    </TouchableOpacity>
                )}
            </View>
        </View>
        <View style={{
            flex: 10, flexDirection: 'row', marginHorizontal: 10, marginVertical: 20,
        }}>
            <TouchableOpacity style={{
                flex: 50,
                backgroundColor: '#56E39F',
                borderRadius: 25,
                borderColor: '#56E39F',
                marginRight: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
                              onPress={() => {
                                  navigate('SearchKeyword')
                              }}>
                <View style={{
                    alignItems: 'center', marginLeft: 15,
                }}>
                    <Text style={{
                        fontSize: 17, fontWeight: 'bold', color: colors.primaryHome, textTransform: 'uppercase'
                    }}>
                        Tìm theo
                    </Text>
                    <Text style={{
                        fontSize: 17, fontWeight: 'bold', color: colors.primaryHome, textTransform: 'uppercase'
                    }}>
                        từ khóa
                    </Text>
                </View>
                <Image style={{
                    width: 70, height: 70, marginRight: 1,
                }}
                       source={images.buttonNavLeft}/>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 50,
                backgroundColor: '#56E39F',
                borderRadius: 25,
                borderColor: '#56E39F',
                marginLeft: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View style={{
                    alignItems: 'center', marginLeft: 15,
                }}>
                    <Text style={{
                        fontSize: 17, fontWeight: 'bold', color: colors.primaryHome, textTransform: 'uppercase'
                    }}>
                        Tìm theo
                    </Text>
                    <Text style={{
                        fontSize: 17, fontWeight: 'bold', color: colors.primaryHome, textTransform: 'uppercase'
                    }}>
                        khu vực
                    </Text>
                </View>
                <Image style={{
                    width: 70, height: 70, marginRight: 5,
                }}
                       source={images.buttonNavRight}/>
            </TouchableOpacity>
        </View>
        <View style={{
            flex: 30,
        }}>
            <SlideHome/>
        </View>
        <View style={{
            flex: 50, marginHorizontal: 10,
        }}>
            <View style={{
                flex: 15, flexDirection: 'column',
            }}>
                <Text style={{
                    fontSize: 20, fontWeight: 'bold', color: colors.primaryHome
                }}>Loại phòng trọ</Text>
                <CategoryPost/>
            </View>
            <View style={{
                flex: 35, flexDirection: 'column'
            }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,
                }}>
                    <Text style={{
                        fontSize: 20, fontWeight: 'bold', color: colors.primaryHome
                    }}>New Post</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigate('ListPosts')
                        }}
                    >
                        <Text style={{
                            fontSize: 15, fontWeight: 'normal', color: colors.primary
                        }}>See all</Text>
                    </TouchableOpacity>
                </View>
                <ItemPost navigation={navigation}/>
            </View>
        </View>
    </View>)
}

export default Home
