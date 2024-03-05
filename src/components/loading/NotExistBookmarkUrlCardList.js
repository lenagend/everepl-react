import * as React from 'react';
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function NotExistBookmarkUrlCardList() {
    return (
        <Card>
            <CardContent>
                <Stack sx={{ borderRadius: 3 }}>
                    <Typography sx={{maxWidth: 250}} variant="solid" color="primary" level="h2">게시물이 없습니다</Typography>
                    <Typography sx={{ml: -1}} level="h5">북마크 된 게시물이 없습니다.</Typography>
                </Stack>
            </CardContent>
        </Card>

    );
}