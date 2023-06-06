import {
    SafeAreaView, Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from "react";
import {getApi} from "../routes";
import {colors} from "../constans";
import PostCard from "../components/PostCard";
import axios from "axios";

function Profile(props) {

    const {navigation} = props
    const {navigate} = navigation

    const host = `${getApi.host}:${getApi.port}`;
    const api = '/api';
    const getPostByUser = '/get-posts-by-user';
    const logout = '/logout';

    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState('');
    const [postsByUser, setPostsByUser] = useState(null);
    const [isTokenAvailable, setIsTokenAvailable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getUserInfo();
            await getUserToken().then((r) => {
                if (r === null) {
                    setIsTokenAvailable(true);
                }
            });
        };

        fetchData().then(() => {});
    }, [])

    useEffect(() => {
        if (isTokenAvailable) {
            getPosts();
        }
    }, [isTokenAvailable]);

    const getUserToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
            return userToken;
        } catch (error) {
            console.log('Error retrieving token: ' + error);
        }
    };

    const getPosts = async () => {
        try {
            const postByUser = await axios.get(host + api + getPostByUser, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            const { data } = postByUser.data;
            setPostsByUser(data);
        } catch (e) {
            console.log('Error: ', e);
        }
    };

    const getUserInfo = async () => {
        try {
            const info = await AsyncStorage.getItem('userInfo');
            setUserInfo(info);
        } catch (error) {
            console.log('Error retrieving user info: ' + error);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'You want to logout?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => logoutUser(userToken) },
            ],
            { cancelable: false }
        );
    };

    const logoutUser = async (token) => {
        try {
            const response = await axios.post(host + api + logout, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const { success } = response.data;

            if (success === false) {
                console.log('Logout error')
            } else if (success === true) {
                await AsyncStorage.removeItem('userToken')
                console.log('Logout success')
                navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] })
            }
        } catch (error) {
            console.error('Error logout: ', error)
        }
    }

    const randomNumber = Math.floor(Math.random() * 41) + 10;

    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: '#fff',
        }}>
            <ScrollView style={styles.container}
                        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                        showsVerticalScrollIndicator={false}>
                <Image source={{uri: `${host}/images/avatar/${userInfo && JSON.parse(userInfo)?.data?.avatar}`}}
                       style={styles.userImg}
                />
                <Text style={styles.userName}>{userInfo && JSON.parse(userInfo)?.data?.name}</Text>
                <Text
                    style={styles.aboutUser}>{userInfo && JSON.parse(userInfo)?.data?.roles === 2 ? "Provider" : "Seeker"}</Text>
                <View style={styles.userBtnWrapper}>
                    <TouchableOpacity style={styles.userBtn}>
                        <Text style={styles.userBtnTxt}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userBtn}>
                        <Text style={styles.userBtnTxt}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userBtn}
                                      onPress={()=>navigate('CategoryPost')}
                    >
                        <Text style={styles.userBtnTxt}>Post</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.userBtnLogout}
                                  onPress={handleLogout}
                >
                    <Text style={styles.userBtnTxt}>Logout</Text>
                </TouchableOpacity>

                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>{userInfo && JSON.parse(userInfo)?.data?.countPosts}</Text>
                        <Text style={styles.userInfoSubTitle}>Posts</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>{userInfo && JSON.parse(userInfo)?.data?.countView}</Text>
                        <Text style={styles.userInfoSubTitle}>View</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>{randomNumber}</Text>
                        <Text style={styles.userInfoSubTitle}>Seeker</Text>
                    </View>
                </View>
                {
                    postsByUser === null ? (
                        <ActivityIndicator size={"large"}/>
                    ) : (
                        postsByUser.map((item) => (
                            <PostCard key={item.id} item={item}/>
                        ))
                    )
                }
            </ScrollView>
        </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff', padding: 20,
    }, userImg: {
        height: 150, width: 150, borderRadius: 75,
    }, userName: {
        fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 10,
    }, aboutUser: {
        fontSize: 12, fontWeight: '600', color: '#666', textAlign: 'center', marginBottom: 10,
    }, userBtnWrapper: {
        flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 10,
    }, userBtn: {
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    }, userBtnTxt: {
        color: colors.primaryHome,
    }, userInfoWrapper: {
        flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 20,
    }, userInfoItem: {
        justifyContent: 'center',
    }, userInfoTitle: {
        fontSize: 20, fontWeight: 'bold', marginBottom: 5, textAlign: 'center',
    }, userInfoSubTitle: {
        fontSize: 12, color: '#666', textAlign: 'center',
    },
    userBtnLogout: {
        borderColor: colors.danger,
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    }
})

export default Profile
