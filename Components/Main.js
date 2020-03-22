import React, { useState, useEffect } from 'react'
import { Animated, Dimensions, FlatList, Text, View } from 'react-native'
import { Colors } from '../constants'
const { width, height } = Dimensions.get('window');

export const pageHeight = height * 0.7;

export const pages = [
    { id: 1, backgroundColor: 'white' },
    { id: 2, backgroundColor: Colors.primary },
    { id: 3, backgroundColor: 'white' },
    { id: 4, backgroundColor: Colors.primary },
]

function Main(props) {

    const [pageOffsetY, setPageOffsetY] = useState(new Animated.Value(0));

    // useEffect(() => {
    // }, []);

    const locationCountryOpacity = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [1, 0],
    })

    const locationCityScale = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [1, 0.5],
    })

    const locationCityOffsetY = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [0, 15],
    })

    const locationFontColor = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [Colors.primaryDarker, 'white'],
    })

    const locationOffsetY = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [0, -(pageHeight*0.2)],
    })

    renderItem = ({ item }) => {
        return (
            <View style={{ height: pageHeight, width, backgroundColor: item.backgroundColor, borderSize: 1 }} />
        )
    }

    viewScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: pageOffsetY } } }]
    )

    pageOffsetY.addListener(({value}) => {
        console.log(value);
    });

    console.log('rendering Main');

    return (
        <View>

            <Animated.View style={{ top: 0, left: 0, zIndex: 100, position: 'absolute', alignItems: 'center', width, top: 130, transform: [{ translateY: locationOffsetY }] }}>
                <Animated.Text style={{ color: locationFontColor, fontWeight: '700', lineHeight: 14, opacity: locationCountryOpacity }}>SEONGBUK, SEOUL</Animated.Text>
                <Animated.Text style={{ color: locationFontColor, fontWeight: '700', fontSize: 28, lineHeight: 30, transform: [{ scale: locationCityScale }, { translateY: locationCityOffsetY }] }}>DONGSUN</Animated.Text>
                <Animated.Text style={{ color: locationFontColor, fontWeight: '700', lineHeight: 14 }}>SUNGSHIN W.UNIV</Animated.Text>
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
