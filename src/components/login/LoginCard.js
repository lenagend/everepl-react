import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import {useAuth} from "../../security/AuthProvider";
import {SPRING_BOOT_SERVER_URL} from "../../config/Config";
import {useEffect, useRef, useState} from "react";
import {useSnackbar} from "../../contexts/SnackbarProvider";


export default function LoginCard() {
    const { login } = useAuth();
    const [isHuman, setIsHuman] = useState(false);
    const turnstileRef = useRef(null);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (turnstileRef.current) {
            // Turnstile 위젯 렌더링
            window.turnstile.render(turnstileRef.current, {
                sitekey: "0x4AAAAAAAcY2CIg-LaCzoah", // 받은 사이트 키로 교체
                callback: (token) => {
                    if (token) {
                        setIsHuman(true); // 토큰이 생성되면 사람이 확인됨
                    }
                },
            });
        }
    }, []);


    const handleLogin = (providerUrl) => {
        if (!isHuman) {
            showSnackbar('사람인지를 확인해야 가입 가능합니다...', 'warning');
            return;
        }

        const oauthWindow = window.open(
            providerUrl,
            'oauthPopup',
            'width=600,height=700'
        );

        const handleOAuthMessage = (event) => {
            if (event.origin !== SPRING_BOOT_SERVER_URL) return; // 메시지 소스 검증

            const { token } = event.data;
            if (token) {
                window.removeEventListener('message', handleOAuthMessage);
                // 로그인 상태 업데이트
                login(token); // login 함수에 JWT 토큰을 인자로 넘깁니다. 이 토큰은 상태 관리에 사용됩니다.
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
                <div ref={turnstileRef}></div> {/* Cloudflare Turnstile 위젯이 렌더링될 영역 */}
                <img
                    width="250"
                    height={50}
                    src="/images/sns/googleLoginButton.png"
                    onClick={() => handleLogin(SPRING_BOOT_SERVER_URL + '/oauth2/authorization/google')}
                    style={{ cursor: 'pointer' }}
                />
                <img
                    width="250"
                    height={50}
                    src="/images/sns/kakaoLoginButton.png"
                    onClick={() => handleLogin(SPRING_BOOT_SERVER_URL + '/oauth2/authorization/kakao')}
                    style={{ cursor: 'pointer' }}
                />
                <img
                    width="250"
                    height={50}
                    src="/images/sns/naverLoginButton.png"
                    onClick={() => handleLogin(SPRING_BOOT_SERVER_URL + '/oauth2/authorization/naver')}
                    style={{ cursor: 'pointer' }}
                />
            </Stack>
        </Card>
    );
}
