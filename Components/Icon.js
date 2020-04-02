import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Path, Circle, } from "react-native-svg"

export const vanDimensions ={
    width: 135,
    height: 112
}

export const Van = (props) => {
  return (
      <Svg width={135} height={112} viewBox="0 0 135 112" {...props}>
      <Defs>
        <LinearGradient
          x1="35.545%"
          y1="44.63%"
          x2="79.593%"
          y2="68.793%"
          id="prefix__a"
        >
          <Stop stopColor="#FCFEFE" offset="0%" />
          <Stop stopColor="#C7D5FC" offset="44.6%" />
          <Stop stopColor="#6B8DF8" offset="100%" />
        </LinearGradient>
        <LinearGradient
          x1="25.061%"
          y1="50%"
          x2="100%"
          y2="126.849%"
          id="prefix__b"
        >
          <Stop stopColor="#FCFEFE" offset="0%" />
          <Stop stopColor="#8CA8FB" offset="100%" />
        </LinearGradient>
        <LinearGradient
          x1="22.492%"
          y1="7.018%"
          x2="100%"
          y2="100%"
          id="prefix__c"
        >
          <Stop stopColor="#FCFEFE" offset="0%" />
          <Stop stopColor="#F2F5FE" offset="26.462%" />
          <Stop stopColor="#93A2FC" offset="100%" />
        </LinearGradient>
        <LinearGradient
          x1="22.492%"
          y1="7.018%"
          x2="100%"
          y2="142.532%"
          id="prefix__d"
        >
          <Stop stopColor="#FCFEFE" offset="0%" />
          <Stop stopColor="#6A7EF8" offset="100%" />
        </LinearGradient>
      </Defs>
      <G
        transform="translate(2 2)"
        stroke="#4E55FD"
        fill="none"
        fillRule="evenodd"
      >
        <Path
          d="M84.054 37.305c-2.46-.959-5.03-1.092-7.428-.452l-1.353.361-.4-1.342c-1.12-3.75-4.449-6.341-8.244-6.341a8.29 8.29 0 00-4.419 1.272l-.905.567-.805-.701c-2.261-1.967-5.1-3.06-8.1-3.06-5.337 0-10.056 3.484-11.88 8.643l-.7 1.974-1.594-1.357c-2.245-1.912-5.041-2.97-7.995-2.97-5.705 0-10.674 3.98-12.196 9.652l-.346 1.29-1.313-.247c-.743-.14-1.501-.212-2.268-.212-6.983 0-12.667 5.913-12.667 13.235 0 3.086 1.013 6.005 2.835 8.345l.657.843-.616.874A20.76 20.76 0 00.522 79.68l.006.552c.28 11.188 9.303 20.126 20.302 20.127l.225-.004.086.003h6.83l.292 1.057c.965 3.496 4.114 5.953 7.732 5.953 3.618 0 6.766-2.457 7.732-5.953l.292-1.057h27.524l.292 1.057c.966 3.496 4.114 5.953 7.732 5.953 3.619 0 6.767-2.457 7.733-5.953l.292-1.057h8.579l.292 1.057c.966 3.496 4.114 5.953 7.733 5.953 3.618 0 6.766-2.457 7.732-5.953l.292-1.057H117.237c7.696 0 13.934-6.238 13.934-13.933v-7.091c0-5.027-2.707-9.664-7.085-12.135l-7.397-4.176-.104-.696c-.975-6.557-4.838-10.978-8.003-10.978l-18.198-.344-.016-1.397a35.25 35.25 0 00-.17-2.89c0-3.747-1.945-6.906-6.144-9.414zM67.411 49.136l-.006-.109-1.42.251c.01.06.01.06.022.118l1.404-.26zm-3.227 0l1.106.718.195-.301-1.21-.784-.09.367zm.44-1.766a8.246 8.246 0 001.974.245l.366-.007 1.637-.091.223 1.259.018.096.32 1.737-7.702-.149 2.166-3.338.998.248z"
          strokeWidth={3.583}
          fill="url(#prefix__a)"
          fillRule="nonzero"
        />
        <Circle
          strokeWidth={3.306}
          fill="url(#prefix__b)"
          fillRule="nonzero"
          cx={34.595}
          cy={31.933}
          r={12.3}
        />
        <Path
          d="M86.233 95.641c-1.22-4.06-5.422-5.995-9.414-4.754M42.591 95.641c-1.22-4.06-5.422-5.995-9.414-4.754"
          strokeWidth={2.883}
          strokeLinecap="round"
        />
        <Path
          d="M119.159 72.294H100.661c-4.644 0-8.409-3.134-8.409-7s3.765-7 8.409-7h6.84"
          strokeWidth={2.998}
          strokeLinecap="round"
        />
        <Path
          d="M126.847 80.942h-24.985M126.847 86.708h-24.985"
          strokeWidth={2.498}
          strokeLinecap="round"
        />
        <Path
          d="M79.76 89.591v-3.825-9.628M65.345 89.591v-5.886-11.084c0-12.206 3.844-13.49 3.844-13.78"
          strokeWidth={2.883}
          strokeLinecap="round"
        />
        <Path
          d="M126.847 92.474h-24.985"
          strokeWidth={2.498}
          strokeLinecap="round"
        />
        <Circle
          strokeWidth={2.883}
          fill="url(#prefix__c)"
          fillRule="nonzero"
          cx={68.228}
          cy={52.114}
          r={9.129}
        />
        <Path
          d="M119.159 99.662h-13.453"
          strokeWidth={2.306}
          strokeLinecap="round"
        />
        <Circle
          strokeWidth={3.056}
          fill="url(#prefix__d)"
          fillRule="nonzero"
          cx={55.736}
          cy={6.948}
          r={6.659}
        />
      </G>
    </Svg>
  )
}
