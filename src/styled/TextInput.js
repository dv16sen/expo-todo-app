import React from "react";
import {TextInput as Input} from "react-native";
import layout from "../constants/layout";

export const TextInput = ({style = {}, ...props}) => (
    <Input
        style={{
            height: 56,
            width: layout.window.width,
            fontSize: 16,
            paddingLeft: 20,
            paddingRight: 20,
            borderColor: "#ddd",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            ...style
        }}
        {...props}
    />
);