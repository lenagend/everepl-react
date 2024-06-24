import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    List,
    ListItem,
    ListItemButton,
    ListItemContent, Modal, ModalClose, ModalDialog, ModalOverflow,
    Sheet,
    Typography
} from "@mui/joy";
import {useAuth} from "../../security/AuthProvider";
import CampaignIcon from '@mui/icons-material/Campaign';
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import {truncateString} from "../../utils/stringUtils";
import {useMediaQuery} from "@mui/material";
import LoadingAnnouncementList from "../loading/LoadingAnnouncementList";

const AnnouncementList = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { axiosInstance } = useAuth(); // axiosInstance 가져오기
    const isMobile = useMediaQuery('(max-width:600px)');
    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');

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
    }, []);

    const handleAnnouncementOpen = (announcement) => {
        setModalTitle(announcement.title);
        setModalContent(announcement.content);
        setOpen(true);
    }

    const handleAnnouncementClose = () => {
        setModalTitle('');
        setModalContent('');
        setOpen(false);
    }

    if (isLoading) {
        return <LoadingAnnouncementList/>
    }

    if (announcements && announcements.length === 0){
        return null;
    }

    return (
        <>
        <Card sx={{p: 0}}>
            <CardContent>
            <List>
                {announcements.map((announcement) => (
                    <ListItem key={announcement.id}>
                        <ListItemButton color="primary" onClick={()=> handleAnnouncementOpen(announcement)}>
                            <ListItemDecorator>
                                <Chip
                                    startDecorator={<CampaignIcon sx={{fontSize: 16}}/>}
                                    sx={{
                                        "--Chip-radius": "6px",
                                        mr: 1
                                    }}
                                >
                                    공지
                                </Chip>
                            </ListItemDecorator>
                            <ListItemContent>
                                <Typography level={isMobile ? 'title-sm' : 'title-md'} color={'primary'}>
                                    {isMobile ? truncateString(announcement.title, 18) : announcement.title}
                                </Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
           </CardContent>
        </Card>
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={handleAnnouncementClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ModalOverflow>
                <ModalDialog aria-labelledby="modal-dialog-overflow" layout={'center'} sx={{ maxWidth: 800}}>
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                            mb={1}
                        >
                            {modalTitle}
                        </Typography>
                        <Typography id="modal-desc" textColor="text.tertiary">
                            {modalContent}
                        </Typography>
                </ModalDialog>
            </ModalOverflow>
        </Modal>
        </>
    );
};

export default AnnouncementList;
