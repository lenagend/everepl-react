import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import {Divider} from "@mui/joy";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export default function UrlConsole() {
    return (
        <Card orientation="horizontal" variant="outlined" sx={{mt: 2}}>
            <CardContent>
                <Stack direction="row" spacing={1} divider={<Divider orientation="vertical"/>} justifyContent="flex-start">
                    <Button size="sm" variant="soft" startDecorator={<WhatshotIcon />}>인기</Button>
                    <Button size="sm" variant="soft" startDecorator={<NewReleasesIcon />}>최신</Button>
                    <Button size="sm" variant="soft" startDecorator={<ChatBubbleIcon />}>댓글</Button>
                </Stack>
            </CardContent>
            <CardOverflow
                variant="soft"
                color="primary"
                sx={{
                    px: 0.2,
                    writingMode: 'vertical-rl',
                    textAlign: 'center',
                    fontSize: 'xs',
                    fontWeight: 'xl',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                }}
            >
                콘솔
            </CardOverflow>
        </Card>
    );
}
