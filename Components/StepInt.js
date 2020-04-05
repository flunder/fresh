import React, { useState, useRef, useEffect } from 'react'
import { Text } from 'react-native'

function StepInt({ style, price, currency = false }) {

    const prevValue = useRef(0);
    const [steps, setSteps] = useState([]);
    const [value, setValue] = useState(0);
    const index = useRef(0)
    const timer = useRef(false);

    useEffect(() => {
        index.current = 0;
        // console.log(`going from ${prevValue.current} to ${price}`);

        const steps = getStepInt({
            from: prevValue.current,
            to: price,
            divider: 1.5,
            steps: 25,
        });

        setSteps(steps);
        prevValue.current = price;
    }, [price])

    useEffect(() => {
        runAnimation();
    }, [steps])

    resetTimeout = () => {
        clearTimeout(timer.current);
        timer.current = false;
    }

    runAnimation = () => {
        resetTimeout();

        timer.current = setTimeout(() => {
            if (index.current < steps.length) {
                setValue(parseInt(steps[index.current]));
                index.current = index.current + 1;
                runAnimation();
            } else {
                resetTimeout();
            }
        }, 15)
    }

    const getStepInt = ({ from, to, divider = 2, steps = 10 }) => {
        const diff = Math.abs(from - to);

        // Run Reduce on the difference
        // between the two numbers
        const result = [...Array(steps)].reduce((acc, currentValue, currentIndex) => {
            if (currentIndex === 0) {
                return acc.concat(diff);
            } else {
                return acc.concat(acc[currentIndex-1] / divider)
            }
        }, []);

        // Add the original number back in
        const rresult = result.map(r => r + Math.min(from, to));

        // Apply Direction
        if (from < to) rresult.reverse();

        return rresult;
    }

    return (
        <Text style={style}>
            {value}{currency}
        </Text>
    )
}

export { StepInt }
