import React, {Component, Fragment} from "react";
import colors from "../constants/colors";
import {TextInput} from "../styled/TextInput";
import {Button} from "react-native-elements";
import {startFirebaseCommunication, stopFirebaseCommunication} from "../redux/actions";

export default class AddTodoForm extends Component {
    state = {
        text: ""
    };

    handleTextChange = (text) => this.setState({text});

    handleButtonPress = () => {
        if(this.state.text !== ""){
            this.props.dispatch(startFirebaseCommunication());
            return this.props.firebaseTodoRef.push(this.state.text, () => {
                this.setState({text: ""});
                this.props.dispatch(stopFirebaseCommunication());
            });
        }
    };

    render(){
        return (
            <Fragment>
                <TextInput
                    onChangeText={this.handleTextChange}
                    value={this.state.text}
                    onSubmitEditing={this.handleButtonPress}
                    placeholder="Click here to add a new todo..."
                    editable={!this.props.communicatingWithFirebase}
                />
                <Button
                    title="Add Todo"
                    containerViewStyle={{margin: 10}}
                    backgroundColor={colors.primary}
                    onPress={this.handleButtonPress}
                    disabled={this.props.communicatingWithFirebase}
                    loading={this.props.communicatingWithFirebase}
                />
            </Fragment>
        );
    }
}