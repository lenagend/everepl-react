import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import {useAuth} from "../../security/AuthProvider";
import { useNavigate, useLocation } from 'react-router-dom';


export default function LoginCard() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // 리다이렉트 후 돌아올 페이지 설정 (기본값은 홈 '/')
    const { from } = location.state || { from: { pathname: "/" } };

    const handleLogin = (providerUrl) => {
        const oauthWindow = window.open(
            providerUrl,
            'oauthPopup',
            'width=600,height=700'
        );

        const handleOAuthMessage = (event) => {
            if (event.origin !== "http://localhost:8080") return; // 메시지 소스 검증

            const { token } = event.data;
            if (token) {
                window.removeEventListener('message', handleOAuthMessage);

                // 로그인 상태 업데이트
                login(token); // login 함수에 JWT 토큰을 인자로 넘깁니다. 이 토큰은 상태 관리에 사용됩니다.

                // 사용자를 원래 페이지로 리다이렉트
                navigate(from, { replace: true });
            }
        };

        window.addEventListener('message', handleOAuthMessage, false);
    };

    return (
        <Card
            color="primary"
            orientation="vertical"
            size="lg"
            variant="outlined"
        >
            <Stack sx={{ width: { xs: '100%', sm: 300 } }} spacing={1.5} alignItems="center">
                <img
                    width="250"
                    height={50}
                    src="/images/sns/googleLoginButton.png"
                    onClick={() => handleLogin('http://localhost:8080/oauth2/authorization/google')}
                    style={{ cursor: 'pointer' }}
                />
                <img
                    width="250"
                    height={50}
                    src="/images/sns/kakaoLoginButton.png"
                    onClick={() => handleLogin('http://localhost:8080/oauth2/authorization/kakao')}
                    style={{ cursor: 'pointer' }}
                />
                <img
                    width="250"
                    height={50}
                    src="/images/sns/naverLoginButton.png"
                    onClick={() => handleLogin('http://localhost:8080/oauth2/authorization/naver')}
                    style={{ cursor: 'pointer' }}
                />
            </Stack>
        </Card>
    );
}
