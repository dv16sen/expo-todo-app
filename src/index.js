import React, {Component} from "react";
import {KeepAwake, registerRootComponent} from 'expo';
import HomeScreen from "./screens/HomeScreen";
import * as firebase from "firebase";
import {Provider} from "react-redux";
import {initStore} from "./redux/store";
import firebaseConfig from "../firebase.config";

class Root extends Component {
    render(){
        return (
            <Provider store={initStore()}>
                <HomeScreen/>
            </Provider>
        );
    }
}

if (__DEV__) {
    KeepAwake.activate();
}

firebase.initializeApp(firebaseConfig);
registerRootComponent(Root);