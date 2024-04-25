import * as React from "react";
import Stack from "@mui/joy/Stack";
import MyMenuConsole from "../components/menu/MyMenuConsole";

const MyPage = () => {

    return(
        <Stack spacing={2}>
            <MyMenuConsole currentPath={"/my"} />
        </Stack>
    )
}

export default MyPage;