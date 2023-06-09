import {
    ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import {colors} from "../../constans";
import Icon from "react-native-vector-icons/FontAwesome";
import TextTitle from "../../components/textTitle";
import InputField from "../../components/inputField";
import {openPicker} from '@baronha/react-native-multiple-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageGrid from "@baronha/react-native-image-grid";
import {useEffect, useState} from "react";
import {getApi} from "../../routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import axios from "axios";

function StorePost(props) {

    const {navigation, route} = props
    const {itemCategory} = route.params

    const host = `${getApi.host}:${getApi.port}`;
    const api = '/api';
    const endPointStoreData = '/post-store-data';

    const handleExit = () => {
        Alert.alert('Thông báo!', 'Bạn muốn hủy tin đăng?', [{
            text: 'Thoát',
            onPress: () => navigation.reset({index: 0, routes: [{name: 'Home'}]})
        }, {text: 'Tiếp tục', style: 'cancel'}])
    }

    const [userToken, setUserToken] = useState(null);
    const [address, setAddress] = useState(null);
    const [images, setImages] = useState([]);
    const [area, setArea] = useState(null);
    const [price, setPrice] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getUserToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
            return userToken;
        } catch (error) {
            console.log('Error retrieving token: ' + error);
        }
    };

    const selectFile = () => {
        const options = {
            mediaType: 'photo',
            multiple: true,
            selectionLimit: 4,
            includeBase64: true,
        };

        launchImageLibrary(options, (response) => {
            console.log(response.assets)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets) {
                setImages(response.assets);
            }
        }).then(r => {});
    };

    const onPressImage = (item, index) => {
        console.log(item, index);
    };

    const onPicker = async () => {
        try {

            const response = await openPicker({
                singleSelectedMode: false,
                selectedAssets: images,
                mediaType: 'image',
                maxSelectedAssets: 4,
                doneTitle: 'Xong',
                isCrop: true,
                numberOfColumn: 3,
                isPreview: true,
            });
            console.log(response)

            // const crop = response.crop;
            //
            // if (crop) {
            //     response.path = crop.path;
            //     response.width = crop.width;
            //     response.height = crop.height;
            // }

            setImages(response);
        } catch (e) {
        }
    };

    // const convertDataToImages = (data) => {
    //     return data.map((item) => {
    //         const imagePath = item.crop ? item.crop.path : item.realPath;
    //         return {
    //             ...item, path: imagePath,
    //         };
    //     });
    // };

    //const convertedImages = convertDataToImages(images);

    const validate = () => {
        if (!address || !images.length || !area || !title || !description) {
            Alert.alert('Error', 'Vui lòng nhập đầy đủ thông tin');
            return false;
        }
        return true;
    };

    // useEffect(() => {
    //     console.log(imagesUrl);
    // }, [imagesUrl]);

    const uploadImages = async () => {
        try {
            const uploadPromises = images.map(async (image, index) => {
                const imageName = `IMAGE${index + 1}_${Date.now()}.${image.fileName.split('.').pop()}`;
                const response = await fetch(image.uri);
                const blob = await response.blob();
                const ref = storage().ref('/provider/posts/images').child(imageName);
                await ref.put(blob);
                return ref.getDownloadURL();
            });
            console.log('vao 2')
            return Promise.all(uploadPromises);
            // const downloadURLs = await Promise.all(uploadPromises);
            // await setImagesUrl(downloadURLs);
        } catch (error) {
            console.error(error);
            setImages([]);
        }
    };

    const postStore = async () => {
        setIsLoading(true)
        if (true) {
            const token = await getUserToken();
            const headers = {
                Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data',
            };

            try {
                console.log('vao 1')
                const downloadURLs = await uploadImages();
                console.log('vao 3')
                setImages([]);
                console.log('vao 4')
                const formData = new FormData();
                formData.append('category_id', itemCategory.id);
                formData.append('address', address);
                formData.append('price', price);
                formData.append('area', area);
                formData.append('title', title);
                formData.append('description', description);
                console.log('vao 5')
                if (downloadURLs.length > 0) {
                    console.log('vao 6')
                    downloadURLs.forEach((item)=>formData.append('images[]', item))
                }
                console.log('vao 7')
                console.log(formData)
                try {
                    const response = await axios.post(host + api + endPointStoreData, formData, {headers});
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
                        <Text style={styles.textTitleTop}> Đăng tin </Text>
                        <TouchableOpacity onPress={() => handleExit()}>
                            <Icon name={'remove'} size={25}/>
                        </TouchableOpacity>
                    </View>
                    <TextTitle title={`Danh mục: ${itemCategory.name}`}/>
                    <TextTitle title={'Địa chỉ và Hình ảnh'}/>
                    <View style={styles.containerForm}>
                        <InputField label={'Địa chỉ...'} icon={'map'} valueInput={address} onChange={setAddress}
                                    inputType={'text'}/>
                        <View style={styles.containerImages}>
                            <TouchableOpacity style={styles.formImage} onPress={selectFile}>
                                <Icon name={'camera'} size={65}/>
                                <Text>Chọn 1 - 4 ảnh</Text>
                            </TouchableOpacity>
                            <ImageGrid
                                dataImage={images}
                                //dataImage={Array.isArray(images) ? images : [images]}
                                onPressImage={onPressImage}
                                spaceSize={10}
                                containerStyle={{marginLeft: 13}}
                                width={130}
                                sourceKey={'uri'}
                                //videoKey={'type'}
                                prefixPath={'file://'}
                                //conditionCheckVideo={'video'}
                                //videoURLKey={'thumbnail'}
                            />
                        </View>
                    </View>
                    <TextTitle title={'Diện tích và Giá thuê'}/>
                    <View style={styles.containerForm}>
                        <InputField label={'Diện tích (m2)'} icon={'square'} valueInput={area} onChange={setArea}
                                    inputType={'number'}/>
                        <InputField label={'Giá thuê (VNĐ)'} icon={'square'} valueInput={price} onChange={setPrice}
                                    inputType={'number'}/>
                    </View>
                    <TextTitle title={'Tiêu đề và Mô tả'}/>
                    <View style={styles.containerForm}>
                        <InputField label={'Tiêu đề'} icon={'font'} valueInput={title} onChange={setTitle}
                                    inputType={'text'}/>
                        <InputField label={'Mô tả'} icon={'reorder'} valueInput={description}
                                    onChange={setDescription} inputType={'text'}/>
                    </View>
                </View>
            </SafeAreaView>
            <TextTitle title={'Đăng tin'}/>
            <View style={styles.containerFormBtn}>
                <TouchableOpacity onPress={postStore}
                                  style={{
                                      backgroundColor: colors.primary, padding: 20, borderRadius: 10, marginBottom: 30
                                  }}>
                    <Text style={{
                        textAlign: 'center', fontWeight: '700', fontSize: 20, color: 'white'
                    }}>Đăng</Text>
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
        backgroundColor: "#b2b0b0",
        borderColor: colors.primary,
        borderWidth: 2,
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'row',
    }, formImage: {
        justifyContent: 'center', alignItems: 'center',
    }, containerFormBtn: {
        marginHorizontal: 12,
    }, overlay: {
        ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)', opacity: 0.8, justifyContent: 'center',
    },
})

export default StorePost
