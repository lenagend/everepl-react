import * as React from 'react';
import {ArrowCircleDown, ArrowCircleUp, FavoriteBorder, Send} from "@mui/icons-material";
import {Grid, Stack, TextField} from "@mui/material";
import EjectIcon from '@mui/icons-material/Eject';import Box from "@mui/material/Box";
import IconButton from "@mui/joy/IconButton";
import {ButtonGroup, Input} from "@mui/joy";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
export default function FloatingButtonBottomNavigation({ isViewPage }) {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 50,
                right: { xs: 10, sm: '20%' },
                zIndex: 10
            }}
        >
            <ButtonGroup
                color="primary"
                orientation="horizontal"
                size="lg"
                variant="soft"
            >
                <IconButton  variant="soft" color="primary" onClick={handleScrollToTop} size="lg">
                    <ArrowCircleUpIcon/>
                </IconButton>
                <IconButton  variant="soft" color="primary" onClick={handleScrollToTop} size="lg">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </ButtonGroup>
        </Box>
    );
}
