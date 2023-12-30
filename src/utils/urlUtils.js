import {isSafeInput} from "./stringUtils";

export function isValidUrl(url) {
    try {
        let decodedString = decodeURIComponent(url);
        if(!isSafeInput(decodedString)){
            return false;
        }
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}


export  function ensureHttpOrHttps(url) {
    // URL이 이미 http나 https로 시작하는지 확인
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // http를 기본 프로토콜로 추가
        return 'http://' + url;
    }
    // URL이 이미 올바른 프로토콜을 가지고 있다면 그대로 반환
    return url;
}
