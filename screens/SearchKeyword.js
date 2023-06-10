import {
    Dimensions,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
    Image,
    TextInput,
    Animated,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useEffect, useRef, useState} from "react";
import {images} from "../constans";
import axios from "axios";
import {getApi} from "../routes/index";
import {numberFormat} from "../utils/utils";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const SizeIconCircleHeader = 32;
const SizeIconHeader = 16;
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function SearchKeyword(props) {

    const {navigation} = props
    const {navigate} = navigation

    const host = `${getApi.host}:${getApi.port}`;
    const api = '/api';
    const getPosts = '/posts';

    const [dataPosts, setDataPosts] = useState([]);
    const [searchPosts, setSearchPosts] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [hasResult, setHasResult] = useState(true);

    useEffect(() => {
        fetchData().then(r => {
            console.log(r)
        });
    }, []);

    useEffect(() => {
        search();
    }, [searchPosts]);

    const fetchData = async () => {
        try {
            const response = await axios.get(host + api + getPosts);
            setDataPosts(response.data.posts)
        } catch (error) {
            alert(error)
        }
    }

    // const search = () => {
    //     const result = dataPosts.filter(item => item.address.includes(searchPosts));
    //     setSearchResult(result)
    // }

    const search = () => {
        if (!searchPosts || dataPosts === null) {
            setSearchResult([]);
            setHasResult(false);
        } else {
            const lowercaseSearchPosts = searchPosts.toLowerCase();
            const result = dataPosts.filter(item => {
                //const lowercaseAddress = item.address.toLowerCase();
                const lowercaseUser = item.user.toLowerCase();
                //const lowercaseCategory = item.category.toLowerCase();
                const lowercasePrice = item.category.toLowerCase();

                return (
                    lowercasePrice.includes(lowercaseSearchPosts) ||
                    lowercaseUser.includes(lowercaseSearchPosts)
                );
            });

            setSearchResult(result);
            setHasResult(result.length > 0);
        }
    };

    const animatedValue = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);
    const lastOffsetY = useRef(0);
    const scrollDirection = useRef(0);

    const searchInputAnimated = {
        transform: [{
            scaleX: animatedValue.interpolate({
                inputRange: [0, 50], outputRange: [1, 0], extrapolate: 'clamp'
            }),
        }, {
            translateX: animatedValue.interpolate({
                inputRange: [0, 25], outputRange: [0, -100], extrapolate: 'clamp'
            })
        },], opacity: animatedValue.interpolate({
            inputRange: [0, 25], outputRange: [1, 0], extrapolate: 'clamp'
        })
    }

    const featureNameAnimation = {
        transform: [{
            scale: animatedValue.interpolate({
                inputRange: [0, 30], outputRange: [1, 0], extrapolate: 'clamp',
            }),
        },], opacity: animatedValue.interpolate({
            inputRange: [0, 30], outputRange: [1, 0], extrapolate: 'clamp'
        }),
    }

    const postViewAnimation = {
        transform: [{
            translateX: animatedValue.interpolate({
                inputRange: [0, 80], outputRange: [0, 75], extrapolate: 'clamp'
            }),
        }, {
            translateY: animatedValue.interpolate({
                inputRange: [0, 100], outputRange: [0, -50], extrapolate: 'clamp'
            })
        }]
    }

    const profileViewAnimation = {
        transform: [{
            translateX: animatedValue.interpolate({
                inputRange: [0, 80], outputRange: [0, 55], extrapolate: 'clamp'
            }),
        }, {
            translateY: animatedValue.interpolate({
                inputRange: [0, 100], outputRange: [0, -50], extrapolate: 'clamp'
            })
        }]
    }

    const qrPostsViewAnimation = {
        transform: [{
            translateX: animatedValue.interpolate({
                inputRange: [0, 80], outputRange: [0, 20], extrapolate: 'clamp'
            }),
        }, {
            translateY: animatedValue.interpolate({
                inputRange: [0, 100], outputRange: [0, -50], extrapolate: 'clamp'
            })
        }]
    }

    const scanViewAnimation = {
        transform: [{
            translateX: animatedValue.interpolate({
                inputRange: [0, 80], outputRange: [0, 0], extrapolate: 'clamp'
            }),
        }, {
            translateY: animatedValue.interpolate({
                inputRange: [0, 100], outputRange: [0, -50], extrapolate: 'clamp'
            })
        }]
    }

    const featureIconCircleAnimated = {
        opacity: animatedValue.interpolate({
            inputRange: [0, 25], outputRange: [1, 0], extrapolate: 'clamp'
        })
    }

    const featureIconAnimated = {
        opacity: animatedValue.interpolate({
            inputRange: [0, 50], outputRange: [0, 1], extrapolate: 'clamp'
        })
    }

    return (<View style={styles.container}>
        <StatusBar barStyle={"light-content"}/>
        <SafeAreaView>
            <View style={styles.upperHeaderPlaceholder}></View>
        </SafeAreaView>
        <SafeAreaView style={styles.header}>
            <View style={styles.upperHeader}>
                <View style={styles.searchContainer}>
                    <Icon name={'search'}
                          color={'white'}
                          size={16}
                          style={styles.searchIcon}/>
                    <AnimatedTextInput placeholder="Tìm kiếm"
                                       value={searchPosts}
                                       onChangeText={text => setSearchPosts(text)}
                                       placeholderTextColor={'white'}
                                       style={[styles.searchInput, searchInputAnimated]}></AnimatedTextInput>

                </View>
            </View>
            <View style={styles.lowerHeader}>
                <Animated.View style={[styles.feature, postViewAnimation]}>
                    <Animated.View style={[styles.featureIconCircle, featureIconCircleAnimated]}>
                        <Icon name={'send-o'}
                              color={'#0caf66'}
                              size={SizeIconCircleHeader}/>
                    </Animated.View>
                    <Animated.View style={[styles.featureIcon, featureIconAnimated]}>
                        <Icon name={'send-o'}
                              color={'white'}
                              size={SizeIconHeader}/>
                    </Animated.View>
                    <Animated.Text style={[styles.featureName, featureNameAnimation]}>Đăng tin</Animated.Text>
                </Animated.View>
                <Animated.View style={[styles.feature, profileViewAnimation]}>
                    <Animated.View style={[styles.featureIconCircle, featureIconCircleAnimated]}>
                        <Icon name={'user-circle-o'}
                              color={'#0caf66'}
                              size={SizeIconCircleHeader}/>
                    </Animated.View>
                    <Animated.View style={[styles.featureIcon, featureIconAnimated]}>
                        <Icon name={'user-circle-o'}
                              color={'white'}
                              size={SizeIconHeader}/>
                    </Animated.View>
                    <Animated.Text style={[styles.featureName, featureNameAnimation]}>Trang cá nhân</Animated.Text>
                </Animated.View>
                <Animated.View style={[styles.feature, qrPostsViewAnimation]}>
                    <Animated.View style={[styles.featureIconCircle, featureIconCircleAnimated]}>
                        <Icon name={'qrcode'}
                              color={'#0caf66'}
                              size={SizeIconCircleHeader}/>
                    </Animated.View>
                    <Animated.View style={[styles.featureIcon, featureIconAnimated]}>
                        <Icon name={'qrcode'}
                              color={'white'}
                              size={SizeIconHeader}/>
                    </Animated.View>
                    <Animated.Text style={[styles.featureName, featureNameAnimation]}>QR Tin đăng</Animated.Text>
                </Animated.View>
                <Animated.View style={[styles.feature, scanViewAnimation]}>
                    <Animated.View style={[styles.featureIconCircle, featureIconCircleAnimated]}>
                        <Icon name={'hand-paper-o'}
                              color={'#0caf66'}
                              size={SizeIconCircleHeader}/>
                    </Animated.View>
                    <Animated.View style={[styles.featureIcon, featureIconAnimated]}>
                        <Icon name={'hand-paper-o'}
                              color={'white'}
                              size={SizeIconHeader}/>
                    </Animated.View>
                    <Animated.Text style={[styles.featureName, featureNameAnimation]}>Quét mã</Animated.Text>
                </Animated.View>
            </View>
        </SafeAreaView>
        <ScrollView
            ref={scrollViewRef}
            onScroll={e => {
                const offSetY = e.nativeEvent.contentOffset.y;
                scrollDirection.current = offSetY - lastOffsetY.current > 0 ? 'down' : 'up';
                lastOffsetY.current = offSetY;
                animatedValue.setValue(offSetY);
            }}
            onScrollEndDrag={() => {
                scrollViewRef.current?.scrollTo({
                    y: scrollDirection.current === 'down' ? 100 : 0, animated: true,
                })
            }}
            scrollEventThrottle={16}>
            <View style={styles.paddingForHeader}></View>
            <View style={styles.scrollViewContent}>
                {hasResult ? (<View style={styles.dataInScrollView}>
                    <View>
                        <Text style={styles.titleDataInScrollView}>Tin đăng</Text>
                    </View>
                    <View style={styles.postsContainer}>
                        {searchResult.map((item) => {
                            const convertJsonImages = JSON.parse(item.image);
                            return (
                                <TouchableOpacity key={item.id}
                                                  onPress={() => {
                                                      navigate('DetailPost', {item: item})
                                                  }}
                                >
                                    <View style={styles.postsSearch}>
                                        <Image source={{uri: convertJsonImages[0]}}
                                               style={styles.imagePosts}/>
                                        <View style={styles.informationPosts}>
                                            <Text style={styles.userNamePosts}>{item.user}</Text>
                                            <Text style={styles.categoryPosts}>{item.category}</Text>
                                            <Text style={styles.addressPosts}>{item.address}</Text>
                                            <Text style={styles.addressPosts}>{numberFormat(item.price)} VNĐ</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>) : (<View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                    <Image source={images.houseQuestionMark} style={{marginTop: 100, width: 164, height: 164}}/>
                </View>)}
            </View>
        </ScrollView>

    </View>)
}

const UPPER_HEADER_HEIGHT = 40;
const LOWER_HEADER_HEIGHT = 96;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white'
    }, upperHeaderPlaceholder: {
        height: UPPER_HEADER_HEIGHT,
    }, header: {
        position: 'absolute', width: '100%', backgroundColor: '#0caf66'
    }, paddingForHeader: {
        height: LOWER_HEADER_HEIGHT,
    }, scrollViewContent: {
        height: HEIGHT * 2, backgroundColor: '#EEEEF1'
    }, upperHeader: {
        height: UPPER_HEADER_HEIGHT, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20
    }, lowerHeader: {
        height: LOWER_HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16
    }, searchContainer: {
        flex: 1, justifyContent: 'center'
    }, searchInput: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: 'white',
        borderRadius: 4,
        paddingVertical: 4,
        paddingLeft: 32
    }, searchIcon: {
        marginLeft: 8,
    }, feature: {
        alignItems: 'center'
    }, featureIconCircle: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    }, featureName: {
        fontWeight: 'bold', fontSize: 12, lineHeight: 14, color: 'white', marginTop: 12, textTransform: 'uppercase',
    }, featureIcon: {
        position: 'absolute', top: 8
    }, dataInScrollView: {
        marginTop: 25, marginHorizontal: 10,
    }, titleDataInScrollView: {
        fontSize: 20, fontWeight: 'bold', color: 'black'
    }, postsContainer: {
        marginTop: 5, borderRadius: 25, flexDirection: 'column', alignItems: 'flex-start', padding: 15,
    }, postsSearch: {
        height: 100, flexDirection: 'row', width: '90%'
    }, imagePosts: {
        width: 75, height: 75, borderRadius: 10
    }, informationPosts: {
        flexDirection: 'column', marginLeft: 15
    }, userNamePosts: {
        fontWeight: 'bold', color: 'black'
    }, categoryPosts: {
        fontWeight: 'bold', color: 'black'
    }, addressPosts: {fontWeight: 'normal'}
})

export default SearchKeyword
