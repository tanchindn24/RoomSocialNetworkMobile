import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../constans";
import TextTitle from "../../components/textTitle";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from "react";
import {getApi} from "../../routes";
import axios from "axios";

function LoadCategories(props) {

    const {navigation,} = props
    const {navigate,} = navigation

    const [itemCategories, setItemCategories] = useState(null)

    const host = `${getApi.host}:${getApi.port}`;
    const api = '/api';
    const getCategory = '/category';

    useEffect(() => {
        axios.get(host + api + getCategory)
            .then((response) => {
                setItemCategories(response.data.category)
            }).catch(error => {
            console.log(error)
        });
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerViewTop}>
                <View style={styles.viewTitleTop}>
                    <View/>
                    <Text style={styles.textTitleTop}> Post Store </Text>
                    <TouchableOpacity onPress={()=>navigate('Home')}>
                        <Icon name={'remove'} size={25}/>
                    </TouchableOpacity>
                </View>
                <TextTitle title={'chose category'}/>
                {itemCategories === null ? (
                    <View style={{
                        flex: 1, backgroundColor: 'while',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator size={"large"}/>
                    </View>
                ) : (
                    <View style={styles.containerData}>
                        {itemCategories.map((item)=> (
                            <TouchableOpacity key={item.id} style={styles.btnSelectItem}
                                              onPress={()=> navigate('UploadPost', {itemCategory: item})}
                            >
                                <Text style={styles.textItemData}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Secondary,
        justifyContent: 'center'
    },
    containerViewTop: {
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        backgroundColor: 'white',
        flex: 1,
    },
    viewTitleTop: {
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        flexDirection: 'row-reverse'
    },
    textTitleTop: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18
    },
    containerData: {
        marginHorizontal: 15,
        marginTop: 2,
        flex: 1,
    },
    textItemData: {
        marginVertical: 5,
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15
    },
    btnSelectItem: {
        borderBottomWidth: 1,
        borderBottomColor: colors.Secondary,
        marginVertical: 2,
    }
})

export default LoadCategories
