import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const TimeAgo = ({ time }) => {
    // 서버에서 받은 날짜가 ISO 8601 형식의 문자열인 경우 Date 객체로 변환
    const date = new Date(time);

    // 현재 시간과의 차이를 계산하여 문자열로 반환
    const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: ko }); // 한국어 로케일 사용

    return <span>{timeAgo}</span>;
};

export default TimeAgo;
