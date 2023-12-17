import {Box, Container} from "@mui/joy";
import UrlCard from "../components/card/UrlCard";
import FloatingButtonBottomNavigation from "../components/menu/FloatingButtonBottomNavigation";

const HomePage = () => {
    return(
        <Box>
            <Container maxWidth="md">
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