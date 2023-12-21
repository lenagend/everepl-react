import {isSafeInput} from "./stringUtils";

export function isValidUrl(string) {
    try {
        let decodedString = decodeURIComponent(string);
        if(!isSafeInput(decodedString)){
            return false;
        }
        new URL(string);
        return true;
    } catch (error) {
        return false;
    }
}
