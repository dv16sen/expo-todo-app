import React from "react";
import {TextInput as Input} from "react-native";

export const TextInput = ({style = {}, ...props}) => (
    <Input
        style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            ...style
        }}
        {...props}
    />
);