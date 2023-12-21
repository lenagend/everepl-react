import React, { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {isValidUrl} from "../utils/urlUtils";

function WildcardPage() {
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const fullPath = location.pathname.slice(1) + location.search;

        // URL 유효성 검사
        if (isValidUrl(fullPath)) {
            navigate(`/?url=${fullPath}`);
        } else {
            // 유효하지 않은 URL인 경우 404 페이지로 네비게이트
            navigate('/404');
        }


    }, [location, navigate]);

    return null;
}

export default WildcardPage;
