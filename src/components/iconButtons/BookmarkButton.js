import {IconButton, Snackbar, Typography} from "@mui/joy";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import * as React from "react";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {useState} from "react";
import Box from "@mui/joy/Box";

export default function BookmarkButton({ targetId, targetType }) {

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleBookmarkClick = async () => {
        // 로컬 스토리지에서 기존 북마크 목록을 가져옵니다.
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

        // 동일한 targetId와 targetType을 가진 북마크가 이미 있는지 확인합니다.
        const alreadyBookmarked = bookmarks.some(bookmark => bookmark.targetId === targetId && bookmark.targetType === targetType);

        if (!alreadyBookmarked) {
            // 새 북마크 객체를 생성합니다.
            const newBookmark = { targetId, targetType };

            // 새 북마크를 기존 목록에 추가합니다.
            bookmarks.push(newBookmark);

            // 업데이트된 북마크 목록을 로컬 스토리지에 저장합니다.
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

            // 사용자에게 알림 메시지를 설정합니다.
            setMessage('성공적으로 북마크에 저장되었습니다.');
        } else {
            // 이미 북마크에 추가된 경우 메시지를 설정합니다.
            setMessage('이미 북마크 목록에 있습니다.');
        }

        // 스낵바를 열어 사용자에게 피드백을 제공합니다.
        setSnackbarOpen(true);
    };

    const handleMessageClose = () => {
        setSnackbarOpen(false);
        setMessage('');
    }

    return (
        <Box>
        <IconButton onClick={handleBookmarkClick}>
            <CollectionsBookmarkIcon />
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