import * as React from 'react';
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function NotExistCommentList() {
    return (
            <CardContent sx={{p: 1}}>
                <Stack sx={{ borderRadius: 3 }}>
                    <Typography sx={{maxWidth: 250}} variant="solid" color="primary" level="h2">댓글이 없습니다</Typography>
                    <Typography sx={{ml: -1}} level="h5">댓글쓰기를 눌러 댓글을 작성해 보세요.</Typography>
                </Stack>
            </CardContent>
    );
}