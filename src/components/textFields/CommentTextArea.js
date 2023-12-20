import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import {Stack, TextField} from "@mui/material";

export default function CommentTextArea() {
    const [text, setText] = React.useState('');
    const [rows, setRows] = React.useState(1); // 초기 row 수 설정
    const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

    const handleFocus = () => {
        setRows(3); // 포커스 되었을 때 row 수 변경
    };

    const handleBlur = () => {
        setRows(1); // 포커스가 해제되었을 때 원래 row 수로 돌아감
    };

    return (
        <Box sx={{width: '100%'}}>
            <Textarea
                placeholder="여기에 댓글을 달아주세요..."
                value={text}
                onChange={(event) => setText(event.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                minRows={rows}
                maxRows={rows}
                startDecorator={
                    <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                            👍
                        </IconButton>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                            😍
                        </IconButton>
                        <Stack direction="row" sx={{ ml: 'auto' }}>
                            <Button variant="outlined" color="neutral" >
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
