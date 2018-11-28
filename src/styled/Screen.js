import React from "react";
import {Constants} from "expo";
import {View, TouchableWithoutFeedback, Keyboard} from "react-native";

export const Screen = ({style = {}, children, ...props}) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
            style={{
                paddingTop: Constants.statusBarHeight + 12,
                ...style
            }}
            {...props}
        >
            {children}
        </View>
    </TouchableWithoutFeedback>
);