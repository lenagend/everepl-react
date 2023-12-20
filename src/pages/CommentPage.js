import {Box, Container} from "@mui/joy";
import {useLocation} from "react-router-dom";
import TextAreaBottomNavigation from "../components/menu/TextAreaBottomNavigation";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import UserCard from "../components/user/UserCard";
import CommentList from "../components/comments/CommentList";
import UrlCard from "../components/url/UrlCard";
import FloatingButtonBottomNavigation from "../components/menu/FloatingButtonBottomNavigation";
import Appbar from "../components/menu/Appbar";

const CommentPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get('url');
    return(
        <Box sx={{pt: {
                xs: 7,
                sm: 11
            },
            pb: {
                xs:7
            }}}>
            <Appbar />
            <Container maxWidth="md" sx={{mb: 10}}>
                <Stack spacing={2} sx={{mt: 2}}>
                    <UserCard/>
                    <UrlCard isCommentPage={true}/>
                    <CommentList/>
                </Stack>
            </Container>
            <TextAreaBottomNavigation/>
            <FloatingButtonBottomNavigation/>
        </Box>
    )
}

export default CommentPage;