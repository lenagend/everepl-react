import Typography from "@mui/joy/Typography";
import {Switch} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import {useState} from "react";

export default function NotificationSetting(){
    const [checked, setChecked] = useState(true);

    const handleNotificationSetting = (event) => {
        setChecked(event.target.checked)
    }
    return(
        <Stack alignItems={"center"}>
            <Typography level={"title-sm"} sx={{color: 'white'}} component="label">
                알림
            </Typography>
            <Switch
                checked={checked}
                onChange={handleNotificationSetting}
            />
        </Stack>
    );
}