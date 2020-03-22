import React, { useState, useEffect } from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'
import { Gradient } from './'
import { pageHeight } from './Main'

const { width, height } = Dimensions.get('window');

const itemWidth = 50;
const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }

const startTime = 8;
const endTime = 22;

const componentHeight = height * 0.2;

function Page2(props) {

    const [availableTimes, setAvailableTimes] = useState(false);

    useEffect(() => {
        getAvailableTimes()
    }, []);

    padNumberBase = (n) => ('0000'+n).slice(-4);

    getAvailableTimes = () => {
        const availableTimes = [];

        for (var i = startTime; i <= endTime; i++) {
            availableTimes.push({ time: padNumberBase(i + '00') });
            if (i !== endTime) {
                availableTimes.push({ time: padNumberBase(i + '30') });
            }
        }

        setAvailableTimes(availableTimes);
    }

    handleViewableItemsChanged = ({ viewableItems, changed }) => {
        // console.log(changed);
        // this.setState({
        //     viewableItemIds: viewableItems.map(i => i.key)
        // })
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ width: itemWidth, alignItems: 'center', height: componentHeight, justifyContent: 'center' }}>
                <View style={{ width: 4, height: 4, borderRadius: 100, backgroundColor: 'white', marginBottom: 10 }} />
                <Text style={{ color: 'white', fontFamily: 'CircularStd-Book', fontSize: 12 }}>
                    {item.time.substr(0, 2)}:{item.time.substr(2, 2)}
                </Text>
            </View>
        )
    }

    return (
        <View>
            <Gradient
                width={width}
                height={pageHeight}
                style={{ position: 'absolute' }}
                color1="#5072F8"
                color2="#4C51F7"
                direction="normal"
            />

            <FlatList
                data={availableTimes}
                keyExtractor={item => `${item.time}`}
                renderItem={renderItem}
                horizontal

                snapToAlignment="center"
                snapToInterval={itemWidth}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}

                // onViewableItemsChanged={handleViewableItemsChanged}
                // viewabilityConfig={viewabilityConfig}
            />
        </View>

    )
}

export { Page2 }
