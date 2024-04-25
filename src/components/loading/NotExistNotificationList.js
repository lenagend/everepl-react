import * as React from 'react';
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";

export default function NotExistNotificationList({border}) {
    return (
        <Card sx={{border: border}}>
            <CardContent>
                <Stack sx={{ borderRadius: 3 }} justifyContent="flex-start">
                    <Typography level="h4"  >알림이 없습니다</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}