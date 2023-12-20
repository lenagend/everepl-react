import {Box, Container, Divider, Grid} from "@mui/joy";
import UserCard from "../components/user/UserCard";
import * as React from "react";
import UrlConsole from "../components/url/UrlConsole";
import UrlListCard from "../components/url/UrlListCard";
import FloatingButtonBottomNavigation from "../components/menu/FloatingButtonBottomNavigation";
import Appbar from "../components/menu/Appbar";

const HomePage = () => {
    return(
        <Box sx={{pt: {
                xs: 7,
                sm: 11
            },
            pb: {
                    xs:7
                }}}>
            <Appbar />
            <Container maxWidth="md">
                <UserCard/>
                <UrlConsole/>
                <UrlListCard/>
            </Container>
            <FloatingButtonBottomNavigation/>
        </Box>
    )
}

export default HomePage;