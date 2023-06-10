import {
    ActivityIndicator, Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import TextTitle from "../../components/textTitle";
import InputField from "../../components/inputField";
import {colors} from "../../constans";
import {useState} from "react";
import axios from "axios";
import {getApi} from "../../routes";

function UpdatePost(props) {

    const {navigation,route} = props
    const {params} = route
    const item = params.itemPost
    const userToken = params.userToken

    const host = `${getApi.host}:${getApi.port}`;
    const api = '/api';
    const updatePostEndPoint = '/update-post';

    const convertJsonImages = JSON.parse(item.image);

    const [address, setAddress] = useState(item.address);
    const [area, setArea] = useState(item.area);
    const [price, setPrice] = useState(item.price);
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [isLoading, setIsLoading] = useState(false);

    const handleExit = () => {
        Alert.alert('Thông báo!', `Bạn muốn hủy sửa tin\n ${item.title}?`, [{
            text: 'Thoát',
            onPress: () => navigation.reset({index: 0, routes: [{name: 'Home'}]})
        }, {text: 'Tiếp tục', style: 'cancel'}])
    }

    // const convertToNumber = (text) => {
    //     if (!isNaN(text)) {
    //         return parseInt(text);
    //     }
    //     return null;
    // };

    // const handleNumberOnChange = (text) => {
    //     const numberValue = convertToNumber(text)
    //     if (numberValue != null) {
    //         setPrice(numberValue)
    //         setArea(numberValue)
    //     }
    // }

    const validate = () => {
        if (!address || !price || !area || !title || !description) {
            Alert.alert('Error', 'Vui lòng nhập đầy đủ thông tin');
            return false;
        }
        return true;
    };

    const postUpdate = async () => {
        console.log('vao')
        setIsLoading(true)
        if (validate) {
            //const token = await getUserToken();
            const headers = {
                Authorization: `Bearer ${userToken}`, 'Content-Type': 'multipart/form-data',
            };

            try {
                const formData = new FormData();
                formData.append('address', address);
                formData.append('price', Number(price));
                formData.append('area', Number(area));
                formData.append('title', title);
                formData.append('description', description);
                console.log(formData)
                try {
                    const response = await axios.post(host + api + updatePostEndPoint + `/${item.id}`, formData, {headers});
                    console.log(response.data)
                    setIsLoading(false)
                    navigation.reset({index: 0, routes: [{name: 'Profile'}]})
                } catch (error) {
                    console.error(error);
                    setIsLoading(false)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (<ScrollView style={{
        position: 'relative'
    }}>
        <SafeAreaView style={styles.container}>
            <View style={styles.containerViewTop}>
                <View style={styles.viewTitleTop}>
                    <View/>
                    <Text style={styles.textTitleTop}> Sửa tin: {((item.title).length > 30) ? (((item.title).substring(0, 30 - 3)) + '...') : item.title} </Text>
                    <TouchableOpacity onPress={() => handleExit()}>
                        <Icon name={'remove'} size={25}/>
                    </TouchableOpacity>
                </View>
                <TextTitle title={`Danh mục: ${item.category}`}/>
                <TextTitle title={'Địa chỉ và Hình ảnh'}/>
                <View style={styles.containerForm}>
                    <InputField label={'Địa chỉ...'} icon={'map'} valueInput={address} onChange={setAddress}
                                inputType={'text'}/>
                    <View style={styles.containerImages}>
                        <Image style={{width: 200, height: 200}} source={{uri: convertJsonImages[0]}}/>
                    </View>
                </View>
                <TextTitle title={'Diện tích và Giá thuê'}/>
                <View style={styles.containerForm}>
                    <InputField label={'Diện tích (m2)'} icon={'square'} valueInput={area.toString()} onChange={setArea}
                                keyboardType={'numeric'}/>
                    <InputField label={'Giá thuê (VNĐ)'} icon={'dollar'} valueInput={price.toString()} onChange={setPrice}
                                keyboardType={'numeric'}/>
                </View>
                <TextTitle title={'Tiêu đề và Mô tả'}/>
                <View style={styles.containerForm}>
                    <InputField label={'Tiêu đề'} icon={'font'} valueInput={title} onChange={setTitle}
                                inputType={'text'}/>
                    <InputField label={'Mô tả'} icon={'reorder'} valueInput={description}
                                onChange={setDescription} inputType={'description'}/>
                </View>
            </View>
        </SafeAreaView>
        <TextTitle title={'Đăng tin'}/>
        <View style={styles.containerFormBtn}>
            <TouchableOpacity onPress={postUpdate}
                              style={{
                                  backgroundColor: colors.primary, padding: 20, borderRadius: 10, marginBottom: 30
                              }}>
                <Text style={{
                    textAlign: 'center', fontWeight: '700', fontSize: 20, color: 'white'
                }}>Thay đổi</Text>
            </TouchableOpacity>
        </View>
        {isLoading === true ? (<View style={styles.overlay}>
            <ActivityIndicator size={"large"}/>
        </View>) : null}
    </ScrollView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.primary, justifyContent: 'center',
    }, containerViewTop: {
        backgroundColor: 'white', flex: 1,
    }, viewTitleTop: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 15,
        flexDirection: 'row'
    }, textTitleTop: {
        color: '#000', fontWeight: 'bold', fontSize: 18
    }, containerForm: {
        marginTop: 2, marginHorizontal: 3,
    }, containerImages: {
        //backgroundColor: "#b2b0b0",
        borderColor: colors.primary,
        borderWidth: 1,
        padding: 5,
        justifyContent: 'center',
        flexDirection: 'row',
    }, containerFormBtn: {
        marginHorizontal: 12,
    }, overlay: {
        ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)', opacity: 0.8, justifyContent: 'center',
    },
})

export default UpdatePost
