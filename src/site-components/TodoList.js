import React, {Component} from "react";
import {deselectTodo, selectTodo} from "../redux/actions";
import {TextList} from "../styled/TextList";
import {Text} from "react-native-elements";

export default class TodoList extends Component {
    render(){
        return (
            <TextList
                data={this.props.todo}
                renderItem={({item, index}) => (
                    <Text
                        style={{
                            padding: 20,
                            backgroundColor: (this.props.selectedTodo === index) ? "#ddd" : "#fff"
                        }}
                        onPress={() => {
                            if(this.props.selectedTodo === index){
                                this.props.dispatch(deselectTodo())
                            } else {
                                this.props.dispatch(selectTodo(index));
                            }
                        }}
                    >{item}</Text>
                )}
            />
        );
    }
}