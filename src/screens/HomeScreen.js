import React, {Component} from "react";
import {Button, Text, Divider} from "react-native-elements";
import {Screen} from "../styled/Screen";
import {TextInput} from "../styled/TextInput";
import colors from "../constants/colors";
import * as firebase from "firebase";
import {TextList} from "../styled/TextList";
import {connect} from "react-redux";

class HomeScreen extends Component {
    static mapStateToProps = ({sample}) => ({sample});

    state = {
        text: "",
        todo: {},
        loading: true,
        highlight: -1
    };

    componentDidMount(){
        let isInitialMount = true;

        firebase.database().ref("/todo").on("value", (snapshot) => {
            const todo = snapshot.val();

            this.setState((prevState) => ({
                todo: (todo) ? todo : {},
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
        console.log(this.props);

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
                    data={Object.values(this.state.todo).reverse()}
                    renderItem={({item, index}) => (
                        <Text
                            style={{
                                padding: 20,
                                backgroundColor: (this.state.highlight === index) ? "#ddd" : "#fff"
                            }}
                            onPress={() => {
                                this.setState((prevState) => ({
                                    highlight: (prevState.highlight === index) ? -1 : index
                                }));
                            }}
                        >{item}</Text>
                    )}
                />
            </Screen>
        );
    }
}

export default connect(HomeScreen.mapStateToProps)(HomeScreen);