import React, {useEffect, useState} from "react";
import { Button, Input,  Typography} from "@mui/joy";
import {useAuth} from "../../security/AuthProvider";
import Stack from "@mui/joy/Stack";
import Textarea from "@mui/joy/Textarea";
import {useSnackbar} from "../../contexts/SnackbarProvider";

const AnnouncementForm = ({ selectedAnnouncement, onUpdateComplete, onDeleteComplete }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const { axiosInstance } = useAuth(); // axiosInstance 가져오기
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (selectedAnnouncement) {
            setTitle(selectedAnnouncement.title);
            setContent(selectedAnnouncement.content);
            setIsEditMode(true);
        } else {
            setTitle("");
            setContent("");
            setIsEditMode(false);
        }
    }, [selectedAnnouncement]);

    const handleSubmit = async () => {
        try {
            if (isEditMode) {
                // 공지사항 수정
                await axiosInstance.put(`/admin/announcements/${selectedAnnouncement.id}`, { title, content });
                showSnackbar('공지사항이 정상적으로 수정되었습니다.', 'primary');
                onUpdateComplete();
            } else {
                // 새 공지사항 작성
                await axiosInstance.post("/admin/announcements", { title, content });
                showSnackbar('공지사항이 정상적으로 작성되었습니다.', 'primary');
            }
            setTitle("");
            setContent("");
            setIsEditMode(false);
            window.location.reload();
        } catch (error) {
            showSnackbar('공지사항 작성/수정에 실패했습니다. ' + (error.response ? error.response.data.message : error.message), 'danger');
        }
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/admin/announcements/${selectedAnnouncement.id}`);
            showSnackbar('공지사항이 정상적으로 삭제되었습니다.', 'primary');
            setTitle("");
            setContent("");
            setIsEditMode(false);
            onDeleteComplete();
            window.location.reload();
        } catch (error) {
            showSnackbar('공지사항 삭제에 실패했습니다. ' + (error.response ? error.response.data.message : error.message), 'danger');
        }
    };

    return (
        <Stack spacing={2} alignItems={'start'}>
            <Typography level="h4">{isEditMode ? "공지사항 수정" : "새 공지사항 작성"}</Typography>
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
            <Stack direction="row" spacing={2}>
                <Button onClick={handleSubmit} color="primary">
                    {isEditMode ? "수정하기" : "작성하기"}
                </Button>
                {isEditMode && (
                    <Button onClick={handleDelete} color="danger">
                        삭제하기
                    </Button>
                )}
            </Stack>
        </Stack>
    );
};

export default AnnouncementForm;