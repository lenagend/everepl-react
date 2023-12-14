import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import {ArrowCircleDown, ArrowCircleUp} from "@mui/icons-material";

export default function FixedBottomNavigation() {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleScrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    };


    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10}} elevation={3}>
            <BottomNavigation sx={{backgroundColor: '#1976d2'}}
                showLabels
            >
                <BottomNavigationAction sx={{color: 'white' }} label="위로" icon={<ArrowCircleUp sx={{fontSize: '2rem'}}/>} onClick={()=> handleScrollToTop()}/>
                <BottomNavigationAction sx={{color: 'white'}} label="아래로" icon={<ArrowCircleDown  sx={{fontSize: '2rem'}}/>} onClick={()=> handleScrollToBottom()}/>
            </BottomNavigation>
        </Paper>
    );
}
