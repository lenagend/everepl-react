import React, { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {ensureHttpOrHttps, isValidUrl} from "../utils/urlUtils";

function WildcardPage() {
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const fullPath = location.pathname.slice(1) + location.search;
        const url =  ensureHttpOrHttps(fullPath);

        // URL 유효성 검사
        if (isValidUrl(url)) {
            navigate(`/?url=${url}`);
        } else {
            // 유효하지 않은 URL인 경우 404 페이지로 네비게이트
            navigate('/404');
        }


    }, [location, navigate]);

    return null;
}

export default WildcardPage;
