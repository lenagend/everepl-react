import {IconButton, Snackbar, Typography} from "@mui/joy";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import * as React from "react";
import axios from "axios";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {useState} from "react";
import Box from "@mui/joy/Box";
import {useAuth} from "../../security/AuthProvider";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Stack from "@mui/joy/Stack";

export default function ({ targetId, targetType, likeButtonContext}) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { axiosInstance, requireAuth  } = useAuth();

    const handleLikeClick = async () => {
        const isAuthValid = await requireAuth(); // requireAuth의 결과를 기다립니다.
        if (!isAuthValid) return; // 인증이 유효하지 않으면 함수를 종료합니다.

        try {
            const response = await axiosInstance.post('http://localhost:8080/api/like/add', {
                targetId: targetId,
                type: targetType
            });
            setMessage('성공적으로 좋아요 되었습니다.');
        } catch (error) {
            setMessage('좋아요에 실패했습니다. ' + error.response.data.message);
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleMessageClose = () => {
        setSnackbarOpen(false);
        setMessage('');
    }


    const renderLikeButton = () => {
        switch (likeButtonContext) {
            case 'COMMENT':
                return (
                    <IconButton onClick={handleLikeClick} variant="plain" sx={{
                        "--IconButton-size": "20px",
                        ml: -0.5
                    }}>
                        <FavoriteTwoToneIcon color="action" sx={{ fontSize: 20 }}/>
                    </IconButton>
                );
            default:
                return (
                    <IconButton onClick={handleLikeClick}>
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                );
        }
    };

    return (
        <Stack alignContent={"center"} justifyContent={"center"}>
            {renderLikeButton()}
            <Snackbar
            autoHideDuration={5000}
            open={snackbarOpen}
            color="neutral"
            variant="outlined"
            size="lg"
            onClose={handleMessageClose}
            startDecorator={<ErrorOutlineRoundedIcon/>}
            endDecorator={
                <IconButton color="neutral" onClick={handleMessageClose}>
                    <CloseRoundedIcon/>
                </IconButton>
            }
        >
            <Typography color="neutral" level="title-md" >{message}</Typography>
        </Snackbar>
        </Stack>
    );
}