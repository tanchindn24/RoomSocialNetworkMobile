import {Text, View} from "react-native";
import {colors} from "../constans";
import ItemPost from "../components/itemPost";

function ListPosts() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View style={{
                flex: 10,
                marginHorizontal: 10,
                marginTop: 20,
            }}>
                <Text style={{
                    color: colors.primaryHome,
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 3
                }}>MotelRoom Social</Text>
                <Text style={{
                    color: 'gray',
                    fontSize: 15,
                    fontWeight: 'normal'
                }}>List Post</Text>
            </View>
            <View style={{
                flex: 90,
            }}>
                <ItemPost/>
            </View>
        </View>
    )
}

export default ListPosts
