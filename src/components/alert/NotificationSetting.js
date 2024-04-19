import Typography from "@mui/joy/Typography";
import {Switch} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../security/AuthProvider";

export default function NotificationSetting(){
    const [checked, setChecked] = useState(true);
    const { user, axiosInstance, useRequireAuth  } = useAuth();

    const updateUser = () => {
        if (!useRequireAuth) return;

        const data = {
            notificationSetting: checked
        };

        axiosInstance.patch(`http://localhost:8080/api/auth`, data)
            .then(response => {
                console.log(response.data);
                setChecked(response.data.notificationSetting); // 서버 응답으로 상태 업데이트
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
        setChecked(event.target.checked)
        updateUser();
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