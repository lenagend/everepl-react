import {Box, Container} from "@mui/joy";
import UrlCard from "../components/url/UrlCard";
import {useLocation} from "react-router-dom";
import CommentBox from "../components/comments/CommentBox";
import TextAreaBottomNavigation from "../components/menu/TextAreaBottomNavigation";

const CommentPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get('url');
    return(
        <Box>
            <Container maxWidth="md">
                <UrlCard isViewPage={true}/>
                <CommentBox/>
            </Container>
            <TextAreaBottomNavigation/>
        </Box>
    )
}

export default CommentPage;