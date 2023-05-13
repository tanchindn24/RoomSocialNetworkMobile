import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {images} from "../constans";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from "react";
import axios from "axios";

function itemPost(props) {

    const [posts, setPosts] = useState(null)

    const host = 'http://192.168.1.5:2023';
    const api = '/api';
    const getPosts = '/posts';

    axios.get(host + api + getPosts)
        .then((response) => {
            setPosts(response.data.posts)
        }).catch(error => {
        console.log(error)
    })
    if (!posts) {
        return <View style={{
            flex: 1, backgroundColor: 'while',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>Loading...</Text>
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
                            alert(`${host}/images/posts/${convertJsonImages[0]}`)
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
                            }} source={{uri: `${host}/images/posts/${convertJsonImages[0]}`}}/>
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
                                    {/*<View style={{*/}
                                    {/*    flexDirection: 'row',*/}
                                    {/*    justifyContent: 'space-between'*/}
                                    {/*}}>*/}
                                    {/*    <Icon name={'money'}*/}
                                    {/*          color={'gray'}*/}
                                    {/*          size={18}*/}
                                    {/*    />*/}
                                    {/*    <Text*/}
                                    {/*        style={styles.textPost}>{((item.price).length > 7) ? (((item.price).substring(0, 7 - 3)) + '...') : item.price} đ</Text>*/}
                                    {/*</View>*/}
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Icon name={'square'}
                                              color={'gray'}
                                              size={20}
                                        />
                                        <Text style={styles.textPost}>{item.area} m2</Text>
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
