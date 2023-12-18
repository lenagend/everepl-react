import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import {AspectRatio, Avatar, ButtonGroup} from '@mui/joy';
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import IconButton from "@mui/material/IconButton";
import ReplyIcon from '@mui/icons-material/Reply';
import {Collapse} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Badge from "@mui/material/Badge";
import {Chat} from "@mui/icons-material";

export default function CommentCard({ comment }) {
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
        <Card sx={{ maxWidth: 'auto', mt: 2 }} color="primary" size="sm">
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
                            <IconButton aria-label="comment" sx={{ml: 'auto'}} onClick={handleExpandClick} aria-label="답글보기">
                                <Badge badgeContent={100} max={99} color="primary">
                                    <Chat  aria-label="go comments page" />
                                </Badge>
                            </IconButton>
                        </Stack>
                        <Typography
                            level="body-sm"
                            >
                                말말말
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>

                    <Stack spacing={1} >
                    <Card sx={{ maxWidth: 'auto', mt: 2 }} color="primary" size="sm">
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
                                <Stack sx={{flexGrow: 1, px: 1}} spacing={1} >
                                    <Stack direction="row" sx={{alignItems: 'center'}}>
                                        <Avatar alt="user-level1" src="/images/character/level1.png" size="sm"/>
                                        <Typography level="title-lg" color="primary" px={1}>
                                            유저1
                                        </Typography>
                                        <Typography  level="body-xs" color="neutral">
                                            20분전
                                        </Typography>
                                        <Stack spacing={0.5} direction="row" aria-label="수정/삭제" sx={{ml: 'auto'}}>
                                            <IconButton aria-label="comment"  color="primary" onClick={handleExpandClick} aria-label="답글보기">
                                                <DeleteForeverIcon aria-label="go comments page" />
                                            </IconButton>
                                            <IconButton aria-label="comment" color="primary" onClick={handleExpandClick} aria-label="답글보기">
                                                <EditIcon aria-label="go comments page" />
                                            </IconButton>
                                        </Stack>

                                    </Stack>
                                    <Typography
                                        level="body-sm"
                                    >
                                        말말말
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 'auto', mt: 2 }} color="primary" size="sm">
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
                                    </Stack>
                                    <Typography
                                        level="body-sm"
                                    >
                                        말말말
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 'auto', mt: 2 }} color="primary" size="sm">
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
                                    </Stack>
                                    <Typography
                                        level="body-sm"
                                    >
                                        말말말
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                    </Stack>
                </CardContent>
            </Collapse>
        </Card>
    );
}
