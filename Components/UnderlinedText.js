import React, { useState, useRef, useEffect } from 'react'
import { Text, View } from 'react-native'
import { Colors } from '../constants'

const underlineExtraWidth = 3;

function UnderlinedText({ offset = 0, color = Colors.primary, ...props }) {

    const textWrapRef = useRef(false);
    const [width, setWidth] = useState(false);

    useEffect(() => {
        measure()
    }, [])

    measure = async () => {
        await nextFrameAsync();
        const fullWidth = await measureAsync(textWrapRef);
        setWidth(Math.floor(fullWidth))
    }

    return (
        <>
            <View ref={textWrapRef}>
                {props.children}
            </View>
            <View
                style={{
                    left: -(underlineExtraWidth / 2) + offset,
                    right: -(underlineExtraWidth / 2),
                    width: width + underlineExtraWidth,
                    height: 3,
                    bottom: 0,
                    backgroundColor: color,
                    zIndex: -1,
                    borderRadius: 3 ,
                }}
            />
        </>
    );
}

function measureAsync(component) {
    return new Promise(resolve => {
        component.current.measure((x, y, w, h) => {
            resolve(w);
        });
    });
}

function nextFrameAsync() {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

export { UnderlinedText }
