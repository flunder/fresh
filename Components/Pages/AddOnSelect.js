import React, { useState, useEffect, useRef } from 'react'
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native'
import Svg, { Path } from "react-native-svg"
import { pageHeight } from '../Main'
import { Colors } from '../../constants'
import { optionsOpacities } from '../../constants'
import { Checkbox, FlipOption } from '../'

const { width, height } = Dimensions.get('window');

function AddOnSelect({ opacity, options, setOptions, price, setPrice, ...props }) {

    // const [options, setOptions] = useState(optionsRaw);
    // const [price, setPrice] = useState(0);

    useEffect(() => {
        updatePrice();
    }, [options, setOptions]);

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
            Animated.spring(updatedOptions[id].titleOpacity, { toValue: newSelectedState ? optionsOpacities.title.active : optionsOpacities.title.inActive }),
            Animated.spring(updatedOptions[id].optionOpacity, { toValue: newSelectedState ? optionsOpacities.option.active : optionsOpacities.option.inActive }),
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

    setOptionOption = ({ optionID, value })  => {
        const updatedOptions = { ...options }

        updatedOptions[optionID] = {
            ...options[optionID],
            option: value
        }

        setOptions(updatedOptions);
    }

    updatePrice = () => {
        const newPrice = Object.keys(options).reduce((sum, item) => {
            if (options[item].selected) {
                return sum + (options[item].price * options[item].quantity)
            }
            return sum;
        }, 0);

        setPrice(newPrice);
    }

    return (
        <View>
            <Animated.View style={{ opacity: opacity, paddingHorizontal: 25, marginTop: -2 }}>

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
                                        <FlipOption
                                            style={{ ...styles.text, ...styles.centered }}
                                            updateState={setOptionOption}
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

            </Animated.View>

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
