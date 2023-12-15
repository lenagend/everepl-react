import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import {Stack, TextField} from "@mui/material";

export default function CommentTextArea() {
    const [text, setText] = React.useState('');
    const addEmoji = (emoji) => () => setText(`${text}${emoji}`);
    return (
        <Box>
            <Textarea
                placeholder="여기에 댓글을 달아주세요..."
                value={text}
                onChange={(event) => setText(event.target.value)}
                minRows={2}
                maxRows={4}
                startDecorator={
                    <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                            👍
                        </IconButton>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                            😍
                        </IconButton>
                        <Stack direction="row" sx={{ ml: 'auto' }}>
                            <TextField
                                required
                                id="outlined-required"
                                label="비밀번호"
                                size="small"
                                sx={{width: 100 }}
                                inputProps={{
                                    maxLength: 4
                                }}
                            />
                            <Button variant="outlined" color="neutral" >
                                쓰기
                            </Button>
                        </Stack>

                    </Box>
                }
                endDecorator={
                    <Typography level="body-xs" sx={{ ml: 'auto' }}>
                        {text.length} 글자
                    </Typography>
                }
                sx={{ width: '100%' }}
            />
        </Box>
    );
}
