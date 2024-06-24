import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    List,
    ListItem,
    ListItemButton,
    ListItemContent,
    Typography,
    Chip,
    Stack,
} from "@mui/joy";
import { useAuth } from "../../security/AuthProvider";
import CampaignIcon from '@mui/icons-material/Campaign';
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { truncateString } from "../../utils/stringUtils";
import { useMediaQuery } from "@mui/material";
import LoadingAnnouncementList from "../loading/LoadingAnnouncementList";

const AdminAnnouncementList = ({ onSelectAnnouncement }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { axiosInstance } = useAuth(); // axiosInstance 가져오기
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const loadAnnouncements = async () => {
            try {
                const response = await axiosInstance.get("/announcements");
                setAnnouncements(response.data);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAnnouncements();
    }, [axiosInstance]);

    if (isLoading) {
        return <LoadingAnnouncementList />;
    }

    if (announcements && announcements.length === 0) {
        return <Typography>No announcements available.</Typography>;
    }

    return (
        <Card sx={{ p: 0 }}>
            <CardContent>
                <List>
                    {announcements.map((announcement) => (
                        <ListItem key={announcement.id}>
                            <ListItemButton onClick={() => onSelectAnnouncement(announcement)}>
                                <ListItemDecorator>
                                    <Chip
                                        startDecorator={<CampaignIcon sx={{ fontSize: 16 }} />}
                                        sx={{
                                            "--Chip-radius": "6px",
                                            mr: 1
                                        }}
                                    >
                                        공지
                                    </Chip>
                                </ListItemDecorator>
                                <ListItemContent>
                                    <Typography level={isMobile ? 'title-sm' : 'title-md'}>
                                        {isMobile ? truncateString(announcement.title, 18) : announcement.title}
                                    </Typography>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default AdminAnnouncementList;
