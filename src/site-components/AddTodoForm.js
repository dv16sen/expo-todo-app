import React, {Component, Fragment} from "react";
import firebase from "firebase";
import colors from "../constants/colors";
import {TextInput} from "../styled/TextInput";
import {Button} from "react-native-elements";
import {updateTodo} from "../redux/actions";

export default class AddTodoForm extends Component {
    state = {
        text: "",
        loading: true
    };

    componentDidMount(){
        let isInitialMount = true;

        firebase.database().ref("/todo").on("value", (snapshot) => {
            const todo = snapshot.val();

            this.props.dispatch(updateTodo((todo) ? todo : {}));

            this.setState((prevState) => ({
                loading: (isInitialMount) ? false : prevState.loading
            }), () => {
                isInitialMount = false;
            });
        });
    }

    handleTextChange = (text) => this.setState({text});

    handleButtonPress = () => {
        if(this.state.text !== ""){
            this.setState({loading: true}, () => {
                return firebase.database().ref("/todo").push(this.state.text, () => {
                    this.setState({text: "", loading: false});
                });
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
                />
                <Button
                    title="Add Todo"
                    containerViewStyle={{margin: 10}}
                    backgroundColor={colors.primary}
                    onPress={this.handleButtonPress}
                    disabled={this.state.loading}
                    loading={this.state.loading}
                />
            </Fragment>
        );
    }
}