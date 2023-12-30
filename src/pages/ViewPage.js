import {Box, Container } from "@mui/joy";
import UserCard from "../components/user/UserCard";
import * as React from "react";
import UrlConsole from "../components/url/UrlConsole";
import UrlListCard from "../components/url/UrlListCard";
import FloatingButtonBottomNavigation from "../components/menu/FloatingButtonBottomNavigation";
import Appbar from "../components/menu/Appbar";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import TextAreaBottomNavigation from "../components/menu/TextAreaBottomNavigation";

const ViewPage = () => {
    let { id } = useParams();

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
            <TextAreaBottomNavigation/>
            <FloatingButtonBottomNavigation/>
        </Box>
    )
}

export default ViewPage;