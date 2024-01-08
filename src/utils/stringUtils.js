// stringUtils.js

/**
 * 잠재적으로 위험한 문자열을 검사하고 차단하는 함수.
 * @param {string} input - 검사할 문자열.
 * @returns {boolean} - 문자열이 안전한 경우 true, 위험한 경우 false 반환.
 */
export function isSafeInput(input) {
    // 위험한 HTML 태그, 스크립트, 이벤트 핸들러 등의 패턴 목록
    const unsafePatterns = [
        /<script>/i,              // 스크립트 태그
        /<\/script>/i,            // 스크립트 종료 태그
        /javascript:/i,           // 자바스크립트 URL 스키마
        /onerror=/i,              // 이벤트 핸들러
        /onload=/i,
        /<iframe>/i,              // iframe 태그
        /<object>/i,              // object 태그
        /<embed>/i,               // embed 태그
        /<link>/i,                // link 태그
        /<style>/i,               // style 태그
        /<img/i,                  // img 태그
        /<svg/i,                  // svg 태그
        /<applet>/i,              // applet 태그
        /<meta>/i,                // meta 태그
        /<body>/i,                // body 태그
        /<form>/i,                // form 태그
        /document\.cookie/i,      // 쿠키 접근
        /window\.location/i,      // 위치 정보 접근
        /<input>/i                // input 태그
        //여기에 추가
    ];

    // 입력된 문자열이 위험한 패턴 중 하나라도 포함하고 있는지 검사
    return !unsafePatterns.some(pattern => pattern.test(input));
}

export function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
}
