import {Box, Container} from "@mui/joy";
import UrlCard from "../components/card/UrlCard";
import {useLocation} from "react-router-dom";
import CommentBox from "../components/comments/CommentBox";
import ViewPageBottomNavigation from "../components/menu/ViewPageBottomNavigation";

const ViewPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get('url');
    return(
        <Box>
            <Container maxWidth="md">
                <UrlCard isViewPage={true}/>
                <CommentBox/>
            </Container>
            <ViewPageBottomNavigation/>
        </Box>
    )
}

export default ViewPage;