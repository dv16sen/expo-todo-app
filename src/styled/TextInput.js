import React from "react";
import {TextInput as Input} from "react-native";
import layout from "../constants/layout";

export const TextInput = ({style = {}, ...props}) => (
    <Input
        style={{
            height: 40,
            width: layout.window.width,
            borderColor: "#ddd",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            ...style
        }}
        {...props}
    />
);