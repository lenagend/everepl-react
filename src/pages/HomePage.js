import {Box, Container, Divider, Grid} from "@mui/joy";
import UserCard from "../components/user/UserCard";
import * as React from "react";
import UrlConsole from "../components/url/UrlConsole";
import UrlListCard from "../components/url/UrlListCard";
import FloatingButtonBottomNavigation from "../components/menu/FloatingButtonBottomNavigation";
import Appbar from "../components/menu/Appbar";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import TextAreaBottomNavigation from "../components/menu/TextAreaBottomNavigation";

const HomePage = () => {
    const [url, setUrl] = useState('');
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const urlParam = queryParams.get('url');
        if (urlParam) setUrl(urlParam);
    }, [location]);

    return(
        <Box sx={{pt: {
                xs: 7,
                sm: 11
            },
            pb: {
                    xs:7
                }}}>
            <Appbar url={url}/>
            <Container maxWidth="md">
                <UserCard/>
                <UrlConsole/>
                <UrlListCard/>
            </Container>
            <TextAreaBottomNavigation/>
            <FloatingButtonBottomNavigation/>
        </Box>
    )
}

export default HomePage;