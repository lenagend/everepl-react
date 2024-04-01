import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import CardOverflow from "@mui/joy/CardOverflow";
import * as React from "react";
import {Box, Divider, Typography} from "@mui/joy";
import Link from "@mui/joy/Link";
import LogoButton from "../iconButtons/LogoButton";
import {CardHeader} from "@mui/material";

export default function LoginCard() {
    const googleLogin = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/google`; // 백엔드 OAuth2 로그인 경로로 리다이렉트
    }

    return (
        <Card
            color="primary"
            orientation="vertical"
            size="lg"
            variant="outlined"
        >
        <Stack sx={{width: {
                xs: '100%',
                sm: 300,
            }}}
               spacing={1.5}
               alignItems="center"
        >
            <Link href="http://localhost:8080/oauth2/authorization/google">
                <img width="250" height={50} src="/images/sns/googleLoginButton.png" />
            </Link>
            <Link href="#variants" >
                <img width="250" height={50} src="/images/sns/kakaoLoginButton.png" />
            </Link>
            <Link href="#variants">
                <img width="250" height={50} src="/images/sns/naverLoginButton.png" />
            </Link>
        </Stack>
        </Card>
    )
}