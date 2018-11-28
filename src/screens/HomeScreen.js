import React, {Component} from "react";
import {Divider} from "react-native-elements";
import {Screen} from "../styled/Screen";
import AddTodoForm from "../site-components/AddTodoForm";
import TodoList from "../site-components/TodoList";
import EditTodoForm from "../site-components/EditTodoForm";
import withTodoItems from "../site-components/withTodoItems";

class HomeScreen extends Component {

    render(){
        const {todo, selectedTodo, isEditingTodo} = this.props;

        return (
            <Screen>
                {isEditingTodo
                    ? <EditTodoForm key={todo[selectedTodo].value} {...this.props}/>
                    : <AddTodoForm {...this.props}/>}
                <Divider/>
                <TodoList {...this.props}/>
            </Screen>
        );
    }
}

export default withTodoItems(HomeScreen);