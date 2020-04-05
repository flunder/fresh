import React, { useState, useEffect } from 'react'
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native'
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { Background, Gradient, StepInt } from '../'
import { Colors, basePrice } from '../../constants'
import { pageHeight } from '../Main'
import { VisaLogo } from '../Icon'
import { PaymentForm } from './'

const { width, height } = Dimensions.get('window');

function Payment({ price, scollToPage, pageOffsetY, ...props }) {

    const priceOffsetY = pageOffsetY.interpolate({
        inputRange: [0, pageHeight, pageHeight * 2],
        outputRange: [0, 0, 50],
    })

    const nozzlePullup = pageOffsetY.interpolate({
        inputRange: [0, pageHeight, pageHeight * 2],
        outputRange: [0, 0, -6],
    })

    const hideThingsForNewPage = pageOffsetY.interpolate({
        inputRange: [0, pageHeight, pageHeight * 2],
        outputRange: [1, 1, 0],
    })

    const formOffsetY = pageOffsetY.interpolate({
        inputRange: [0, pageHeight, pageHeight * 2],
        outputRange: [20, 20, -6],
    })

    return (
        <View style={{ top: -1, flex: 1 }}>

            {/* Fake Page Top */}

            <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.primary }}>
                <Animated.View style={{ bottom: -8, position: 'absolute', zIndex: 10, transform: [{ translateX: (width / 2) -15/2}, { translateY: nozzlePullup }] }}>
                    <Svg width={15} height={15} viewBox="0 0 15 15" >
                        <Path fill={Colors.primary} d="M7.071 0l7.071 7.071-7.07 7.071L0 7.071z" fillRule="evenodd" />
                    </Svg>
                </Animated.View>
                <Background width={width} height={height * 0.1} />
            </View>

            {/* Price Area */}

            <Animated.View style={{ alignItems: 'center', transform: [{ translateY: priceOffsetY }], marginBottom: height * 0.1 }}>

                <Animated.View style={{ opacity: 1, top: -10 }}>
                    <Svg width={11} height={6} viewBox="0 0 11 6">
                        <Path stroke={Colors.primary} strokeWidth={2} d="M1 5l4.5-4L10 5" fill={'none'} fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </Animated.View>

                <StepInt
                    price={price+basePrice}
                    style={{ fontSize: 40, paddingTop: 20, color: Colors.primary }}
                    currency={"W"}
                />
                <Animated.View style={{ opacity: hideThingsForNewPage, alignItems: 'center', }}>
                    <Svg width={77} height={1} viewBox="0 0 77 1" style={{ marginTop: 10 }}>
                        <Path stroke={Colors.primary} d="M1 .5h75" fill="none" fillRule="evenodd" strokeLinecap="square" />
                    </Svg>
                    <TouchableOpacity activeOpacity={0.85} onPress={() => { scollToPage(2) }}>
                        <Text style={{ marginTop: 10, fontSize: 17, color: Colors.primaryDarker, letterSpacing: -0.5 }}>PAY</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

            {/* Payment Details Form */}

            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ height: height * 0.7, width: '100%', position: 'absolute', bottom: 0 }}>
                    <Background width={width} height={height * 0.7 + 2} />
                </View>
                <PaymentForm formOffsetY={formOffsetY} />
            </View>

        </View>
    )
}

export { Payment }
