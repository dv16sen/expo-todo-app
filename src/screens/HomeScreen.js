import React, {Component} from "react";
import {Text, Button} from "react-native-elements";
import {Screen} from "../styled/Screen";
import {TextInput} from "../styled/TextInput";
import * as firebase from "firebase";

export default class HomeScreen extends Component {
    state = {
        text: "",
        todo: {}
    };

    componentDidMount(){
        firebase.database().ref("/todo").on("value", (snapshot) => {
            const todo = snapshot.val();

            this.setState({todo: (todo) ? todo : {}});
        });
    }

    handleTextChange = (text) => this.setState({text});

    handleButtonPress = () => {
        return firebase.database().ref("/todo").push(this.state.text);
    };

    render(){
        return (
            <Screen>
                <Text h1 style={{textAlign: "center"}}>TODO</Text>
                <TextInput
                    onChangeText={this.handleTextChange}
                    value={this.state.text}
                />
                <Button
                    title="Add Todo"
                    onPress={this.handleButtonPress}
                />
                {Object.values(this.state.todo).map((todoItem, i) => (
                    <Text key={i} h1 style={{textAlign: "center"}}>
                        {todoItem}
                    </Text>
                ))}
            </Screen>
        );
    }
}
