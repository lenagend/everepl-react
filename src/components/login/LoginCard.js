import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import * as React from "react";


export default function LoginCard() {
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
                oauthWindow.close();
                window.removeEventListener('message', handleOAuthMessage);

                // 토큰을 사용하여 애플리케이션 상태 업데이트
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
