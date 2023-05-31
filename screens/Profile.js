import {Text, View} from "react-native";

function Profile(props) {

    const {token} = props.route.params

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text>
                This is profile
            </Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text>Token: </Text>
                <Text>{token}</Text>
            </View>
        </View>
    )
}

export default Profile
