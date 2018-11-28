import React from "react";
import {Alert} from "react-native";
import {selectTodo, startFirebaseCommunication, stopFirebaseCommunication} from "../redux/actions";
import {TextList} from "../styled/TextList";
import {Text} from "react-native-elements";

export default ({firebaseTodoRef, dispatch, todo, selectedTodo}) =>{
    const handleDelete = async (item) => {
        dispatch(startFirebaseCommunication());
        await firebaseTodoRef.child(item.key).remove();
        dispatch(stopFirebaseCommunication());
    };

    return (
        <TextList
            data={todo}
            renderItem={({item, index}) => (
                <Text
                    style={{
                        padding: 20,
                        backgroundColor: (selectedTodo === index) ? "#ddd" : "#fff"
                    }}
                    onPress={() =>{
                        Alert.alert(
                            `What would you like to do?`,
                            `Selected item: ${item.value}`,
                            [
                                {text: 'Delete', onPress: () => handleDelete(item)},
                                {text: 'Edit', onPress: () => dispatch(selectTodo(index))},
                                {text: 'Nothing', style: 'cancel'},
                            ],
                        );
                    }}
                >{item.value}</Text>
            )}
        />
    );
};