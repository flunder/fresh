import React from 'react'
import { Animated, View } from 'react-native'
import Svg, { Path } from "react-native-svg"

const Checkbox = ({ isActive, tickOpacity }) => (
    <View style={{ width: 15, height: 15, borderRadius: 2, backgroundColor: 'white', borderWidth: 1, borderColor: 'rgba(150, 150, 150, .5)', alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={{ opacity: tickOpacity, left: 0.5 }}>
            <Svg width={10} height={8} viewBox="0 0 10 8">
                <Path
                    fill="#4F65F8"
                    fillRule="nonzero"
                    d="M8.114 0L3.6 4.627 1.486 2.622 0 4.11 3.6 7.6l6-6.114z"
                />
            </Svg>
        </Animated.View>
    </View>
)

export { Checkbox }
