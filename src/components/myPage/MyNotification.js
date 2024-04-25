import MyMenuConsole from "../menu/MyMenuConsole";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import LoadingUrlCardList from "../loading/LoadingUrlCardList";
import {useEffect, useState} from "react";
import {useAuth} from "../../security/AuthProvider";
import {useLocation, useNavigate} from "react-router-dom";
import NotExistNotificationList from "../loading/NotExistNotificationList";
import Alert from '@mui/joy/Alert';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import Button from "@mui/joy/Button";
import {Chip, Typography} from "@mui/joy";

export default function MyNotification() {
    const location = useLocation();
    const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const { axiosInstance, user } = useAuth();
    const navigate = useNavigate();

    // 페이지 변경 핸들러
    useEffect(() => {
        if (user && user.id) {
            fetchNotifications();
        }
    }, [page, user]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const pageParam = parseInt(queryParams.get('page'), 10);
        if (pageParam) setPage(pageParam);

    }, [location]);

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

    const handleLinkButtonClick = (link) => {
        navigate(link);
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
                    <Alert color={"primary"} variant={"outlined"} key={notification.id} sx={{display: 'flex'}}
                           startDecorator={<Chip color={"primary"}>읽지않음</Chip>}
                            endDecorator={notification.link ?
                                <Button size="sm" variant="solid" onClick={() => handleLinkButtonClick(notification.link)}>
                                보러가기
                                </Button> : null}
                    >
                        <Stack sx={{maxWidth: 400}}>
                            <Typography sx={{maxWidth: 100}}> {notification.title}</Typography>
                            <Typography sx={{maxWidth: 100}}>{notification.message}</Typography>
                        </Stack>
                    </Alert >
                ))
            )}
        </Stack>
    );
}