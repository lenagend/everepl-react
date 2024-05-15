import Typography from "@mui/joy/Typography";
import {Switch} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import {useEffect, useState} from "react";
import {useAuth} from "../../security/AuthProvider";

export default function NotificationSetting(){
    const [checked, setChecked] = useState(true);
    const { user, setUser, axiosInstance  } = useAuth();
    const updateUser = (checked) => {
        const formData = new FormData();
        formData.append('notificationSetting', checked);


        axiosInstance.patch(`http://localhost:8080/api/auth`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },})
            .then(response => {
                setChecked(response.data.notificationSetting);
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    };

    useEffect(() => {
        if (user) {
            setChecked(user.notificationSetting || false); // user가 존재하면 notificationSetting 값을 사용, 없으면 false
        }
    }, [user]);

    const handleNotificationSetting = (event) => {
        updateUser(event.target.checked);
    }

    if (!user) {
        return null;
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