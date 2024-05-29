import { Box, Typography } from "@mui/joy";
import * as React from "react";
import AnnouncementForm from "../components/admin/AnnouncementForm";
import AnnouncementList from "../components/Announcement/AnnouncementList";

const AdminPage = () => {
    const [announcements, setAnnouncements] = React.useState([]);

    const handleAnnouncementCreated = (newAnnouncement) => {
        setAnnouncements([newAnnouncement, ...announcements]);
    };

    return (
        <Box>
            <Typography level="h1">관리자 페이지</Typography>
            <Typography level="h3">공지사항</Typography>
            <AnnouncementForm onAnnouncementCreated={handleAnnouncementCreated} />
            <AnnouncementList announcements={announcements} />
        </Box>
    );
};

export default AdminPage;
