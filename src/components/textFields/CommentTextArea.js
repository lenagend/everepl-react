import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import {Stack, TextField} from "@mui/material";

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
                    <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                            👍
                        </IconButton>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                            😍
                        </IconButton>
                        <Stack direction="row" sx={{ ml: 'auto' }} spacing={1}>
                            <Button variant="soft" color="neutral" >
                                쓰기
                            </Button>
                        </Stack>
                    </Box>
                }
                sx={{ width: '100%' }}
            />
        </Box>
    );
}
