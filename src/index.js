import {KeepAwake, registerRootComponent} from 'expo';
import HomeScreen from "./screens/HomeScreen";
import * as firebase from "firebase";

if (__DEV__) {
    KeepAwake.activate();
}

firebase.initializeApp({
    databaseURL: "https://todo-33ca4.firebaseio.com/"
});

registerRootComponent(HomeScreen);