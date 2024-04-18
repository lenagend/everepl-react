import {IconButton, Snackbar, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import {useAuth} from "../../security/AuthProvider";
import Link from "@mui/joy/Link";
import * as React from "react";
import EmailIcon from '@mui/icons-material/Email';
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import CloseIcon from '@mui/icons-material/Close';

export default function UserNotification() {
    const [state, setState] = useState({
        open: false,
        message: {}, // 알림 메시지 저장
        vertical: 'top', // 위치: 상단
        horizontal: 'center', // 위치: 중앙
    });
    const { user } = useAuth();

    useEffect(() => {
        if (!user || !user.userId) return;  // Make sure user and user.userId exist
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, function(frame) {
            const subscriptionPath = `/topic/user.${user.userId}`;
            stompClient.subscribe(subscriptionPath, function(notification) {
                const data = JSON.parse(notification.body);
                handleNotificationOpen(data);
            });
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [user]);

    const handleNotificationOpen = (data) => {
        setState({ ...state, open: true, message: data });
    };

    const handleNotificationClose = () => {
        setState({ ...state, open: false, message: {} });
    };

    return(
        <Box>
            {state.message && Object.keys(state.message).length > 0 && (
                <Snackbar
                    anchorOrigin={{
                        vertical: state.vertical,
                        horizontal: state.horizontal
                    }}
                    open={state.open}
                    autoHideDuration={5000}
                    onClose={handleNotificationClose}
                    variant="soft"
                    color="primary"
                    size="lg"
                    sx={{ opacity: 0.9 }}
                    endDecorator={<IconButton onClick={handleNotificationClose} sx={{zIndex: 10}}><CloseIcon/></IconButton>}
                >
                    <Stack>
                        <Link
                            underline="none"
                            href={state.message.rootUrl}
                            sx={{ zIndex: 5 }}
                            overlay
                        >
                        </Link>
                        <Typography startDecorator={<EmailIcon />}>
                            {state.message.user.name}님으로부터
                        </Typography>
                        <Typography level="title-md">
                            {state.message.text}
                        </Typography>
                    </Stack>
                </Snackbar>
            )}
        </Box>
    );

}