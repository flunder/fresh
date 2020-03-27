import React, { useState, useEffect, useRef } from 'react'
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native'
import Svg, { Path } from "react-native-svg"
import { pageHeight } from './Main'
import { Colors } from '../constants'

const { width, height } = Dimensions.get('window');

const opacities = {
    title: { active: 1, inActive: 0.3 },
    option: { active: 1, inActive: 0 }
}

const optionsRaw = {
    set: {
        id: 1,
        selected: false,
        options: false,
        quantity: 1,
        title: "Shower Set",
        price: 2000,
        titleOpacity: new Animated.Value(opacities.title.inActive),
        optionOpacity: new Animated.Value(opacities.option.inActive),
        quantityOffsetY: new Animated.Value(0)
    },
    toothbrush: {
        id: 2,
        selected: false,
        options: false,
        quantity: 1,
        title: "Toothbrush & Paste",
        price: 500,
        titleOpacity: new Animated.Value(opacities.title.inActive),
        optionOpacity: new Animated.Value(opacities.option.inActive),
        quantityOffsetY: new Animated.Value(0)
    },
    shaving: {
        id: 3,
        selected: false,
        options: ['M', 'F'],
        quantity: 1,
        title: "Shaving Set",
        price: 1500,
        titleOpacity: new Animated.Value(opacities.title.inActive),
        optionOpacity: new Animated.Value(opacities.option.inActive),
        quantityOffsetY: new Animated.Value(0)
    },
    bathTowel: {
        id: 4,
        selected: false,
        options: false,
        quantity: 1,
        title: "Bath Towel",
        price: 750,
        titleOpacity: new Animated.Value(opacities.title.inActive),
        optionOpacity: new Animated.Value(opacities.option.inActive),
        quantityOffsetY: new Animated.Value(0)
    },
    additionalTowel: {
        id: 5,
        selected: false,
        options: false,
        quantity: 1,
        title: "Additional Towel",
        price: 500,
        titleOpacity: new Animated.Value(opacities.title.inActive),
        optionOpacity: new Animated.Value(opacities.option.inActive),
        quantityOffsetY: new Animated.Value(0)
    },
    underwear: {
        id: 6,
        selected: false,
        options: ['M', 'F'],
        quantity: 1,
        title: "Cotton Underwear",
        price: 1750,
        titleOpacity: new Animated.Value(opacities.title.inActive),
        optionOpacity: new Animated.Value(opacities.option.inActive),
        quantityOffsetY: new Animated.Value(0)
    },
}

const Checkbox = ({ isActive, tickOpacity }) => (
    <View style={{ width: 15, height: 15, borderRadius: 2, backgroundColor: 'white', borderWidth: 1, borderColor: 'rgba(150, 150, 150, .5)', alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={{ opacity: tickOpacity, left: 0.5 }}>
            <Svg width={10} height={8} viewBox="0 0 10 8">
                <Path
                    fill="#4F65F8"
                    fillRule="nonzero"
                    d="M8.114 0L3.6 4.627 1.486 2.622 0 4.11 3.6 7.6l6-6.114z"
                />
            </Svg>
        </Animated.View>
    </View>
)

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
function AddOnSelect(props) {

    const [options, setOptions] = useState(optionsRaw);

    // useEffect(() => {
    // }, []);

    toggleOption = ({ id }) => {
        // Update State
        const updatedOptions = { ...options }
        const newSelectedState = !options[id].selected;

        updatedOptions[id] = {
            ...options[id],
            selected: newSelectedState
        }

        // Animate
        Animated.parallel([
            Animated.spring(updatedOptions[id].titleOpacity, { toValue: newSelectedState ? opacities.title.active : opacities.title.inActive }),
            Animated.spring(updatedOptions[id].optionOpacity, { toValue: newSelectedState ? opacities.option.active : opacities.option.inActive }),
        ]).start();

        setOptions(updatedOptions);
    }

    setOptionQuantity = ({ optionID, value })  => {
        const updatedOptions = { ...options }

        updatedOptions[optionID] = {
            ...options[optionID],
            quantity: value
        }

        setOptions(updatedOptions);
    }

    return (
        <View>
            <Animated.View style={{ borderBottomWidth: 1, borderBottomColor: Colors.primary, opacity: props.opacity, paddingHorizontal: 25, marginTop: -2, paddingBottom: height * 0.1 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={styles.text}></Text>
                    <Text style={[styles.text, styles.title]}></Text>
                    <Text style={[styles.text, styles.legend, styles.small]}>Option</Text>
                    <Text style={[styles.text, styles.legend, styles.small]}>Quantity</Text>
                </View>

                <View style={{ ...styles.borderTop }}>
                    {Object.keys(options).map(index => {
                        const option = options[index];

                        return (
                            <View key={option.id} style={{ flexDirection: 'row', paddingVertical: 11, ...styles.borderBottom }}>

                                <Animated.View style={{ flex: 1, flexDirection: 'row', opacity: option.titleOpacity }}>

                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
                                        hitSlop={{ top: 11, bottom: 11, left: 10, right: 10 }}
                                        onPress={() => { toggleOption({ id: index }) }}>
                                        <Checkbox isActive={option.selected} tickOpacity={option.optionOpacity} />
                                        <Text style={[styles.text, styles.title]}>{option.title}</Text>
                                    </TouchableOpacity>

                                    <Animated.View style={{ flex: 0.55, flexDirection: 'row', opacity: option.optionOpacity }}>
                                        {/* <Text style={{...styles.text, ...styles.centered, flex: 1 }}>{option.options ? option.options[0] : "-"}</Text> */}
                                        <FlipOption
                                            style={{ ...styles.text, ...styles.centered }}
                                            updateState={setOptionQuantity}
                                            optionID={index}
                                            options={option.options}
                                            text={option.quantity}
                                            active={option.selected}
                                        />

                                        <FlipOption
                                            style={{ ...styles.text, ...styles.centered }}
                                            updateState={setOptionQuantity}
                                            optionID={index}
                                            options={[1,2,3]}
                                            text={option.quantity}
                                            active={option.selected}
                                        />
                                    </Animated.View>
                                </Animated.View>

                            </View>
                        )

                    })}
                </View>

                <Svg width={15} height={15} viewBox="0 0 15 15" style={{ bottom: -8, position: 'absolute', zIndex: 10, transform: [{ translateX: (width / 2) -15/2}] }}>
                    <Path
                        fill={Colors.primary}
                        d="M7.071 0l7.071 7.071-7.07 7.071L0 7.071z"
                        fillRule="evenodd"
                    />
                </Svg>

            </Animated.View>

            <View style={{ backgroundColor: 'white', height: '100%', zIndex: '-1', alignItems: 'center' }}>
                <Text style={{ fontSize: 40, paddingTop: 20, color: Colors.primary }}>5008W</Text>
            </View>

        </View>
    )
}

const styles = {
    text: {
        color: 'white',
        fontFamily: 'CircularStd-Book',
        letterSpacing: -0.25
    },
    centered: {
        textAlign: 'center'
    },
    small: {
        flex: 0.3,
    },
    title: {
        flex: 1,
        paddingLeft: 15
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, .35)'
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, .35)'
    },
    legend: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center'
    },
}
export { AddOnSelect }
