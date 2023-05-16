import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {images} from "../constans/index";
import {useEffect, useState} from "react";
import axios from "axios";
import {getApi} from "../routes/index";

function categoryPost() {

    const [categories, setCategories] = useState(null)

    const host = `${getApi.host}:${getApi.port}`;
    const api = '/api';
    const getCategory = '/category';

    useEffect(() => {
        axios.get(host + api + getCategory)
            .then((response) => {
                setCategories(response.data.category)
            }).catch(error => {
            console.log(error)
        });
    }, []);


    if (!categories) {
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

    return (<View style={{
        flex: 1, backgroundColor: 'while'
    }}>
        <FlatList style={{
            flex: 1
        }}
                  keyExtractor={item => item.name}
                  horizontal={true}
                  data={categories}
                  renderItem={({item}) => {
                      return (<TouchableOpacity
                          onPress={() => {
                              alert(`opening ${item.name}...`)
                          }}
                      >
                          <View style={{
                              flex: 1,
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 5
                          }}>
                              <Image style={{
                                  width: 60, height: 60, resizeMode: 'cover', borderRadius: 20, margin: 5
                              }} source={images.categoryPost}/>
                              <Text style={{
                                  fontSize: 15, textAlign: 'center',
                              }}>
                                  {((item.name).length > 10) ? (((item.name).substring(0, 10 - 3)) + '...') : item.name}
                              </Text>
                          </View>
                      </TouchableOpacity>)
                  }}></FlatList>
    </View>)
}

export default categoryPost
