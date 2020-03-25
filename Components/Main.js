import React, { useState, useEffect, useRef, useMemo  } from 'react'
import { Animated, Dimensions, FlatList, Text, View } from 'react-native'
import Svg, { Path } from "react-native-svg"
import { Intro, SlotSelect, AddOnSelect, Gradient } from './'
import { Colors } from '../constants'
import { useLocation } from '../Hooks'
import { openingTimes } from './SlotSelect'
import { padNumber } from '../helpers'

const { width, height } = Dimensions.get('window');

// Page height used for snap point and animations
export const pageHeight = height * 0.7;

export const pages = [
    { id: 1, backgroundColor: 'white' },
    { id: 2, backgroundColor: Colors.primary },
    { id: 3, backgroundColor: 'white' },
    { id: 4, backgroundColor: Colors.primary },
]

function Main(props) {

    const pageOffsetY = useRef(new Animated.Value(0)).current;
    const slotOffsetX = useRef(new Animated.Value(0)).current;
    const location = React.useMemo(() => useLocation(), []);

    useEffect(() => {
        // addScrollListenerForDebug();
    }, []);

    const addScrollListenerForDebug = () => {
        // Listener already attached
        if (pageOffsetY._listeners[1]) return;

        pageOffsetY.addListener(({value}) => {
            console.log(value);
        });
    }

    const locationCountryOpacity = pageOffsetY.interpolate({
        inputRange: [0, pageHeight / 3, pageHeight / 1.1],
        outputRange: [1, 1, 0],
    })

    const locationCityScale = pageOffsetY.interpolate({
        inputRange: [0, pageHeight / 3, pageHeight],
        outputRange: [1, 1, 0.5],
        extrapolate: 'clamp'
    })

    const locationCityOffsetY = pageOffsetY.interpolate({
        inputRange: [0, pageHeight / 3, pageHeight],
        outputRange: [0, 0, 13],
        extrapolate: 'clamp'
    })

    const locationLetterSpacing = pageOffsetY.interpolate({
        inputRange: [0, 100, pageHeight],
        outputRange: [-1.5, 0, 0],
    })

    const locationFontColor = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [Colors.primaryDarker, 'white'],
    })

    const locationOffsetY = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [0, -(pageHeight*0.24)],
        extrapolate: 'clamp'
    })

    const slotSelectOpacity = pageOffsetY.interpolate({
        inputRange: [0, pageHeight / 1.5],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    const addOnSelectOpacity = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [0.3, 1],
        extrapolate: 'clamp'
    })

    const pullUpOpacity = pageOffsetY.interpolate({
        inputRange: [0, pageHeight-50, pageHeight],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
    })

    const pullUpOffsetY = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [-200, -10],
        extrapolate: 'clamp'
    })

    const openingTimesColor = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: ['#111', '#FFF'],
        extrapolate: 'clamp'
    })

    const openingTimesLineColor = pageOffsetY.interpolate({
        inputRange: [0, pageHeight],
        outputRange: [Colors.primary, '#fff'],
        extrapolate: 'clamp'
    })

    renderItem = ({ item, index }) => {
        return (
            <View style={{ height: pageHeight, width, backgroundColor: item.backgroundColor }}>

                {item.backgroundColor === Colors.primary && (
                    <Gradient
                        width={width}
                        height={pageHeight}
                        style={{ position: 'absolute' }}
                        color1="#5072F8"
                        color2="#4C51F7"
                        direction="normal"
                    />
                )}

                {item.id === 1 && <Intro slotOffsetX={slotOffsetX} />}
                {item.id === 2 && (
                    <View>
                        <SlotSelect opacity={slotSelectOpacity} slotOffsetX={slotOffsetX} />
                        <AddOnSelect opacity={addOnSelectOpacity} />
                    </View>
                )}
            </View>
        )
    }

    viewScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: pageOffsetY } } }]
    )

    console.log('rendering Main', location);

    return (
        <View>

            <Animated.View style={{ top: 0, left: 0, zIndex: 100, position: 'absolute', alignItems: 'center', width, top: 145, transform: [{ translateY: locationOffsetY }] }}>
                <Animated.View style={{ opacity: pullUpOpacity, top: 25, transform: [{ translateY: pullUpOffsetY }] }}>
                    <Svg width={11} height={6} viewBox="0 0 11 6">
                        <Path stroke="white" strokeWidth={2} d="M1 5l4.5-4L10 5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </Animated.View>
                <Animated.Text style={{ color: locationFontColor, fontFamily: 'CircularStd-Black', fontSize: 18, lineHeight: 30, textTransform: 'uppercase', opacity: locationCountryOpacity }}>{location.city}</Animated.Text>
                <Animated.Text style={{ color: locationFontColor, fontFamily: 'CircularStd-Black', fontSize: 38, lineHeight: 39, textTransform: 'uppercase', letterSpacing: locationLetterSpacing, transform: [{ scale: locationCityScale }, { translateY: locationCityOffsetY }] }}>{location.hood}</Animated.Text>
                <Animated.Text style={{ color: locationFontColor, fontFamily: 'CircularStd-Black', fontSize: 18, lineHeight: 18, textTransform: 'uppercase' }}>{location.street}</Animated.Text>
                <View style={{ width: 220, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Animated.Text style={{ opacity: 0.8, color: openingTimesColor, fontSize: 16, letterSpacing: -0.5, marginRight: 7, fontFamily: 'CircularStd-Medium' }}>{padNumber(2, openingTimes.open)}:00</Animated.Text>
                    <Animated.View style={{ borderColor: openingTimesLineColor, flex: 1, borderBottomWidth: 2, height: 1, opacity: 0.5 }} />
                    <Animated.Text style={{ opacity: 0.8, color: openingTimesColor, fontSize: 16, letterSpacing: -0.5, marginLeft: 7, fontFamily: 'CircularStd-Medium' }}>{padNumber(2, openingTimes.close)}:00</Animated.Text>
                </View>
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
