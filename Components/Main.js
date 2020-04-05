import React, { useState, useEffect, useRef, useMemo  } from 'react'
import { Animated, Dimensions, FlatList, Text, View } from 'react-native'
import Svg, { Path } from "react-native-svg"
import {  Gradient } from './'
import { Intro, SlotSelect, AddOnSelect, Payment } from './Pages'
import { openingTimes } from './Pages/SlotSelect'
import { Colors } from '../constants'
import { useLocation } from '../Hooks'
import { padNumber } from '../helpers'
import { Van, vanDimensions } from './Icon'
import { optionsRaw } from '../constants'

const { width, height } = Dimensions.get('window');

// Page height used for snap point and animations
export const pageHeight = height * 0.7;

export const pages = [
    { id: 1, backgroundColor: 'white', pageHeight: pageHeight, pageOffset: 0 },
    { id: 2, backgroundColor: Colors.primary, pageHeight: pageHeight, pageOffset: height * 0.1 },
    { id: 3, backgroundColor: 'white', pageHeight: height + height * 0.1, pageOffset: 0 },
    { id: 4, backgroundColor: Colors.primary, pageHeight: height, pageOffset: 0 },
]

function Main(props) {

    const pagerRef = useRef();

    // Location
    const location = React.useMemo(() => useLocation(), []);

    // Animations
    const pageOffsetY = useRef(new Animated.Value(0)).current;
    const slotOffsetX = useRef(new Animated.Value(0)).current;
    const helloVan = useRef(new Animated.Value(-vanDimensions.width * 2)).current;

    // Options & Price
    const [options, setOptions] = useState(optionsRaw);
    const [price, setPrice] = useState(0);
    const [pageOffsets, setPageOffsets] = useState([]);

    useEffect(() => {
        // addScrollListenerForDebug();
        getPageOffsets();
        rollVanIn();
    }, []);

    const rollVanIn = () => {
        setTimeout(() => {
            Animated.spring(helloVan, { toValue: 0, tension: 0.3 }).start();
        }, 300)
    }

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
        inputRange: [0, pageHeight/3, pageHeight],
        outputRange: [0.1, 0.3, 1],
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

    const locationOpacity = pageOffsetY.interpolate({
        inputRange: [0, pageHeight, pageHeight * 2],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp'
    })

    const vanPosX = Animated.add(
        pageOffsetY.interpolate({
            inputRange: [0, pageHeight + 200],
            outputRange: [width / 2 - (vanDimensions.width/2), width + vanDimensions.width],
            extrapolate: 'clamp'
        }
    ), helloVan);

    scollToPage = (index) => {
        pagerRef.current.scrollToOffset({
            offset: pageOffsets[index-1],
            animated: true
        })
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ height: item.pageHeight, width }}>

                {item.backgroundColor === Colors.primary && (
                    <Gradient
                        width={width}
                        height={item.pageHeight}
                        style={{ position: 'absolute' }}
                        color1="#5072F8"
                        color2="#4C51F7"
                        opacity1={1}
                        opacity2={2}
                        direction="normal"
                    />
                )}

                {item.id === 1 && <Intro slotOffsetX={slotOffsetX} />}
                {item.id === 2 && (
                    <>
                        <Animated.View style={{ position: 'absolute', top: -90, transform: [{ translateX: vanPosX }] }}>
                            <Van />
                        </Animated.View>
                        <SlotSelect opacity={slotSelectOpacity} slotOffsetX={slotOffsetX} scollToPage={scollToPage} />
                        <AddOnSelect opacity={addOnSelectOpacity} scollToPage options={options} setOptions={setOptions} price={price} setPrice={setPrice} />
                    </>
                )}
                {item.id === 3 && (
                    <Payment
                        price={price}
                        scollToPage={scollToPage}
                    />
                )}
            </View>
        )
    }

    const getPageOffsets = () => {
        var incrementalPages = [];
        var inc = 0;

        for (var i = 0; i < pages.length; i++) {
            inc = inc + (pages[i].pageHeight + pages[i].pageOffset);
            incrementalPages[i] = inc;
        }

        setPageOffsets(incrementalPages);
    }

    viewScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: pageOffsetY } } }]
    )

    return (
        <>
            <Animated.View style={{ top: 0, left: 0, zIndex: 100, position: 'absolute', alignItems: 'center', width, top: 145, transform: [{ translateY: locationOffsetY }], opacity: locationOpacity }}>
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
                ref={pagerRef}
                data={pages}
                keyExtractor={pages => `${pages.id}`}
                renderItem={renderItem}

                snapToAlignment="start"
                snapToOffsets={pageOffsets}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                onScroll={viewScroll}
            />
        </>
    )
}

export { Main }
