import {Box, Container, Typography} from "@mui/joy";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import LoginCard from "../components/login/LoginCard";
import LogoButton from "../components/iconButtons/LogoButton";

const LoginPage = () => {
    return(
        <Box>
            <Container maxWidth="sm" >
                <Stack spacing={2} justifyContent="center" alignItems="center">
                    <LogoButton width={"100px"} variant={"soft"} border={'1.5px dotted black'}/>
                    <Typography level="body-lg" sx={{fontSize: 30}} textAlign="center">
                        에브리플 로그인
                    </Typography>
                    <Typography level="title-lg" textAlign="center">
                        SNS로 1초만에 회원가입/로그인 하세요!
                    </Typography>
                   <LoginCard />
                </Stack>
            </Container>
        </Box>
    )
}

export default LoginPage;