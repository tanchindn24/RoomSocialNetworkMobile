import {Image, Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, images} from "../constans/index";
import {getApi} from "../routes";

function DetailPost(props) {

    // props
    const host = `${getApi.host}:${getApi.port}`;
    const {navigation, route} = props

    const { item } = route.params;

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const convertJsonImages = JSON.parse(item.image);

    return (
        <View style={{flex: 1, marginHorizontal: 15}}>
            <View style={{
                flex: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={()=>navigation.pop(1)}>
                    <Icon
                        name={'arrow-circle-left'}
                        size={30}
                        color={colors.primaryHome}
                    />
                </TouchableOpacity>
                <Icon
                    name={'heart-o'}
                    size={25}
                    color={colors.primaryHome}
                />
            </View>
            <View style={{
                flex: 35,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={{uri: `${host}/images/posts/${convertJsonImages[0]}`}}
                       style={{
                           width: 340,
                           height: 340,
                           resizeMode: 'cover',
                       }}/>
            </View>
            <View style={{
                flex: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View style={{
                    flexDirection: 'column',
                    marginTop: 15,
                }}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: colors.primaryHome,
                        marginBottom: 10
                    }}>{((item.title).length > 30) ? (((item.title).substring(0, 30 - 3)) + '...') : item.title}</Text>
                    <Text style={{
                        fontSize: 12,
                        fontWeight: 'normal',
                        color: colors.primary
                    }}>Chủ trọ: {item.user}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 15,
                }}>
                    <Icon
                        name={'eye'}
                        color= '#FACB49'
                        size={15}
                    />
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: colors.primary,
                        marginLeft: 5
                    }}>{item.view}</Text>
                </View>
            </View>
            <View style={{
                flex: 10,
                backgroundColor: "#eaeaea",
                borderRadius: 25,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon name={'clock-o'}
                          size={45}
                          color={colors.primary}
                    />
                    <Text style={{
                        color: colors.primaryHome,
                        fontWeight: 'bold',
                        fontSize: 15,
                    }}>{formatDate(item.created_at)}</Text>
                </View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon name={'home'}
                          size={45}
                          color={colors.primary}
                    />
                    <Text style={{
                        color: colors.primaryHome,
                        fontWeight: 'bold',
                        fontSize: 15,
                    }}>{item.area} m2</Text>
                </View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon name={'th'}
                          size={45}
                          color={colors.primary}
                    />
                    <Text style={{
                        color: colors.primaryHome,
                        fontWeight: 'bold',
                        fontSize: 15,
                    }}>{((item.category).length > 30) ? (((item.category).substring(0, 30 - 3)) + '...') : item.category}</Text>
                </View>
            </View>
            <View style={{
                flex: 20,
                flexDirection: 'column'
            }}>
                <Text style={{
                    color: colors.primaryHome,
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginBottom: 5
                }}>Address</Text>
                <Text style={{
                    color: colors.primary,
                    fontWeight: 'normal',
                    fontSize: 15,
                }}>{((item.address).length > 50) ? (((item.address).substring(0, 50 - 3)) + '...') : item.address}</Text>
                <Text style={{
                    color: colors.primaryHome,
                    fontWeight: 'bold',
                    fontSize: 25,
                    marginTop: 10,
                    marginBottom: 5
                }}>Details</Text>
                <Text style={{
                    color: colors.primary,
                    fontWeight: 'normal',
                    fontSize: 12,
                }}>{((item.description).length > 200) ? (((item.description).substring(0, 200 - 3)) + '...') : item.description}</Text>
            </View>
            <View style={{
                flex: 10,
                flexDirection: 'row-reverse',
                alignItems: 'center'
            }}>
                <TouchableOpacity>
                    <Text style={{
                        height: 60,
                        width: 195,
                        borderRadius: 50,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        backgroundColor: colors.primary,
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: colors.primaryHome
                    }}>Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DetailPost
