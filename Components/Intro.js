import React, { useState, useEffect } from 'react'
import { Animated, Dimensions, Image, Text, View } from 'react-native'
import { pageHeight } from './Main'
import { openingTimesTotalWidth } from './SlotSelect'

const { width } = Dimensions.get('window');
const imageWidth = 887;

function Intro(props) {

    const imageOffsetX = props.slotOffsetX.interpolate({
        inputRange: [0, openingTimesTotalWidth],
        outputRange: [0, -imageWidth + width],
    })

    return (
        <Animated.Image
            style={{ width: imageWidth, height: 195, position: 'absolute', bottom: -5, transform: [{ translateX: imageOffsetX }]  }}
            source={require('../assets/Images/Cityscape.png')}
        />
    )
}

export { Intro }
