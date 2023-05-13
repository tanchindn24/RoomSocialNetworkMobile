import {Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View} from "react-native";
import {colors, images} from "../constans/index";
import {useState} from "react";

const slideImages = [
    images.slideHome,
    images.slideHome,
    images.slideHome,
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function slideHome() {

    const [imgActive, setImgActive] = useState(0);

    onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if (slide !== imgActive) {
                setImgActive(slide)
            }
        }
    }


    return (
        <View style={[styles.elevationLow, {flex: 1}]}>
            <ScrollView
                onScroll={({nativeEvent}) => onchange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.wrap}
            >
                {
                    slideImages.map((e, index) =>
                        <Image source={images.slideHome}
                               key={index}
                               resizeMode='cover'
                               style={styles.wrap}
                        />
                    )
                }
            </ScrollView>
            <View style={styles.wrapDot}>
                {
                    slideImages.map((e, index) =>
                        <Text style={imgActive === index ? styles.dotActive : styles.dot}
                              key={index}>●</Text>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.25
    },
    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    dotActive: {
        margin: 3,
        color: 'black'
    },
    dot: {
        margin: 3,
        color: 'gray'
    },
    elevationLow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
})

export default slideHome
