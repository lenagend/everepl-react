import * as React from 'react';
import {ArrowCircleDown, ArrowCircleUp, FavoriteBorder, Send} from "@mui/icons-material";
import {FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Stack, TextField} from "@mui/material";
import EjectIcon from '@mui/icons-material/Eject';import Box from "@mui/material/Box";
import IconButton from "@mui/joy/IconButton";
import {Input} from "@mui/joy";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
export default function TextAreaBottomNavigation({ isViewPage }) {
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
                            {/*<Input*/}
                            {/*    placeholder="여기에 댓글을 입력하세요..."*/}
                            {/*    size="lg"*/}
                            {/*    sx={{ flexGrow: 1 }}*/}
                            {/*    multiline*/}
                            {/*    endDecorator={*/}
                            {/*        <IconButton  variant="soft" color="primary">*/}
                            {/*            <Send />*/}
                            {/*        </IconButton>*/}
                            {/*    }*/}
                            {/*/>*/}
                        <FormControl sx={{ flexGrow: 1, width: '100%', background: 'white' }}>
                        <OutlinedInput
                            size="small"
                            multiline
                            placeholder="여기에 댓글을 입력하세요..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton  variant="soft" color="primary">
                                        <Send />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} item sm={3}/>
                </Grid>
        </Box>
    );
}
