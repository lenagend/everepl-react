import {Box, Container, Divider, Grid} from "@mui/joy";
import UserCard from "../components/user/UserCard";
import * as React from "react";
import UrlConsole from "../components/url/UrlConsole";
import UrlListCard from "../components/url/UrlListCard";

const HomePage = () => {
    return(
        <Box>
            <UserCard/>
            <UrlConsole/>
            <UrlListCard/>
        </Box>
    )
}

export default HomePage;