import React from "react";
import {Constants} from "expo";
import {View} from "react-native";

export const Screen = ({style = {}, children, ...props}) => (
    <View style={{paddingTop: Constants.statusBarHeight + 12, ...style}} {...props}>
        {children}
    </View>
);