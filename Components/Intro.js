import React, { useState, useEffect, useRef } from 'react'
import { Animated, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import Svg, { G, Path } from "react-native-svg"
import { pageHeight } from './Main'
import { openingTimesTotalWidth } from './SlotSelect'
import { Cog, Note, ShowerTruckLogo, Bubble } from './Icon'

const { width } = Dimensions.get('window');
const imageWidth = 887;

const CityImage = require('../assets/Images/CityScapeLarge.png');
const CityImageMeta = Image.resolveAssetSource(CityImage)

function Intro(props) {

    const cloudMovement = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animateClouds();
    })

    const imageOffsetX = props.slotOffsetX.interpolate({
        inputRange: [0, openingTimesTotalWidth],
        outputRange: [0, -CityImageMeta.width/2 + width],
    })

    const cloudOffsetX = props.slotOffsetX.interpolate({
        inputRange: [0, openingTimesTotalWidth],
        outputRange: [0, -CityImageMeta.width/3 + width],
    })

    animateClouds = () => {
        Animated.sequence([
            Animated.timing(cloudMovement, { toValue: 20, duration: 5000 }),
            Animated.timing(cloudMovement, { toValue: 0, duration: 5000 })
        ]).start(() => {
            animateClouds()
        });
    }

    return (
        <View style={{ position: 'absolute', top: 0, height: '100%', width: '100%' }}>

            <View style={{ alignItems: 'center', flexDirection: 'row', padding: 25, paddingTop: 40, justifyContent: 'space-between', width: '100%' }}>
                <TouchableOpacity activeOpacity={0.85}>
                    <Cog />
                </TouchableOpacity>
                <ShowerTruckLogo />
                <TouchableOpacity activeOpacity={0.85}>
                    <Note />
                </TouchableOpacity>
            </View>

            <View>
                <Bubble style={{ position: 'absolute', right: 30, top: 10 }} />
                <Bubble style={{ position: 'absolute', left: width / 2 - 10, top: 140 }} scale={0.7} />
                <Bubble style={{ position: 'absolute', left: 40, top: 90 }} scale={0.5} />
            </View>

            <View style={{ height: 195, position: 'absolute', bottom: 6 }}>
                <Animated.View style={{ transform: [{ translateX: cloudOffsetX }] }}>
                    <Animated.View style={{ transform: [{ translateX: cloudMovement }] }}>
                        <Svg width={1543} height={82} viewBox="0 0 1543 82" {...props} style={{ position: 'absolute', top: 50, left: 56, opacity: 0.8 }}>
                            <G fill="none" fillRule="evenodd">
                                <G stroke="#4B57EE" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} >
                                    <Path d="M1494 49.5h32.5M1482 49.5h4M1482 34.5h49.5M1470 34.5h4M1509 27.5h32.5M1497 27.5h4M1502 65.5h4M1500 42.5h19.697M1493 42.5h2" />
                                    <Path d="M1306 13.5h49.5M1294 13.5h4M1280 6.5h32.5M1268 6.5h4M1360 22.5h19.697M1353 22.5h2" />
                                    <Path d="M1282 80.5h49.5M1270 80.5h4M1271 75.5h19.697M1264 75.5h2" />
                                    <Path d="M1024 8.5h49.5M1051 1.5h32.5M1004 16.5h19.697M1012 8.5h4M1039 1.5h4M997 16.5h2" />
                                    <Path d="M861 48.5h49.5M849 48.5h4M838 41.5h32.5M826 41.5h4M829 54.5h19.697M822 54.5h2" />
                                    <Path d="M674 49.5h32.5M662 49.5h4M662 34.5h49.5M650 34.5h4M689 27.5h32.5M677 27.5h4M682 65.5h4M680 42.5h19.697M673 42.5h2" />
                                    <Path d="M486 13.5h49.5M474 13.5h4M460 6.5h32.5M448 6.5h4M540 22.5h19.697M533 22.5h2" />
                                    <Path d="M462 80.5h49.5M450 80.5h4M451 75.5h19.697M444 75.5h2" />
                                    <Path d="M204 8.5h49.5M231 1.5h32.5M184 16.5h19.697M192 8.5h4M219 1.5h4M177 16.5h2" />
                                    <Path d="M41 48.5h49.5M29 48.5h4M18 41.5h32.5M6 41.5h4M9 54.5h19.697M2 54.5h2" />
                                </G>
                            </G>
                        </Svg>
                    </Animated.View>
                </Animated.View>
                <Animated.Image
                    style={{ width: CityImageMeta.width / 2, height: CityImageMeta.height / 2, transform: [{ translateX: imageOffsetX }]  }}
                    source={CityImage}
                />
            </View>
        </View>
    )
}

export { Intro }
