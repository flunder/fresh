import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Main } from './Components'
import * as Font from 'expo-font'
import { setCustomText } from 'react-native-global-props'

export default function App() {

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        loadFonts();
    }, []);

    loadFonts = async () => {
        await Font.loadAsync({
            'CircularStd-Book': require('./assets/Fonts/CircularStd-Book.ttf'),
            'CircularStd-Medium': require('./assets/Fonts/CircularStd-Medium.ttf'),
            'CircularStd-Bold': require('./assets/Fonts/CircularStd-Bold.ttf'),
            'CircularStd-Black': require('./assets/Fonts/CircularStd-Black.ttf')
        }).then(() => {
            setDefaultFont();
            setFontsLoaded(true);
        })
    }

    setDefaultFont = () => {
        setCustomText({
             style: { fontFamily: 'CircularStd-Black' }
        })
    }

    return (
        <>
            <StatusBar hidden />
            {fontsLoaded && <Main />}
        </>
    )
}
