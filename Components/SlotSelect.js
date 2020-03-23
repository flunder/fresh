import React, { useState, useEffect, useRef } from 'react'
import { Animated, Dimensions, LayoutAnimation, FlatList, Text, TouchableOpacity, View } from 'react-native'
import Svg, { Path } from "react-native-svg"
import { CustomLayoutSpring } from '../constants'
const { width, height } = Dimensions.get('window');

const itemWidth = 50;

const openingTimes = {
    open: 8,
    close: 22
}

const componentHeight = height * 0.2;

function SlotSelect(props) {

    const [availableTimes, setAvailableTimes] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const offsetX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        getAvailableTimes()
        addScrollListener();
    }, []);

    useEffect(() => {
        // animatedNewSelection();
        console.log(selectedIndex);
        LayoutAnimation.configureNext(CustomLayoutSpring)
    }, [selectedIndex]);

    padNumberBase = (n) => ('0000'+n).slice(-4);

    getAvailableTimes = () => {
        const availableTimes = [];

        for (var i = openingTimes.open; i <= openingTimes.close; i++) {
            availableTimes.push({ time: padNumberBase(i + '00'), slotsAvailable: 2 });

            if (i !== openingTimes.close) {
                availableTimes.push({ time: padNumberBase(i + '30'), slotsAvailable: 2 });
            }
        }

        setAvailableTimes(availableTimes);
    }

    addScrollListener = () => {
        // Listener already attached
        if (offsetX._listeners[1]) return;

        offsetX.addListener(({value}) => {
            calculateSelectedIndex({ offsetX: value })
        });
    }

    calculateSelectedIndex = ({offsetX}) => {
        const newIndex = Math.round(offsetX / itemWidth);

        if (newIndex !== selectedIndex) setSelectedIndex(newIndex);
    }

    renderItem = ({ item, index }) => {

        // Add some spacing to the first and last item
        // to not start and end right at the end the view

        const paddingProps = index == 0
            ? { marginLeft: (width / 2)-(itemWidth/2) }
            : index == availableTimes.length-1
                ? { marginRight: (width / 2)-(itemWidth/2) }
                : {}

        const isSelected = index === selectedIndex;

        return (
            <View ref={index} style={{ ...paddingProps, width: itemWidth, alignItems: 'center', height: componentHeight, justifyContent: 'center', opacity: isSelected ? 1 : 0.3, paddingTop: 20 }}>
                <View style={{ width: 10, height: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center', top: isSelected ? 0 : 0 }}>
                    <View style={{ width: isSelected ? 9 : 4, height: isSelected ? 9 : 4, borderRadius: 100, backgroundColor: 'white' }} />
                </View>
                <Text style={{ color: 'white', fontFamily: 'CircularStd-Book', fontSize: isSelected ? 16 : 12, top: isSelected ? 2 : 0, marginBottom: 12 }}>
                    {item.time.substr(0, 2)}<Text style={{ opacity: 0.5, fontSize: 10 }}>:</Text>{item.time.substr(2, 2)}
                </Text>
                <Text style={{ color: 'white', fontFamily: 'CircularStd-Book', fontSize: isSelected ? 16 : 12, top: isSelected ? -3 : 0 }}>
                    {item.slotsAvailable}
                </Text>
            </View>
        )
    }

    viewScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: offsetX } } }]
    )

    return (
        <Animated.View style={{ opacity: props.opacity }}>

            <FlatList
                data={availableTimes}
                keyExtractor={item => `${item.time}`}
                renderItem={renderItem}
                horizontal

                snapToAlignment="start"
                snapToInterval={itemWidth}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={viewScroll}

                extraData={selectedIndex}
            />

            <View style={{ height: height * 0.1, alignItems: 'center' }}>
                <Svg style={{ marginBottom: 15 }} width={185} height={8} viewBox="0 0 185 8" {...props}>
                    <Path stroke="#FFF" strokeWidth={1} d="M1 6.5h89.154L94.9 2l4.658 4.5H183.5" fill="none" fillRule="evenodd" strokeLinecap="square" />
                </Svg>
                <TouchableOpacity activeOpacity={0.85}>
                    <Text style={{ color: 'white', textTransform: 'uppercase', fontSize: 18, fontFamily: 'CircularStd-Black' }}>Go for Refresh</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>

    )
}

export { SlotSelect }
