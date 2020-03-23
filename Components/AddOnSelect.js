import React, { useState, useEffect } from 'react'
import { Animated, Text, View } from 'react-native'

function AddOnSelect(props) {

    // const [page, setPage] = useState(0);

    // useEffect(() => {
    // }, []);

    return (
        <Animated.View style={{ opacity: props.opacity }}>
            <Text>A fresh new Component. Make something nice of it.</Text>
        </Animated.View>
    )
}

export { AddOnSelect }
