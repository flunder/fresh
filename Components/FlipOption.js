import React, { useState, useRef, useEffect } from 'react'
import { Animated, Text, TouchableOpacity, View } from 'react-native'

function FlipOption({ style, text, options, updateState, active, optionID }) {

    const [optionIndex, setOptionIndex] = useState(0);
    const offsetY = useRef(new Animated.Value(0)).current;
    const lineHeight = 17.5;

    onPress = () => {
        if (!active) return;
        if (!options) return;

        const currentValue = offsetY.__getValue();

        // Skip back to the first value at the end.
        // Adding 5 to offset the bounce effect causing issues
        const newValue = currentValue - lineHeight <= -(options.length * lineHeight) + 5 ? 0 : currentValue - lineHeight;
        const newOptionIndex = optionIndex >= options.length-1 ? 0 : optionIndex + 1;

        // Spring Animate the Value
        Animated.spring(offsetY, { toValue: newValue, tension: 70 }).start();

        // Hold on to the current Index
        setOptionIndex(newOptionIndex);

        // Update the state in the upper scope
        updateState({
            optionID,
            value: options[newOptionIndex]
        });
    }

    renderOptions = () => {
        if (!options) return <Text style={{...style, lineHeight: lineHeight }}>-</Text>;

        return options.map(o => (
            <Text key={o} style={{...style, lineHeight: lineHeight }}>
                {o}
            </Text>
        ))
    }

    return (
        <TouchableOpacity style={{ flex: 1, height: 18, overflow: 'hidden' }} activeOpacity={0.9} onPress={onPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Animated.View style={{ transform: [{ translateY: offsetY }]}}>
                {renderOptions()}
            </Animated.View>
        </TouchableOpacity>
    )
}

export { FlipOption }
