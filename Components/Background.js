import React, { useState, useEffect } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { Gradient } from '.'
import { Colors } from '../constants'

function Background({ width = Dimensions.get('window').width, height = 200, ...props }) {
    return (
        <Gradient
            width={width}
            height={height}
            color1={Colors.backgroundGradient[0]}
            color2={Colors.backgroundGradient[1]}
            opacity1={1}
            opacity2={2}
            direction="normal"
            {...props}
        />
    )
}

export { Background }
