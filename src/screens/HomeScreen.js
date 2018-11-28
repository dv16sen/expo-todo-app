import React, {Component} from "react";
import {Button, Text, Divider} from "react-native-elements";
import {Screen} from "../styled/Screen";
import {TextInput} from "../styled/TextInput";
import colors from "../constants/colors";
import * as firebase from "firebase";
import {TextList} from "../styled/TextList";
import {connect} from "react-redux";
import {deselectTodo, selectTodo, updateTodo} from "../redux/actions";

class HomeScreen extends Component {
    static mapStateToProps = ({selectedTodo, todo}) => ({selectedTodo, todo});

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
            <Screen>
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
                <Divider/>
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
            </Screen>
        );
    }
}

export default connect(HomeScreen.mapStateToProps)(HomeScreen);