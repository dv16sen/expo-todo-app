import {KeepAwake, registerRootComponent} from 'expo';
import HomeScreen from "./screens/HomeScreen";

if (__DEV__) {
    KeepAwake.activate();
}

registerRootComponent(HomeScreen);