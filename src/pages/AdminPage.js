import { Box, Typography } from "@mui/joy";
import * as React from "react";
import AnnouncementForm from "../components/admin/AnnouncementForm";
import AnnouncementList from "../components/Announcement/AnnouncementList";
import Stack from "@mui/joy/Stack";

const AdminPage = () => {

    return (
        <Stack spacing={2}>
            <Typography level="h1">관리자 페이지</Typography>
            <Typography level="h3">공지사항</Typography>
            <AnnouncementForm/>
            <AnnouncementList/>
        </Stack>
    );
};

export default AdminPage;
