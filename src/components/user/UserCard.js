import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Box from "@mui/material/Box";
import {FormControl, FormHelperText, Input} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import CommentTextArea from "../textFields/CommentTextArea";

export default function UserCard() {

    return (
        <Card orientation="horizontal" variant="outlined" sx={{p: 1}}>
            <AspectRatio ratio="1" sx={{ width: {
                    xs: 60,
                    sm: 90
                }}} variant="outlined">
                <img
                    src="/images/character/level2.png"
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <CardContent>
                <Stack direction="row" flexWrap="wrap" >
                    <FormControl sx={{width: '50%'}}>
                        <Input placeholder="닉네임" size="sm" />
                    </FormControl>
                    <FormControl sx={{width: '50%'}}>
                        <Input placeholder="비밀번호" size="sm"/>
                    </FormControl>
                    <Box sx={{flexGrow: 1}}>
                        <CommentTextArea/>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
