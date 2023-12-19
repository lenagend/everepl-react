import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import {AspectRatio, Avatar, ButtonGroup, Divider} from '@mui/joy';
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import IconButton from "@mui/material/IconButton";
import ReplyIcon from '@mui/icons-material/Reply';
import {Collapse} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Badge from "@mui/material/Badge";
import {Chat} from "@mui/icons-material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FlagIcon from "@mui/icons-material/Flag";
import styled from "@emotion/styled";
import ReplyList from "./ReplyList";

const StyledCard = styled(Card)(({ theme }) => ({
    '& .css-14d6vet-MuiCardContent-root:last-child': {
        paddingBottom: 0
    },
    border: 'none',
    backgroundColor: 'none',
    padding: 10
}));

export default function CommentCardContent({ comment }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const buttons = [
        <Button key="one">+</Button>,
        <Button key="two" disabled>
            7
        </Button>,
        <Button key="three">-</Button>,
    ];

    return (
        <StyledCard sx={{ maxWidth: 'auto'}}  size="sm">
            <CardContent>
                <Stack direction="row">
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical soft button group"
                        variant="soft"
                        color="primary"
                        size="sm"
                    >
                        {buttons}
                    </ButtonGroup>
                    <Stack sx={{flexGrow: 1, px: 1}} spacing={1}>
                        <Stack direction="row" sx={{alignItems: 'center'}}>
                            <Avatar alt="user-level1" src="/images/character/level1.png" size="sm"/>
                            <Typography level="title-lg" color="primary" px={1}>
                            유저1
                            </Typography>
                            <Typography  level="body-xs" color="neutral">
                                20분전
                            </Typography>
                            <Stack direction="row" sx={{ml: 'auto'}}>
                                <IconButton>
                                    <EditIcon color="primary"/>
                                </IconButton>
                                <IconButton>
                                    <DeleteForeverIcon color="primary"/>
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Typography
                            level="body-sm"
                            >
                                말말말
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                            <Button aria-label="댓글" sx={{px: 0.5}} size="sm" variant="plain"  startDecorator={<Chat/>} onClick={handleExpandClick}>
                                99+ 댓글
                            </Button>
                            <Button aria-label="신고" sx={{px: 0.5}} size="sm" variant="plain"  startDecorator={<FlagIcon />}>
                                신고
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ReplyList/>
            </Collapse>
        </StyledCard>
    );
}
