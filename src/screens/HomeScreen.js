import React, {Component} from "react";
import {connect} from "react-redux";
import {Divider} from "react-native-elements";
import {Screen} from "../styled/Screen";
import AddTodoForm from "../site-components/AddTodoForm";
import TodoList from "../site-components/TodoList";

class HomeScreen extends Component {
    static mapStateToProps = ({selectedTodo, todo}) => ({selectedTodo, todo});

    render(){
        return (
            <Screen>
                <AddTodoForm {...this.props}/>
                <Divider/>
                <TodoList {...this.props}/>
            </Screen>
        );
    }
}

export default connect(HomeScreen.mapStateToProps)(HomeScreen);