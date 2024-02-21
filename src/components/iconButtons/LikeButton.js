import {IconButton, Snackbar, Typography} from "@mui/joy";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import * as React from "react";
import axios from "axios";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {useState} from "react";
import Box from "@mui/joy/Box";

export default function LikeButton({ targetId, targetType }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleLikeClick = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/like/add', {
                targetId: targetId,
                type: targetType
            });
            setMessage('성공적으로 좋아요 되었습니다.');
        } catch (error) {
            setMessage('좋아요에 실패했습니다. ' + error.response ? error.response.data : error.message);
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleMessageClose = () => {
        setSnackbarOpen(false);
        setMessage('');
    }

    return (
        <Box>
        <IconButton onClick={handleLikeClick}>
            <FavoriteBorderOutlinedIcon />
        </IconButton>

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
        </Box>
    );
}