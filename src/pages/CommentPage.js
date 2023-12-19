import {Box, Container} from "@mui/joy";
import UrlCardContent from "../components/url/UrlCardContent";
import {useLocation} from "react-router-dom";
import CommentCard from "../components/comments/CommentCard";
import TextAreaBottomNavigation from "../components/menu/TextAreaBottomNavigation";
import * as React from "react";
import UrlCard from "../components/url/UrlCard";
import Stack from "@mui/joy/Stack";
import UserCard from "../components/user/UserCard";
import CommentList from "../components/comments/CommentList";

const CommentPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get('url');
    return(
        <Box>
            <Container maxWidth="md" sx={{px: 0.5}}>
                <Stack spacing={2} sx={{mt: 2}}>
                    <UserCard/>
                    <UrlCard isViewPage={true}/>
                    <CommentList/>
                </Stack>
            </Container>
            <TextAreaBottomNavigation/>
        </Box>
    )
}

export default CommentPage;