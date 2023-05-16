import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {images} from "../constans";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from "react";
import axios from "axios";
import {getApi} from "../routes/index";

function itemPost(props) {

    function formatTime(time) {
        switch (typeof time) {
            case 'number':
                break;
            case 'string':
                time = +new Date(time);
                break;
            case 'object':
                if (time.constructor === Date) time = time.getTime();
                break;
            default:
                time = +new Date();
        }
        const time_formats = [
            [60, 'seconds', 1], // 60
            [120, '1 minute ago', '1 minute from now'], // 60*2
            [3600, 'minutes', 60], // 60*60, 60
            [7200, '1 hour ago', '1 hour from now'], // 60*60*2
            [86400, 'hours', 3600], // 60*60*24, 60*60
            [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
            [604800, 'days', 86400], // 60*60*24*7, 60*60*24
            [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
            [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
            [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
            [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
            [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
            [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
            [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
            [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        let seconds = (+new Date() - time) / 1000,
            token = 'ago',
            list_choice = 1;

        if (seconds === 0) {
            return 'Just now'
        }
        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = 'from now';
            list_choice = 2;
        }
        let i = 0,
            format;
        while (format = time_formats[i++])
            if (seconds < format[0]) {
                if (typeof format[2] == 'string')
                    return format[list_choice];
                else
                    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
        return time;
    }

    const [posts, setPosts] = useState(null)

    const host = `${getApi.host}:${getApi.port}`;
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
