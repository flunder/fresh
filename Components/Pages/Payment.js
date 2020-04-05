import React, { useState, useEffect } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import Svg, { Path } from "react-native-svg"
import { Gradient } from '../'
import { Colors } from '../../constants'
import { StepInt } from '../'
import { basePrice } from '../../constants'

const { width, height } = Dimensions.get('window');

function Payment({ price, scollToPage, ...props }) {

    // const [page, setPage] = useState(0);

    // useEffect(() => {
    // }, []);

    return (
        <View style={{ top: -1 }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.primary }}>
                <Svg width={15} height={15} viewBox="0 0 15 15" style={{ bottom: -8, position: 'absolute', zIndex: 10, transform: [{ translateX: (width / 2) -15/2}] }}>
                    <Path
                        fill={Colors.primary}
                        d="M7.071 0l7.071 7.071-7.07 7.071L0 7.071z"
                        fillRule="evenodd"
                    />
                </Svg>
                <Gradient
                    width={width}
                    height={height * 0.1}
                    color1="#5072F8"
                    color2="#4C51F7"
                    opacity1={1}
                    opacity2={2}
                    direction="normal"
                />
            </View>

            <View style={{ alignItems: 'center' }}>
                <StepInt
                    price={price+basePrice}
                    style={{ fontSize: 40, paddingTop: 20, color: Colors.primary }}
                    currency={"W"}
                />
                <Svg width={77} height={1} viewBox="0 0 77 1" style={{ marginTop: 10 }}>
                    <Path stroke={Colors.primary} d="M1 .5h75" fill="none" fillRule="evenodd" strokeLinecap="square" />
                </Svg>
                <TouchableOpacity activeOpacity={0.85} onPress={() => { scollToPage(2) }}>
                    <Text style={{ marginTop: 10, fontSize: 17, color: Colors.primaryDarker, letterSpacing: -0.5 }}>PAY</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export { Payment }
