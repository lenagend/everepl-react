import * as React from 'react';
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function NotExistCommentList() {
    return (
            <CardContent>
                <Stack sx={{ borderRadius: 3 }} justifyContent="flex-start">
                    <Typography level="h4" color="success" >댓글이 없습니다</Typography>
                    <Typography level="title-md">화면하단의 댓글쓰기를 눌러 댓글을 작성해 보세요.</Typography>
                </Stack>
            </CardContent>
    );
}