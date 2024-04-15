import MyMenuConsole from "../menu/MyMenuConsole";
import Stack from "@mui/joy/Stack";
import * as React from "react";

export default function Profile() {
    return(
        <Stack spacing={2}>
            <MyMenuConsole currentPath={"/my/profile"} />

        </Stack>
    );
}