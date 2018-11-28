import React from "react";
import {FlatList} from "react-native";
import {Divider} from "react-native-elements/src/index";

export const TextList = ({data = [], itemProps = {}, ...props}) => (
    <FlatList
        style={{marginBottom: data.length * 4}}
        data={data}
        ItemSeparatorComponent={Divider}
        keyExtractor={(item, index) => index.toString()}
        {...props}
    />
);