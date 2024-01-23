import * as React from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Badge, CardOverflow, Container, FormControl, Input, Typography} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import IconButton from '@mui/material/IconButton';
import IconButtonJoy from '@mui/joy/IconButton';
import SendIcon from '@mui/icons-material/Send';
import AspectRatio from "@mui/joy/AspectRatio";
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Collapse} from "@mui/material";
import Link from "@mui/joy/Link";
import Textarea from "@mui/joy/Textarea";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CommentEditor({ nickname, onNicknameChange, password, onPasswordChange, commentText, onCommentChange, onSubmit, targetNicknameAndIp, handleCommentExpandClick, commentEditorExpanded, handleCommentButtonClick}) {

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10}} elevation={3}>
            <Container maxWidth="md" sx={{p: {
                    xs: 0,
                    sm: 0.5
                }}}>
                <Card sx={{p: 0, gap: 0}}>
                    <CardOverflow
                        variant="soft"
                        color="primary"
                        sx={{
                            px: 2,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Link
                            overlay
                            onClick={handleCommentExpandClick}
                            underline="none"
                        >
                        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography level="title-md">
                                댓글쓰기
                            </Typography>
                                {targetNicknameAndIp ? (
                                        <Badge
                                            badgeContent={<CloseRoundedIcon sx={{fontSize: 10}}/>}
                                            variant="outlined" color="danger" size="sm"
                                            badgeInset="-2%"
                                            onClick={(e) => {
                                            e.stopPropagation();
                                            handleCommentButtonClick('', '', '');
                                        }}>
                                            <Typography level="title-lg" color="primary" sx={{pl: 1}}>
                                                @{targetNicknameAndIp}
                                            </Typography>
                                        </Badge>
                                ) : (
                                    <Typography level="title-lg" color="primary" sx={{pl: 1}}>@원문</Typography>
                                )}
                            <ExpandMore
                                expand={commentEditorExpanded}
                                aria-expanded={commentEditorExpanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </Stack>
                        </Link>
                    </CardOverflow>
                    <Collapse in={commentEditorExpanded} timeout="auto" unmountOnExit>
                        <CardContent sx={{p: 0}}>
                            <Card orientation="horizontal" variant="outlined" sx={{p: 1, border: 'none'}}>
                                <CardContent>
                                        <Box sx={{flexGrow: 1}}>
                                            <Textarea
                                                placeholder="여기에 댓글을 달아주세요..."
                                                onChange={(event) => onCommentChange(event.target.value)}
                                                minRows={4}
                                                maxRows={4}
                                                value={commentText}
                                                startDecorator={
                                                    <Stack direction="row" flexWrap="wrap">
                                                        <FormControl sx={{ maxWidth: '50%' }}>
                                                            <Input
                                                                placeholder="닉네임"
                                                                size="sm"
                                                                onChange={(event) => onNicknameChange(event.target.value)}
                                                                value={nickname}
                                                            />
                                                        </FormControl>
                                                        <FormControl sx={{ maxWidth: '50%' }}>
                                                            <Input
                                                                placeholder="비밀번호"
                                                                size="sm"
                                                                type="password"
                                                                onChange={(event) => onPasswordChange(event.target.value)}
                                                                value={password}
                                                            />
                                                        </FormControl>
                                                    </Stack>
                                                }
                                                sx={{ width: '100%' }}
                                            />
                                        </Box>
                                </CardContent>
                                <Stack spacing={2}>
                                    <AspectRatio ratio="1" sx={{ width: {
                                            xs: 60,
                                            sm: 90
                                        }}} variant="outlined">
                                        <img
                                            src="/images/character/level2.png"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </AspectRatio>
                                    <IconButtonJoy variant="solid" color="primary" sx={{flexGrow: 1}}
                                    onClick={onSubmit}
                                    >
                                        <SendIcon />
                                    </IconButtonJoy>
                                </Stack>
                            </Card>
                        </CardContent>
                    </Collapse>
                </Card>
            </Container>
        </Box>
    );
}
