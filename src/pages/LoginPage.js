import {Box, Container} from "@mui/joy";
import CommentEditor from "../components/menu/CommentEditor";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import LoginCard from "../components/login/LoginCard";

const LoginPage = () => {
    return(
        <Box>
            <Container maxWidth="sm" >
                <Stack spacing={2} sx={{height: '100vh'}} justifyContent="center">
                   <LoginCard />
                </Stack>
            </Container>
        </Box>
    )
}

export default LoginPage;