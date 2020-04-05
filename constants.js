import React from 'react'
import { View, LayoutAnimation, Platform } from 'react-native'
import { Animated } from 'react-native'

/*
    Colors
    For extras colors use their name:
    http://chir.ag/projects/name-that-color
*/

export const Colors = {

    // Base --------------------

    primary: '#4E5DF8',
    primaryLighter: 'red',
    primaryDarker: '#3F3FF7',

    backgroundGradient: ['#5072F8', '#4C51F7'],

    success: 'green',
    error: 'red',
    warning: 'blue',

    // Grays --------------------

    gray100: '#F7FAFC', // bright
    gray200: '#EDF2F7',
    gray300: '#E2E8F0',
    gray400: '#CBD5E0;',
    gray500: '#A0AEC0;',
    gray600: '#718096;',
    gray700: '#4A5568',
    gray800: '#2D3748',
    gray900: '#1A202C', // dark

    // Misc --------------------

    // Blues

    facebookBlue: '#3678EA',

    // Greens

    pastelGreen: '#7FE87C',
}

/*
    LayoutAnimation Configs
*/

export const LayoutAnimationConfig = {
    duration: 150,
    create: { type: 'linear', property: 'opacity' },
    update: { type: LayoutAnimation.Types.spring, springDamping: 0.7 },
    delete: { type: 'linear', property: 'opacity' }
};

export const CustomLayoutSpring = {
    duration: 800,
    create: { type: LayoutAnimation.Types.spring, property: LayoutAnimation.Properties.scaleXY, springDamping: 0.7 },
    update: { type: LayoutAnimation.Types.spring, springDamping: 0.7 },
    delete: { type: LayoutAnimation.Types.spring, property: LayoutAnimation.Properties.scaleXY, springDamping: 0.7 }
};

/*
    A list of locations
*/

export const Places = [
    {
        city: 'London, UK',
        hood: 'Bethnal G.',
        street: 'Mullet Gardens'
    },
    {
        city: 'Berlin, Germany',
        hood: 'Prenzlauer B.',
        street: 'Paul Robeson Str.'
    },
    {
        city: 'Seongbuk, Seoul',
        hood: 'Dongsun',
        street: 'Sungshin w.univ'
    },
    {
        city: 'Athens, GR',
        hood: 'P. Faliro',
        street: 'Athinaion'
    }
]

/*
    Prices
*/

export const basePrice = 3000;

/*
    A list of selectable options

    as inactive items don't show as zero opacity,
    i have a constant here to handle the opacities.
*/

export const optionsOpacities = {
    title: { active: 1, inActive: 0.3 },
    option: { active: 1, inActive: 0 }
}

export const optionsRaw = {
    set: {
        id: 1,
        selected: false,
        options: false,
        quantity: 1,
        title: "Shower Set",
        price: 2000,
        titleOpacity: new Animated.Value(optionsOpacities.title.inActive),
        optionOpacity: new Animated.Value(optionsOpacities.option.inActive)
    },
    toothbrush: {
        id: 2,
        selected: false,
        options: false,
        quantity: 1,
        title: "Toothbrush & Paste",
        price: 500,
        titleOpacity: new Animated.Value(optionsOpacities.title.inActive),
        optionOpacity: new Animated.Value(optionsOpacities.option.inActive)
    },
    shaving: {
        id: 3,
        selected: false,
        options: ['M', 'F'],
        quantity: 1,
        title: "Shaving Set",
        price: 1500,
        titleOpacity: new Animated.Value(optionsOpacities.title.inActive),
        optionOpacity: new Animated.Value(optionsOpacities.option.inActive)
    },
    bathTowel: {
        id: 4,
        selected: false,
        options: false,
        quantity: 1,
        title: "Bath Towel",
        price: 750,
        titleOpacity: new Animated.Value(optionsOpacities.title.inActive),
        optionOpacity: new Animated.Value(optionsOpacities.option.inActive)
    },
    additionalTowel: {
        id: 5,
        selected: false,
        options: false,
        quantity: 1,
        title: "Additional Towel",
        price: 500,
        titleOpacity: new Animated.Value(optionsOpacities.title.inActive),
        optionOpacity: new Animated.Value(optionsOpacities.option.inActive)
    },
    underwear: {
        id: 6,
        selected: false,
        options: ['M', 'F'],
        quantity: 1,
        title: "Cotton Underwear",
        price: 1750,
        titleOpacity: new Animated.Value(optionsOpacities.title.inActive),
        optionOpacity: new Animated.Value(optionsOpacities.option.inActive)
    },
}
