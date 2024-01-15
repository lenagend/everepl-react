import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import {Stack, TextField} from "@mui/material";
import {FormControl, Input} from "@mui/joy";

export default function CommentTextArea() {
    const [text, setText] = React.useState('');
    const addEmoji = (emoji) => () => setText(`${text}${emoji}`);


    return (
        <Box sx={{width: '100%'}}>
            <Textarea
                placeholder="여기에 댓글을 달아주세요..."
                value={text}
                onChange={(event) => setText(event.target.value)}
                minRows={4}
                maxRows={4}
                startDecorator={
                    <Stack direction="row" flexWrap="wrap"  >
                        <FormControl sx={{maxWidth: '50%'}}>
                            <Input placeholder="닉네임" size="sm" />
                        </FormControl>
                        <FormControl sx={{maxWidth: '50%'}}>
                            <Input placeholder="비밀번호" size="sm"/>
                        </FormControl>
                    </Stack>
                }
                sx={{ width: '100%' }}
            />
        </Box>
    );
}
