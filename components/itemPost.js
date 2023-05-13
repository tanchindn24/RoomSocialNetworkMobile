import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {images} from "../constans";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from "react";

function itemPost(props) {

    const [posts, setPosts] = useState([
        {
            userName: 'Phạm Thanh Trường',
            address: 'Hòa Minh, Liên Chiểu, TP Đà Nẵng',
            view: 100,
            price: 2000000,
            area: 20,
            image: images.posts
        },
        {
            userName: 'Phạm Thanh Trường',
            address: 'Nguyễn Huy Tưởng, Hòa Minh, Liên Chiểu, TP Đà Nẵng',
            view: 120,
            price: 3000000,
            area: 30,
            image: images.posts
        },
        {
            userName: 'Phạm Thanh Trường',
            address: '123 Nguyễn Huy Tưởng, Hòa Minh, Liên Chiểu, TP Đà Nẵng',
            view: 130,
            price: 2300000,
            area: 23,
            image: images.posts
        },
        {
            userName: 'Phạm Thanh Trường',
            address: 'Hòa Minh, Liên Chiểu, TP Đà Nẵng',
            view: 140,
            price: 2000000,
            area: 20,
            image: images.posts
        },
        {
            userName: 'Phạm Thanh Trường',
            address: 'Hòa Minh, Liên Chiểu, TP Đà Nẵng',
            view: 100,
            price: 2000000,
            area: 20,
            image: images.posts
        },
        {
            userName: 'Phạm Thanh Trường',
            address: 'Hòa Minh, Liên Chiểu, TP Đà Nẵng',
            view: 150,
            price: 2000000,
            area: 20,
            image: images.posts
        }
    ])

    return (
        <View style={{
            flex: 1, backgroundColor: 'while'
        }}>
            <FlatList style={{flex: 1}}
                      keyExtractor={item => item.name}
                      horizontal={false}
                      data={posts} renderItem={({item}) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            alert('vao')
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
                            }} source={images.posts}/>
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
                                    }}>Phòng
                                        trọ {((item.userName).length > 20) ? (((item.userName).substring(0, 20 - 3)) + '...') : item.userName}</Text>
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
                                        <Icon name={'money'}
                                              color={'gray'}
                                              size={18}
                                        />
                                        <Text
                                            style={styles.textPost}>{((item.price).length > 7) ? (((item.price).substring(0, 7 - 3)) + '...') : item.price} đ</Text>
                                    </View>
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
