import React, { useState, useRef, useEffect } from 'react'
import { Animated } from 'react-native'

function useCardAnimation(selectedCard) {

    // Selected Card Animation
    const visaCardWrapOpacity = useRef(new Animated.Value(1)).current;
    const visaOpacity = useRef(new Animated.Value(0)).current;
    const visaOpacityReversed = useRef(visaOpacity.interpolate({inputRange: [0, 1], outputRange: [1, 0]})).current;
    const visaOffsetX = useRef(new Animated.Value(0)).current;
    const masterCardWrapOpacity = useRef(new Animated.Value(1)).current;
    const masterCardOpacity = useRef(new Animated.Value(0)).current;
    const masterCardOpacityReversed = useRef(masterCardOpacity.interpolate({inputRange: [0, 1], outputRange: [1, 0]})).current;

    useEffect(() => {
        if (selectedCard == "") return;
        animateCreditCards();
    }, [selectedCard])

    const animateCreditCards = () => {
        if (selectedCard === 'visa') {
            Animated.parallel([
                // Reset
                Animated.spring(visaCardWrapOpacity, { toValue: 1 }),
                Animated.spring(masterCardOpacity, { toValue: 0 }),
                // Animate
                Animated.spring(visaOpacity, { toValue: 1 }),
                Animated.spring(visaOffsetX, { toValue: 50 }),
                Animated.spring(masterCardWrapOpacity, { toValue: 0 }),
            ]).start();
        } else if (selectedCard === 'mastercard') {
            Animated.parallel([
                // Reset
                Animated.spring(visaCardWrapOpacity, { toValue: 0 }),
                Animated.spring(masterCardOpacity, { toValue: 1 }),
                // Animate
                Animated.spring(visaOpacity, { toValue: 0 }),
                Animated.spring(visaOffsetX, { toValue: 0 }),
                Animated.spring(masterCardWrapOpacity, { toValue: 1 }),
            ]).start();
        } else {
            Animated.parallel([
                // Reset All
                Animated.spring(visaCardWrapOpacity, { toValue: 1 }),
                Animated.spring(masterCardOpacity, { toValue: 0 }),
                Animated.spring(visaOpacity, { toValue: 0 }),
                Animated.spring(visaOffsetX, { toValue: 0 }),
                Animated.spring(masterCardWrapOpacity, { toValue: 1 }),
            ]).start();
        }
    }

    return {
        visaCardWrapOpacity,
        visaOpacity,
        visaOpacityReversed,
        visaOffsetX,
        masterCardWrapOpacity,
        masterCardOpacity,
        masterCardOpacityReversed
    }
}

export { useCardAnimation }
