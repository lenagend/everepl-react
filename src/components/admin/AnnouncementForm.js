import React, { useState } from "react";
import {Box, Button, Input, TextField, Typography} from "@mui/joy";
import {useAuth} from "../../security/AuthProvider";


const AnnouncementForm = ({ onAnnouncementCreated }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { axiosInstance } = useAuth(); // axiosInstance 가져오기


    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post("/announcements", { title, content });
            onAnnouncementCreated(response.data); // 공지사항 생성 후 콜백 호출
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("Error creating announcement:", error);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography level="h4">새 공지사항 작성</Typography>
            <Input
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Input
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                sx={{ mb: 2 }}
            />
            <Button onClick={handleSubmit} variant="contained" color="primary">
                작성하기
            </Button>
        </Box>
    );
};

export default AnnouncementForm;