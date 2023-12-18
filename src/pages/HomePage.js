import {Box, Container} from "@mui/joy";
import UrlCard from "../components/url/UrlCard";
import UserCard from "../components/user/UserCard";
import AnonymousCard from "../components/user/AnonymousCard";

const HomePage = () => {
    return(
        <Box>
            <Container maxWidth="md">
                <UserCard/>
                <AnonymousCard/>
                <UrlCard isViewPage={false}/>
                <UrlCard isViewPage={false}/>
                <UrlCard isViewPage={false}/>
                <UrlCard isViewPage={false}/>
                <UrlCard isViewPage={false}/>
                <UrlCard isViewPage={false}/>
                <UrlCard isViewPage={false}/>
                <UrlCard isViewPage={false}/>
                <UrlCard isViewPage={false}/>
            </Container>
        </Box>
    )
}

export default HomePage;