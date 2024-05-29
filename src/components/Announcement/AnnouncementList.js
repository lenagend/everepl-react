import React, { useEffect, useState } from "react";
import {Box, Card, CardContent, List, ListItem, ListItemButton, ListItemContent, Typography} from "@mui/joy";
import {useAuth} from "../../security/AuthProvider";
import CampaignIcon from '@mui/icons-material/Campaign';
import ListItemDecorator from "@mui/joy/ListItemDecorator";

const AnnouncementList = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { axiosInstance } = useAuth(); // axiosInstance 가져오기

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
        return <Typography>로딩 중...</Typography>;
    }

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
            <Typography level="h4">공지사항 목록</Typography>
            <List>
                {announcements.map((announcement) => (
                    <ListItem key={announcement.id}>
                        <ListItemButton color="primary">
                            <ListItemDecorator><CampaignIcon /></ListItemDecorator>
                            <ListItemContent>{announcement.title}
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
           </CardContent>
        </Card>
    );
};

export default AnnouncementList;
