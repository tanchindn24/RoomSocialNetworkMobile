import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {images} from "../constans";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from "react";
import axios from "axios";
import {getApi} from "../routes/index";
import { formatTime, numberFormat } from "../utils/utils";
function itemPost(props) {

    // navigation
    const {navigation,} = props
    // functions of navigate to/back
    const {navigate,} = navigation

    const [posts, setPosts] = useState(null)

    const host = `${getApi.host}:${getApi.port}`;
    const api = '/api';
    const getPosts = '/posts';

    useEffect(() => {
        axios.get(host + api + getPosts)
            .then((response) => {
                setPosts(response.data.posts)
            }).catch(error => {
            console.log(error)
        });
    }, []);

    if (!posts) {
        return <View style={{
            flex: 1, backgroundColor: 'while',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size={"large"}/>
        </View>
    }

    return (
        <View style={{
            flex: 1, backgroundColor: 'while'
        }}>
            <FlatList style={{flex: 1}}
                      keyExtractor={item => item.id}
                      horizontal={false}
                      data={posts} renderItem={({item}) => {
                const convertJsonImages = JSON.parse(item.image);
                return (
                    <TouchableOpacity
                        onPress={() => {
                            navigate('DetailPost', {item: item})
                        }}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 10,
                        }}>
                            <Image style={{
                                flex: 70,
                                width: 350,
                                height: 150,
                                resizeMode: 'cover',
                                borderRadius: 15,
                                marginBottom: 5,
                            }} source={{uri: `${host}/upload/posts/images/${convertJsonImages[0]}`}}/>
                            <View style={{
                                flex: 30,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    marginRight: 10
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: 'black',
                                        fontWeight: 'bold'
                                    }}>{((item.category).length > 20) ? (((item.category).substring(0, 20 - 3)) + '...') : item.category}</Text>
                                    <View>
                                        <Text style={{
                                            fontSize: 13,
                                            color: 'black',
                                            fontWeight: 'normal'
                                        }}>{((item.address).length > 35) ? (((item.address).substring(0, 35 - 3)) + '...') : item.address}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    marginLeft: 10
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Icon name={'eye'}
                                              color={'gray'}
                                              size={20}
                                        />
                                        <Text style={styles.textPost}>{item.view}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Icon name={'dollar'}
                                              color={'gray'}
                                              size={20}
                                        />
                                        <Text style={styles.textPost}>{numberFormat(item.price)} VNĐ</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Icon name={'clock-o'}
                                              color={'gray'}
                                              size={18}
                                        />
                                        <Text
                                            style={styles.textPost}>{formatTime(new Date(item.created_at))}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    textPost: {
        marginLeft: 15,
        fontSize: 15,
        color: 'gray',
        fontWeight: 'normal'
    }
})
export default itemPost
