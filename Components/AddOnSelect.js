import React, { useState, useEffect } from 'react'
import { Animated, Dimensions, Text, View } from 'react-native'
import Svg, { Path } from "react-native-svg"
import { pageHeight } from './Main'
import { Colors } from '../constants'

const { width, height } = Dimensions.get('window');

const options = {
    set: {
        id: 1,
        selected: true,
        options: false,
        quantity: 1,
        title: "Shower Set",
        price: 2000,
    },
    toothbrush: {
        id: 2,
        selected: false,
        options: false,
        quantity: 1,
        title: "Toothbrush & Paste",
        price: 500,
    },
    shaving: {
        id: 3,
        selected: false,
        options: ['m', 'f'],
        quantity: 1,
        title: "Shaving Set",
        price: 1500,
    },
    bathTowel: {
        id: 4,
        selected: false,
        options: false,
        quantity: 1,
        title: "Bath Towel",
        price: 750,
    },
    additionalTowel: {
        id: 5,
        selected: true,
        options: false,
        quantity: 1,
        title: "Additional Towel",
        price: 500,
    },
    underwear: {
        id: 6,
        selected: false,
        options: ['m', 'f'],
        quantity: 1,
        title: "Cotton Underwear",
        price: 1750,
    },
}

function AddOnSelect(props) {

    // const [page, setPage] = useState(0);

    // useEffect(() => {
    // }, []);



    return (
        <View>
            <Animated.View style={{ borderBottomWidth: 1, borderBottomColor: Colors.primary, opacity: props.opacity, paddingHorizontal: 25, marginTop: -2, paddingBottom: height * 0.1 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={styles.text}></Text>
                    <Text style={[styles.text, styles.title]}></Text>
                    <Text style={[styles.text, styles.legend, styles.small]}>Option</Text>
                    <Text style={[styles.text, styles.legend, styles.small]}>Quantity</Text>
                </View>

                <View style={{ ...styles.borderTop }}>
                    {Object.keys(options).map(index => {
                        const option = options[index];

                        return (
                            <View key={option.id} style={{ flexDirection: 'row', paddingVertical: 11, ...styles.borderBottom, opacity: option.selected ? 1 : 0.5 }}>
                                <Text style={styles.text}>{option.selected ? "1" : "0"}</Text>
                                <Text style={[styles.text, styles.title]}>{option.title}</Text>
                                <Text style={[styles.text, styles.centered, styles.small]}>{option.options ? option.options[0] : "-"}</Text>
                                <Text style={[styles.text, styles.centered, styles.small]}>{option.selected && 1}</Text>
                            </View>
                        )

                    })}
                </View>

                <Svg width={15} height={15} viewBox="0 0 15 15" style={{ bottom: -8, position: 'absolute', zIndex: 10, transform: [{ translateX: (width / 2) -15/2}] }}>
                    <Path
                        fill={Colors.primary}
                        d="M7.071 0l7.071 7.071-7.07 7.071L0 7.071z"
                        fillRule="evenodd"
                    />
                </Svg>

            </Animated.View>

            <View style={{ backgroundColor: 'white', height: '100%', zIndex: '-1', alignItems: 'center' }}>
                <Text style={{ fontSize: 40, paddingTop: 20, color: Colors.primary }}>5008W</Text>
            </View>

        </View>
    )
}

const styles = {
    text: {
        color: 'white',
        fontFamily: 'CircularStd-Book',
        letterSpacing: -0.25
    },
    centered: {
        textAlign: 'center'
    },
    small: {
        flex: 0.3,
    },
    title: {
        flex: 1,
        paddingLeft: 15
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, .35)'
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, .35)'
    },
    legend: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center'
    },
}
export { AddOnSelect }
