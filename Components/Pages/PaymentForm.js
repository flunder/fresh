import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Animated, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { VisaLogo, VisaLogoMono, MasterCardLogo, MasterCardLogoMono } from '../Icon'
import { useCardAnimation } from '../../Hooks/useCardAnimation'
import { Checkbox, UnderlinedText } from '../'

const { width, height } = Dimensions.get('window');

function PaymentForm({ formOffsetY, ...props }) {

    const [selectedCard, setSelectedCard] = useState(false);

    const {
        visaCardWrapOpacity,
        visaOpacity,
        visaOpacityReversed,
        visaOffsetX,
        masterCardWrapOpacity,
        masterCardOpacity,
        masterCardOpacityReversed
    } = useCardAnimation(selectedCard);

    return (
        <Animated.View style={{ marginHorizontal: 25, flex: 1, transform: [{ translateY: formOffsetY }] }}>
            <Svg width={width-50} height={height} viewBox={`0 0 ${width-50} ${height}`}>
                <Defs>
                    <LinearGradient x1="32.418%" y1="4.727%" x2="68.275%" y2="95.335%" id="gradient" >
                        <Stop stopColor="#FAFAFA" offset="0%" />
                        <Stop stopColor="#F8F7F7" offset="42.682%" />
                        <Stop stopColor="#F4F4F6" offset="64.614%" />
                        <Stop stopColor="#DADBE6" offset="100%" />
                    </LinearGradient>
                </Defs>
                <Rect fill="url(#gradient)" x="0" y="0" width={'100%'} height={height*0.8} rx="18" />
            </Svg>

            <View style={{ position: 'absolute', width: '100%', height: '100%', paddingHorizontal: 30, }}>
                <View style={{ flexDirection: 'row', height: 80, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Animated.View style={{ marginRight: 10, zIndex: 10, opacity: visaCardWrapOpacity }}>
                        <Animated.View style={{ opacity: visaOpacity, position: 'absolute', transform: [{ translateX: visaOffsetX }] }}>
                            <VisaLogo />
                        </Animated.View>
                        <Animated.View style={{ opacity: visaOpacityReversed }}>
                            <VisaLogoMono />
                        </Animated.View>
                    </Animated.View>

                    <Animated.View style={{ opacity: masterCardWrapOpacity }}>
                        <Animated.View style={{ opacity: masterCardOpacity, position: 'absolute' }}>
                            <MasterCardLogo />
                        </Animated.View>
                        <Animated.View style={{ opacity: masterCardOpacityReversed }}>
                            <MasterCardLogoMono />
                        </Animated.View>
                    </Animated.View>
                </View>

                <View>
                    <Input label="Card Number" onPress={() => { setSelectedCard('visa') }} />
                </View>

                <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Input label="EXP Date" onPress={() => {  }} style={{ width: 120 }} />
                    <Input label="CVC" onPress={() => {  }} style={{ width: 50 }} />
                </View>

                <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Input label="Card Holder" onPress={() => {  }} style={{ width: 120 }} />
                </View>

                <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Checkbox />
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 12, fontFamily: 'CircularStd-Medium', color: '#bbb', textAlign: 'right', letterSpacing: -0.25 }}>
                            I agree with payment terms & conditions
                        </Text>
                        <TouchableOpacity activeOpacity={0.85}>
                            <UnderlinedText offset={3} color={'#bbb'}>
                                <Text style={{ fontSize: 12, letterSpacing: -0.25, fontFamily: 'CircularStd-Medium', color: '#bbb', textAlign: 'right' }}>
                                    read full text
                                </Text>
                            </UnderlinedText>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </Animated.View>
    )
}

function Input({ label, onPress, style, ...props }) {

    const inputRef = useRef();

    const [unlocked, setUnlocked] = useState(false)
    const labelOffsetX = useRef(new Animated.Value(0));
    const labelOffsetY = useRef(new Animated.Value(0));
    const labelScale = useRef(new Animated.Value(1));
    const labelFontSize = useRef(new Animated.Value(14));

    const unlock = useCallback(() => {
      setUnlocked(true);
      inputRef.current.focus()
      onPress();
    }, [unlocked])

    useEffect(() => {
        Animated.parallel([
            Animated.spring( labelOffsetX.current, { toValue: unlocked ? -5 : 0 }),
            Animated.spring( labelOffsetY.current, { toValue: unlocked ? -20 : 0 }),
            Animated.spring( labelFontSize.current, { toValue:  unlocked ? 12 : 14 })
        ]).start();
    }, [unlocked])

    return (
        <View style={style}>

            <Animated.View style={{ height: 50, transform: [{ translateX: labelOffsetX.current }, { translateY: labelOffsetY.current }, { scale: labelScale.current }] }}>
                <TouchableOpacity activeOpacity={0.85} onPress={unlock} disabled={unlocked}>
                    <Animated.Text style={{ ...styles.label, fontSize: labelFontSize.current }}>
                        {label}
                    </Animated.Text>
                </TouchableOpacity>
            </Animated.View>

            <TextInput
                ref={inputRef}
                style={styles.textInput}
            />
        </View>
    )
}

const styles = {
    label: {
        color: '#aaa',
        fontSize: 14,
        fontFamily: 'CircularStd-Book',
        letterSpacing: -0.5,
        paddingTop: 25,
        paddingBottom: 5,
        paddingLeft: 5,

    },
    textInput: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        zIndex: -1,
        fontFamily: 'CircularStd-Book',
        padding: 5,
        // backgroundColor: 'red',


    }
}

export { PaymentForm }
