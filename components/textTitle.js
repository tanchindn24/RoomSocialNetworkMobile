import {StyleSheet, Text, View} from "react-native";
import {colors} from "../constans";

function TextTitle({title}) {
    return (
        <View style={styles.viewTitle}>
            <Text style={styles.textTitleBody}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewTitle: {
        marginVertical: 10,
        backgroundColor: "#b2b0b0",
        paddingVertical: 12,
    },
    textTitleBody: {
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: colors.Secondary,
        marginHorizontal: 12
    },
})

export default TextTitle
