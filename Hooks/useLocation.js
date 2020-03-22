import React, { useState, useEffect } from 'react'
import { Places } from '../constants'
import { getRandomInt } from '../helpers'

function useLocation(props) {
    const randomPlaceIndex = getRandomInt(0, Places.length);
    return Places[randomPlaceIndex];
}

export { useLocation }
