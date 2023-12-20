import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import CardOverflow from "@mui/joy/CardOverflow";
import * as React from "react";
import {Typography} from "@mui/joy";
import Link from "@mui/joy/Link";
import LogoButton from "../iconButtons/LogoButton";

export default function LoginCard() {
    return (
        <Card orientation="horizontal" variant="outlined" sx={{gap: 0}}>
            <CardContent>
                <Stack>
                    <LogoButton width={'80px'}/>
                </Stack>
                <Stack spacing={1} alignItems="center">
                    <Typography level="h2">
                        로그인
                    </Typography>
                    <Typography level="title-lg">
                        SNS로 1초만에 회원가입/로그인 하세요!
                    </Typography>
                    <Card orientation="horizontal" variant="outlined" sx={{width: {
                            xs: '100%',
                            sm: 300
                        }}}>
                        <CardContent>
                            <Stack spacing={1} alignItems="center">                                
                                <Typography level="body-md">
                                    프로필 설정 및
                                </Typography>
                                <Typography level="body-md">
                                    작성글 확인, 알림 기능을
                                </Typography>
                                <Typography level="body-md">
                                    100%이용하실 수 있습니다
                                </Typography>
                            </Stack>
                        </CardContent>
                        <CardOverflow
                            variant="soft"
                            color="primary"
                            sx={{
                                px: 0.2,
                                writingMode: 'vertical-rl',
                                textAlign: 'center',
                                fontSize: 'xs',
                                fontWeight: 'xl',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                borderLeft: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            기능
                        </CardOverflow>
                    </Card>
                    <Card sx={{width: {
                        xs: '100%',
                            sm: 300
                        }}}>
                        <Link href="#variants">
                            <img width="100%" height={70} src="/images/sns/googleLoginButton.png" />
                        </Link>
                        <Link href="#variants" >
                             <img width="100%" height={70} src="/images/sns/kakaoLoginButton.png" />
                        </Link>
                        <Link href="#variants">
                            <img width="100%" height={70} src="/images/sns/naverLoginButton.png" />
                        </Link>
                    </Card>
                </Stack>
            </CardContent>
        </Card>
    )
}