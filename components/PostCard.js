import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {colors, images} from "../constans";
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatTime } from "../utils/utils";
import {getApi} from "../routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import axios from "axios";
import header from "react-navigation-stack/src/vendor/views/Header/Header";

function PostCard({props, item, userToken, triggerCallGetPost}) {

    const {navigation} = props
    const {navigate} = navigation

    const host = `${getApi.host}:${getApi.port}`;
    const api = '/api';
    const hidePostEndPoint = '/hide-post';
    const showPostEndPoint = '/show-post';
    const deletePostEndPoint = '/delete-post';

    const convertJsonImages = item && JSON.parse(item.image);

    const hidePost = async (idPost) => {
        try {
            const responseHidePost = await axios.put(host+api+hidePostEndPoint+`/${idPost}`, null, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            const { data } = responseHidePost.data
            triggerCallGetPost(true);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const showPost = async (idPost) => {
        try {
            const responseHidePost = await axios.put(host+api+showPostEndPoint+`/${idPost}`, null, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            const { data } = responseHidePost.data
            triggerCallGetPost(true);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = async (idPost) => {
        try {
            const responseHidePost = await axios.delete(host+api+deletePostEndPoint+`/${idPost}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            const { data } = responseHidePost.data
            triggerCallGetPost(true);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View key={item.id} style={styles.card}>
            <View style={styles.UserInfo}>
                <Image source={{uri: `${host}/upload/avatar/${item.user_avatar}`}}
                       style={styles.UserImg}
                />
                <View style={styles.UserInfoText}>
                    <TouchableOpacity>
                        <Text style={styles.UserName}>{item.user}</Text>
                    </TouchableOpacity>
                    <Text style={styles.PostTime}>{formatTime(item.created_at)}</Text>
                </View>
            </View>
            <Text style={styles.PostText}>{((item.title).length > 50) ? (((item.title).substring(0, 50 - 3)) + '...') : item.title}</Text>
            <Image source={{uri: convertJsonImages[0]}}
                   style={styles.PostImg}
            />
            <View style={styles.InteractionWrapper}>
                {item.status === 2 ? (
                        <TouchableOpacity style={styles.Interaction}
                                          onPress={() => showPost(item.id)}
                        >
                            <Icon name={'eye'} size={25} color={colors.primary}/>
                            <Text style={styles.InteractionText}>Hiển thị</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.Interaction}
                                          onPress={() => hidePost(item.id)}
                        >
                            <Icon name={'eye-slash'} size={25} color={colors.Warning}/>
                            <Text style={styles.InteractionText}>Ẩn</Text>
                        </TouchableOpacity>
                    )}
                <TouchableOpacity style={styles.Interaction}
                                  onPress={() => navigate('UpdatePost', {itemPost: item, userToken: userToken})}
                >
                    <Icon name={'edit'} size={25} color={colors.Info}/>
                    <Text style={styles.InteractionText}>Thay đổi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Interaction}
                                  onPress={() => deletePost(item.id)}
                >
                    <Icon name={'trash-o'} size={25} color={colors.danger}/>
                    <Text style={styles.InteractionText}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    card: {
        backgroundColor: "#f8f8f8",
        width: "100%",
        marginBottom: 20,
        borderRadius: 10
    },
    UserInfo: {
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 15,
    },
    UserImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    UserInfoText: {
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 10,
    },
    UserName: {
        fontSize: 14,
        fontWeight: "bold",
    },
    PostTime: {
        fontSize: 12,
        color: "#666",
    },
    PostText: {
        fontSize: 14,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 15,
    },
    PostImg: {
        width: "100%",
        height: 250,
    },
    Divider: {
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
        width: "92%",
        alignSelf: "center",
        marginTop: 15,
    },
    InteractionWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 15,
    },
    Interaction: {
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    InteractionText: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.Secondary,
        marginTop: 5,
        marginLeft: 5,
    }
})

export default PostCard
