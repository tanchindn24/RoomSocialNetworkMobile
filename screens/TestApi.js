import {SafeAreaView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import axios from "axios";

const callApi  = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({data: "Data"})
        }, 3000)
    })
}

const getData = async (setData) => {
    let data = await callApi()
    setData(data)
}

function TestApi() {

    const callUrl = () => {
        console.log('calling GET api...')
        axios.get('http://192.168.1.5:2023/api/posts')
            .then((response) => {
                setResponse(JSON.stringify(response.data.posts))
            }).catch(error => {
                console.log(error);
        })
    }

    const [data, setData] = useState({data: null})
    const [response, setResponse] = useState(null)

    useEffect(() => {
        getData(setData).then(r => {
            console.log(r)
        })
    })
    useEffect(() => {}, [data])

    return (
        <SafeAreaView style={{flex: 1}}>
            <View stye={{
                height: '8%',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View></View>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 30,
                }}>TEST API</Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <TouchableOpacity style={styles.button}
                                  onPress={()=>{
                                      callUrl()
                                  }}
                >
                    <Text>GET</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text>POST</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text>GET WITH ID</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text>QUERY</Text>
                </TouchableOpacity>
            </View>
            <Text style={{
                fontSize: 15,
                borderWidth: 1,
                borderRadius: 5,
                height: 500,
                margin: 20,
                padding: 10,
            }}
                  numberOfLines={0}
            >{response}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 90,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
    }
})

export default TestApi
