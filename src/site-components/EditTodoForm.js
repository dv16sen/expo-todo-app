import React, {Component, Fragment} from "react";
import colors from "../constants/colors";
import {TextInput} from "../styled/TextInput";
import {Button} from "react-native-elements";
import {
    deselectTodo,
    startFirebaseCommunication,
    stopFirebaseCommunication
} from "../redux/actions";

export default class EditTodoForm extends Component {
    constructor(props){
        super();

        this.state = {
            text: props.todo[props.selectedTodo].value
        };
    }

    handleTextChange = (text) => this.setState({text});

    handleFormSubmit = () => {
        if(this.state.text !== ""){
            const itemToEdit = this.props.todo[this.props.selectedTodo];

            this.props.dispatch(startFirebaseCommunication());
            return this.props
                .firebaseTodoRef
                .update({[itemToEdit.key]: this.state.text}, () => {
                    this.props.dispatch(stopFirebaseCommunication());
                    this.props.dispatch(deselectTodo());
                });
        }

        this.props.dispatch(deselectTodo());
    };

    render(){
        return (
            <Fragment>
                <TextInput
                    onChangeText={this.handleTextChange}
                    value={this.state.text}
                    onSubmitEditing={this.handleFormSubmit}
                    onEndEditing={() => this.props.dispatch(deselectTodo())}
                    editable={!this.props.communicatingWithFirebase}
                    autoFocus={true}
                />
                <Button
                    title="Edit Todo"
                    containerViewStyle={{margin: 10}}
                    backgroundColor={colors.primary}
                    onPress={this.handleFormSubmit}
                    disabled={this.props.communicatingWithFirebase}
                    loading={this.props.communicatingWithFirebase}
                />
            </Fragment>
        );
    }
}