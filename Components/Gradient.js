import React from 'react'
import { Platform } from 'react-native'
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg'

export const GradientPresets = {
    warmEve: { color1: "#FC9B72", color2: "#B238D4", opacity1: 0.8, opacity2: 0.8 },
    purple:  { color1: '#7822F9', color2: '#C33DEC', opacity1: 1, opacity2: 1 }
}

class Gradient extends React.PureComponent {

    directionProps = {
        normal:  { horizontal: { x1: "0%",  y1: "50%", x2: "100%", y2: "50%" }, vertical: { x1: "50%", y1: "0%",  x2: "50%",  y2: "100%" } },
        reverse: { horizontal: { x2: "0%",  y2: "50%", x1: "100%", y1: "50%" }, vertical: { x2: "50%", y2: "0%",  x1: "50%",  y1: "100%" } }
    }

    render() {
        let {
            width = 100,
            height = 100,
        } = this.props

        const {
            style,
            reverse,
            direction = 'vertical',
            color1 = GradientPresets.warmEve.color1,
            color2 = GradientPresets.warmEve.color2,
            opacity1 = 0.8,
            opacity2 = 0.8,
            pointerEvents
        } = this.props;

        if (Platform.OS === 'android') {
            width = width.replace ? width.replace('%', '') : width
            height = height.replace ? height.replace('%', '') : height
        }

        return (
            <Svg width={width} height={height} style={style} pointerEvents={pointerEvents}>
                <Defs>
                    <LinearGradient
                        {...this.directionProps[reverse ? 'reverse' : 'normal'][direction]}
                        id="prefix__a">
                            <Stop stopColor={color1} stopOpacity={opacity1} offset="0%" />
                            <Stop stopColor={color2} stopOpacity={opacity2} offset="100%" />
                    </LinearGradient>
                </Defs>
                <Path fill="url(#prefix__a)" d={`M0 0h${width}v${height}H0z`} />
            </Svg>
        );
    }
}

export { Gradient }
