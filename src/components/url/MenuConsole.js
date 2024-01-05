import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import {Divider} from "@mui/joy";
import ForumIcon from '@mui/icons-material/Forum';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FeedIcon from '@mui/icons-material/Feed';
import WidgetsIcon from '@mui/icons-material/Widgets';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function MenuConsole({ onFetchUrlInfos }) {
    return (
        <Card orientation="horizontal" variant="outlined">
            <CardContent>
                <Stack direction="row" spacing={1} divider={<Divider orientation="vertical"/>} justifyContent="flex-start" flexWrap="wrap" useFlexGap>
                    <Button size="sm" variant="soft" startDecorator={<WidgetsIcon />}>전체</Button>
                    <Button size="sm" variant="soft" startDecorator={<YouTubeIcon />}>유튜브</Button>
                    <Button size="sm" variant="soft" startDecorator={<FeedIcon />}>뉴스</Button>
                    <Button size="sm" variant="soft" startDecorator={<InstagramIcon />}>인스타</Button>
                    <Button size="sm" variant="soft" startDecorator={<ForumIcon />}>커뮤</Button>
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
                메뉴
            </CardOverflow>
        </Card>
    );
}
