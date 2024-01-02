import * as React from "react";
import UrlConsole from "../components/url/UrlConsole";
import UrlListCard from "../components/url/UrlListCard";
import Stack from "@mui/joy/Stack";

const HomePage = () => {
    return(
            <Stack spacing={2}>
                <UrlConsole/>
                <UrlListCard/>
            </Stack>
    )
}

export default HomePage;