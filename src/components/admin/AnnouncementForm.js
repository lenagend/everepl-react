import React, { useState } from "react";
import {Box, Button, Input, TextField, Typography} from "@mui/joy";
import {useAuth} from "../../security/AuthProvider";
import Stack from "@mui/joy/Stack";
import Textarea from "@mui/joy/Textarea";
import {useSnackbar} from "../../contexts/SnackbarProvider";


const AnnouncementForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { axiosInstance } = useAuth(); // axiosInstance 가져오기
    const { showSnackbar } = useSnackbar();


    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post("/announcements", { title, content });
            setTitle("");
            setContent("");
            showSnackbar('정상적으로 작성되었습니다.', 'primary');
        } catch (error) {
            showSnackbar('공지사항 작성에 실패했습니다. ' + (error.response ? error.response.data.message : error.message), 'danger');
        }
    };

    return (
        <Stack spacing={2} alignItems={'start'}>
            <Typography level="h4">새 공지사항 작성</Typography>
            <Input
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ width: '100%' }}
            />
            <Textarea
                placeholder="내용"
                minRows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{ width: '100%' }}
            />
            <Button onClick={handleSubmit} color="primary" >
                작성하기
            </Button>
        </Stack>
    );
};

export default AnnouncementForm;