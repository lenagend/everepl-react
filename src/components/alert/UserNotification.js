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
import {useNavigate} from "react-router-dom";
import {SPRING_BOOT_SERVER_URL} from "../../config/Config";

export default function UserNotification() {
    const [state, setState] = useState({
        open: false,
        message: {}, // 알림 메시지 저장
        vertical: 'top', // 위치: 상단
        horizontal: 'center', // 위치: 중앙
    });
    const { axiosInstance, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.id) return;  // Make sure user and user.userId exist
        const socket = new SockJS(SPRING_BOOT_SERVER_URL + '/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, function(frame) {
            const subscriptionPath = `/topic/user.${user.id}`;
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

    const updateNotificationStatus = async (notificationId, status) => {
        try {
            await axiosInstance.put(`/notifications/status`, {
                notificationId: notificationId,
                status: status
            });
        } catch (error) {
            console.error('Error updating notification status', error);
        }
    };


    const handleLinkButtonClick = (notificationId, link) => {
        updateNotificationStatus(notificationId, 'READ').then(navigate(link));
    }

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
                    size="lg"
                    sx={{ opacity: 0.9 }}
                    startDecorator={<EmailIcon />}
                    endDecorator={<IconButton onClick={handleNotificationClose} sx={{zIndex: 10}}><CloseIcon/></IconButton>}

                >
                    <Stack>
                        <Link
                            underline="none"
                            sx={{ zIndex: 5 }}
                            overlay
                            onClick={() => handleLinkButtonClick(state.message.id, state.message.link)}
                        >
                        </Link>
                        <Stack spacing={2}>
                            <Typography >
                                {state.message.title}
                            </Typography>
                            <Typography level="title-md">
                                {state.message.message}
                            </Typography>
                        </Stack>
                    </Stack>
                </Snackbar>
            )}
        </Box>
    );

}