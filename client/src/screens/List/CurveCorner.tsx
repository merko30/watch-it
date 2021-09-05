import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from '@shopify/restyle';

import {Theme} from '../../theme';

interface CurveCornerProps {
  color: keyof Theme['colors'];
}

const CurveCorner = ({color}: CurveCornerProps) => {
  const {colors} = useTheme<Theme>();
  return (
    <Svg
      height="50"
      width="50"
      viewBox="0 0 50 50"
      style={{position: 'absolute', top: 120, right: 0, zIndex: 20}}>
      <Path
        d="M 0,0 L50,0 50,50 C50,50 50,0 0,0"
        fill={colors[color]}
        // fill="red"
      />
    </Svg>
  );
};

export default CurveCorner;
