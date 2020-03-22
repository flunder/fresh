import React, { useState, useEffect, useRef } from 'react'
import { Animated, Dimensions, FlatList, Text, View } from 'react-native'
import { Page1, Page2 } from './'
import { Colors } from '../constants'
import { useLocation } from '../Hooks'
const { width, height } = Dimensions.get('window');

// Page height used for snap point and animations
export const pageHeight = height * 0.7;

export const pages = [
    { id: 1, backgroundColor: 'white', content: <Text>1</Text> },
    { id: 2, backgroundColor: Colors.primary, content: <Text>2</Text> },
    { id: 3, backgroundColor: 'white', content: <Text>3</Text> },
    { id: 4, backgroundColor: Colors.primary, content: <Text>4</Text> },
]

function Main(props) {

    const pageOffsetY = useRef(new Animated.Value(0)).current;

    const location = React.useMemo(() => useLocation(), []);

    useEffect(() => {
        addScrollListenerForDebug();
    }, []);

    const addScrollListenerForDebug = () => {
        // Listener already attached
        if (pageOffsetY._listeners[1]) return;

        pageOffsetY.addListener(({value}) => {
            console.log(value);
        });
    }

    const locationCountryOpacity = pageOffsetY.interpolate({
        inputRange: [0, pageHeight / 3, pageHeight],
        outputRange: [1, 1, 0],
    })

    const locationCityScale = pageOffsetY.interpolate({
        inputRange: [0, pageHeight / 3, pageHeight],
        outputRange: [1, 1, 0.5],
        extrapolate: 'clamp'
    })

    const locationCityOffsetY = pageOffsetY.interpolate({
        inputRange: [0, pageHeight / 3, pageHeight],
        outputRange: [0, 0, 9],
        extrapolate: 'clamp'
    })

    const locationFontColor = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [Colors.primaryDarker, 'white'],
    })

    const locationOffsetY = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [0, -(pageHeight*0.2)],
        extrapolate: 'clamp'
    })

    renderItem = ({ item, index }) => {
        return (
            <View style={{ height: pageHeight, width, backgroundColor: item.backgroundColor }}>
                {item.id === 1 && <Page1 />}
                {item.id === 2 && <Page2 />}
            </View>
        )
    }

    viewScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: pageOffsetY } } }]
    )

    console.log('rendering Main', location);

    return (
        <View>

            <Animated.View style={{ top: 0, left: 0, zIndex: 100, position: 'absolute', alignItems: 'center', width, top: 130, transform: [{ translateY: locationOffsetY }] }}>
                <Animated.Text style={{ color: locationFontColor, fontFamily: 'CircularStd-Black', lineHeight: 14,  textTransform: 'uppercase', opacity: locationCountryOpacity }}>{location.city}</Animated.Text>
                <Animated.Text style={{ color: locationFontColor, fontFamily: 'CircularStd-Black', fontSize: 28, lineHeight: 30,  textTransform: 'uppercase', transform: [{ scale: locationCityScale }, { translateY: locationCityOffsetY }] }}>{location.hood}</Animated.Text>
                <Animated.Text style={{ color: locationFontColor, fontFamily: 'CircularStd-Black', lineHeight: 14,  textTransform: 'uppercase' }}>{location.street}</Animated.Text>
            </Animated.View>

            <FlatList
                data={pages}
                keyExtractor={pages => `${pages.id}`}
                renderItem={renderItem}

                snapToAlignment="start"
                snapToInterval={pageHeight}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                onScroll={viewScroll}

                // onViewableItemsChanged={this.handleViewableItemsChanged}
                // viewabilityConfig={this.viewabilityConfig}
            />
        </View>
    )
}

export { Main }
