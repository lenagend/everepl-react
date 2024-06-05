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
import {useNavigate} from "react-router-dom";

export default function MenuConsole({ handleFilterChange, currentFilterKey }) {
    const navigate = useNavigate();

    // 식별자 기반으로 필터 변경 처리
    const handleChange = (filterIdentifier) => {
        handleFilterChange(filterIdentifier);
    };

    // 필터 식별자에 맞는 버튼을 렌더링하는 함수
    const renderButton = (label, filterIdentifier, icon) => (
        <Badge color="danger" invisible={currentFilterKey !== filterIdentifier}>
            <Button
                size="sm"
                variant="soft"
                startDecorator={icon}
                onClick={() => handleChange(filterIdentifier)}
            >
                {label}
            </Button>
        </Badge>
    );

    return (
        <Card orientation="horizontal" variant="outlined">
            <CardContent>
                <Stack direction="row" spacing={1} divider={<Divider orientation="vertical"/>} justifyContent="flex-start" flexWrap="wrap" useFlexGap>
                    {renderButton('전체', 'all', <WidgetsIcon />)}
                    {renderButton('유튜브', 'youtube', <YouTubeIcon />)}
                    {renderButton('뉴스', 'news', <FeedIcon />)}
                    {renderButton('인스타', 'instagram', <InstagramIcon />)}
                    {renderButton('커뮤', 'community', <ForumIcon />)}  {/* '커뮤' 필터 식별자를 'community'로 설정 */}
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
