import * as React from 'react';
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function NotExistUrlCardList() {
    return (
        <Card>
            <CardContent>
                <Stack sx={{ borderRadius: 3 }}>
                    <Typography sx={{maxWidth: 250}} variant="solid" color="primary" level="h2">게시물이 없습니다</Typography>
                    <Typography sx={{ml: -1}} level="h5">원하는 URL을 검색창에 붙여 넣어 생성해보세요.</Typography>
                </Stack>
            </CardContent>
        </Card>

    );
}