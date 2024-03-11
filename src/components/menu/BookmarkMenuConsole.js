import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import {Badge, Divider} from "@mui/joy";
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {useNavigate} from "react-router-dom";

export default function BookmarkMenuConsole({ currentTargetType , handleTargetType }) {
    const navigate = useNavigate();

    const renderButton = (label, targetType, icon) => (
        <Badge color="danger" invisible={currentTargetType !== targetType}>
            <Button
                size="sm"
                variant="soft"
                startDecorator={icon}
                onClick={() => handleTargetType(targetType)}
            >
                {label}
            </Button>
        </Badge>
    );

    const handleHomeButtonClick = () => {
        navigate('/');
    }

    return (
        <Card orientation="horizontal" variant="outlined">
            <CardContent>
                <Stack direction="row" spacing={1} divider={<Divider orientation="vertical"/>} justifyContent="flex-start" flexWrap="wrap" useFlexGap>
                    <Button size="sm" variant="soft" startDecorator={<HomeIcon />}
                        onClick={handleHomeButtonClick}>홈으로</Button>
                    {renderButton('웹페이지', 'URLINFO', <FeedIcon />)}
                    {renderButton('댓글', 'COMMENT', <ChatBubbleIcon />)}
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
                북마크
            </CardOverflow>
        </Card>
    );
}
