import {constants} from "./constants";

export const sampleAction = (string) => {
    return {
        type: constants.SAMPLE_ACTION,
        payload: string
    }
};