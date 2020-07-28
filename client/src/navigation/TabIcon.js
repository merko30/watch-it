import React from "react";
import { Icon } from "react-native-elements";

import { COLORS } from "../theme/colors";

const TabIcon = ({ name, iconProps: { focused } }) => (
  <Icon
    name={name}
    type="octicon"
    iconStyle={{
      color: focused ? COLORS.darkBrown : COLORS.lightestBrown
    }}
  />
);

export default TabIcon;
