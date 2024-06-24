import { Box, Typography } from "@mui/joy";
import * as React from "react";
import AnnouncementForm from "../components/admin/AnnouncementForm";
import Stack from "@mui/joy/Stack";
import {useState} from "react";
import AdminAnnouncementList from "../components/admin/AdminAnnouncementList";
import UserList from "../components/admin/UserList";
import BlockUrlForm from "../components/admin/BlockUrlForm";

const AdminPage = () => {
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [page, setPage] = useState(0);

    const handleSelectAnnouncement = (announcement) => {
        setSelectedAnnouncement(announcement);
    };

    const handleUpdateComplete = () => {
        setSelectedAnnouncement(null);
    };

    const handleDeleteComplete = () => {
        setSelectedAnnouncement(null);
    };

    return (
        <Stack spacing={2}>
            <Typography level="h1">관리자 페이지</Typography>
            <Typography level="h3">공지사항</Typography>
            <AnnouncementForm
                selectedAnnouncement={selectedAnnouncement}
                onUpdateComplete={handleUpdateComplete}
                onDeleteComplete={handleDeleteComplete}
            />
            <AdminAnnouncementList onSelectAnnouncement={handleSelectAnnouncement} />
            <Typography level="h3">유저 관리</Typography>
            <UserList page={page} onPageChange={setPage} />
            <Typography level="h3">URL 차단/도메인 정지</Typography>
            <BlockUrlForm />
        </Stack>
    );
};

export default AdminPage;
