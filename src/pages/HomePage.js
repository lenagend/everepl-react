import {Box, Container} from "@mui/joy";
import UrlCard from "../components/card/UrlCard";

const HomePage = () => {
    return(
        <Box>
            <Container maxWidth="md">
                <UrlCard/>
                <UrlCard/>
                <UrlCard/>
            </Container>
        </Box>
    )
}

export default HomePage;