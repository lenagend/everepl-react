import MyMenuConsole from "../menu/MyMenuConsole";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import LoadingUrlCardList from "../loading/LoadingUrlCardList";
import {useEffect, useState} from "react";
import {useAuth} from "../../security/AuthProvider";
import {useLocation, useNavigate} from "react-router-dom";
import NotExistNotificationList from "../loading/NotExistNotificationList";
import Alert from '@mui/joy/Alert';
import Button from "@mui/joy/Button";
import {Chip, Typography} from "@mui/joy";
import {formatDate} from "../../utils/stringUtils";

const statusText = {
    UNREAD: '읽지않음',
    READ: '읽음'
};


export default function MyNotification() {
    const location = useLocation();
    const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const { axiosInstance, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.id) {
            fetchNotifications();
        }
    }, [user]);

    const fetchNotifications = async () => {
        if (!user || !user.id) return; // user.id가 없는 경우 함수를 종료합니다.

        axiosInstance.get(`http://localhost:8080/api/notifications/user/${user.id}`)
            .then(response => {
                setNotifications(response.data);
                setIsNotificationsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data', error);
                setIsNotificationsLoading(true);
            });
    };

    const updateNotificationStatus = async (notificationId, status) => {
        try {
            await axiosInstance.put(`http://localhost:8080/api/notifications/status`, {
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
        <Stack spacing={2}>
            <MyMenuConsole currentPath={location.pathname} />
            {isNotificationsLoading ? (
                <LoadingUrlCardList/>
            ) : notifications.content.length === 0 ? (
                <NotExistNotificationList/>
            ) : (
                notifications.content.map(notification => ( // 알림 데이터가 있는 경우 각 알림을 반복하여 렌더링
                    <Alert color={notification.notificationStatus === 'UNREAD' ? 'primary' : 'neutral'} variant={"outlined"} key={notification.id} sx={{display: 'flex'}}
                           startDecorator={<Chip color={notification.notificationStatus === 'UNREAD' ? 'primary' : 'neutral'}>{statusText[notification.notificationStatus] || '알 수 없음'}</Chip>}
                            endDecorator={notification.link ?
                                <Button color={notification.notificationStatus === 'UNREAD' ? 'primary' : 'neutral'} size="sm" variant="solid" onClick={() => handleLinkButtonClick(notification.id, notification.link)}>
                                보러가기
                                </Button> : null}
                    >
                        <Stack sx={{maxWidth: 400}} spacing={2}>
                            <Typography> {notification.title}</Typography>
                            <Typography>{notification.message}</Typography>
                            <Typography level={'body-xs'}>{formatDate(notification.createdAt)}</Typography>
                        </Stack>
                    </Alert >
                ))
            )}
        </Stack>
    );
}