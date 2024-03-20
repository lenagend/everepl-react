import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import {Badge, Divider} from "@mui/joy";
import ForumIcon from '@mui/icons-material/Forum';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FeedIcon from '@mui/icons-material/Feed';
import WidgetsIcon from '@mui/icons-material/Widgets';
import InstagramIcon from '@mui/icons-material/Instagram';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import {useNavigate} from "react-router-dom";

export default function MenuConsole({ handleFilterChange, currentFilter }) {
    const navigate = useNavigate();

    const renderButton = (label, filter, icon) => (
        <Badge color="danger" invisible={currentFilter.join(',') !== filter.join(',')}>
            <Button
                size="sm"
                variant="soft"
                startDecorator={icon}
                onClick={() => handleFilterChange(filter)}
            >
                {label}
            </Button>
        </Badge>
    );

    const handleBookmarkButtonClick = () => {
        navigate('/bookmark');
    }

    return (
        <Card orientation="horizontal" variant="outlined">
            <CardContent>
                <Stack direction="row" spacing={1} divider={<Divider orientation="vertical"/>} justifyContent="flex-start" flexWrap="wrap" useFlexGap>
                    {renderButton('전체', [], <WidgetsIcon />)}
                    <Button size="sm" variant="soft" startDecorator={<CollectionsBookmarkIcon />}
                        onClick={handleBookmarkButtonClick}>My</Button>
                    {renderButton('유튜브', ['youtube'], <YouTubeIcon />)}
                    {renderButton('뉴스', ['news', 'entertain', 'article'], <FeedIcon />)}
                    {renderButton('인스타', ['instagram.com'], <InstagramIcon />)}
                    {renderButton('커뮤', ['dcinside.com', 'mania.kr', 'fmkorea.com', 'ppomppu.co.kr',
                        "instiz.net", "theqoo.net", "clien.net", "mlbpark.donga.com", "humoruniv.com", "bobaedream.co.kr",
                        "etoland.co.kr", "ilbe.com", "82cook.com", "slrclub.com", "todayhumor.co.kr", "gasengi.com", "ruliweb.com", "inven.co.kr"
                    ], <ForumIcon />)}
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
