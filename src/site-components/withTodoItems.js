import React, {Component} from "react";
import {connect} from "react-redux";
import firebase from "firebase";
import {stopFirebaseCommunication, updateTodo} from "../redux/actions";

export default (ChildComponent) => {
    class TodoItemsHoc extends Component {
        static mapStateToProps = ({selectedTodo, todo, communicatingWithFirebase}) => ({
            selectedTodo,
            todo,
            communicatingWithFirebase
        });

        constructor(){
            super();

            this.firebaseTodoRef = firebase.database().ref("/todo");
            this.isInitialMount = true;
        }

        isEditingTodo = () => this.props.selectedTodo >= 0;

        componentDidMount(){
            this.firebaseTodoRef.on("value", (snapshot) => {
                const todo = snapshot.val();
                this.props.dispatch(updateTodo((todo) ? todo : {}));

                if(this.isInitialMount){
                    this.props.dispatch(stopFirebaseCommunication());
                }

                this.isInitialMount = false;
            });
        }

        render(){
            return (
                <ChildComponent
                    firebaseTodoRef={this.firebaseTodoRef}
                    isEditingTodo={this.isEditingTodo()}
                    {...this.props}
                />
            );
        }
    }

    return connect(TodoItemsHoc.mapStateToProps)(TodoItemsHoc);
};