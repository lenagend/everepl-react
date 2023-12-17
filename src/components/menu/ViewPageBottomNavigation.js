import * as React from 'react';
import {ArrowCircleDown, ArrowCircleUp, FavoriteBorder, Send} from "@mui/icons-material";
import {Grid, Stack, TextField} from "@mui/material";
import EjectIcon from '@mui/icons-material/Eject';import Box from "@mui/material/Box";
import IconButton from "@mui/joy/IconButton";
import {Input} from "@mui/joy";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
export default function ViewPageBottomNavigation({ isViewPage }) {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10}} elevation={3}>
                <Grid container alignItems="center">
                    <Grid item xs={3}/>
                    <Grid item xs={12} sm={6} >
                            <Input
                                placeholder="여기에 댓글을 입력하세요..."
                                size="lg"
                                sx={{ flexGrow: 1 }}
                                endDecorator={
                                    <IconButton  variant="soft" color="primary">
                                        <Send />
                                    </IconButton>
                                }
                            />
                    </Grid>
                    <Grid xs={12} item sm={3}/>
                </Grid>
        </Box>
    );
}
