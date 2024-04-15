import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import {Badge, Divider} from "@mui/joy";
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {useLocation, useNavigate} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MyMenuConsole({ currentPath }) {
    const navigate = useNavigate();

    const renderButton = (label, path, icon) => (
        <Badge color="danger" invisible={currentPath !== path}>
            <Button
                size="sm"
                variant="soft"
                startDecorator={icon}
                onClick={() => navigate(path)}
            >
                {label}
            </Button>
        </Badge>
    );

    return (
        <Card orientation="horizontal" variant="outlined">
            <CardContent>
                <Stack direction="row" spacing={1} divider={<Divider orientation="vertical"/>} justifyContent="flex-start" flexWrap="wrap" useFlexGap>
                    {renderButton('홈으로', '/', <HomeIcon sx={{fontSize: 15}}/>)}
                    {renderButton('프로필', '/my/profile', <PersonIcon sx={{fontSize: 15}}/>)}
                    {renderButton('페이지', '/my/liked/urlinfos', <FavoriteIcon sx={{fontSize: 15}}/>)}
                    {renderButton('댓글', '/my/liked/comments', <FavoriteIcon sx={{fontSize: 15}}/>)}
                    {renderButton('쓴 댓글', '/my/comments', <ChatBubbleIcon sx={{fontSize: 15}}/>)}
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
