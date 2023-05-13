import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {images} from "../constans/index";
import {useState} from "react";

function categoryPost() {

    const [categories, setCategories] = useState([{
        name: 'Cho Thuê', image: images.categoryPost,
    }, {
        name: 'Ở Ghép', image: images.categoryPost,
    }, {
        name: 'Nhà Nguyên Căn', image: images.categoryPost,
    }, {
        name: 'Chung Cư', image: images.categoryPost,
    }, {
        name: 'Cho thuê căn hộ', image: images.categoryPost,
    }, {
        name: 'Cho thuê căn hộ mini', image: images.categoryPost,
    }, {
        name: 'Cho thuê căn hộ dịch vụ', image: images.categoryPost,
    }])

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
                              }} source={item.image}/>
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
