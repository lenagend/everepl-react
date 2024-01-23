import {Divider, Stack, IconButton} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import CardContent from "@mui/joy/CardContent";
import styled from "@emotion/styled";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import TimeAgo from "../../utils/TimeAgo";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentList from "./CommentList";
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import CommentsDisabledTwoToneIcon from '@mui/icons-material/CommentsDisabledTwoTone';

const CommentCard = styled(Card)(({ theme }) => ({
    '& .css-14d6vet-MuiCardContent-root:last-child': {
        paddingBottom: 0
    },
    padding: 0,
    border: 'none',
    background: 'none',
    gap: 0,
    overflow: 'auto'
}));

export default function Comment({comment, depth, onCommentButtonClick}){
    const ipPart = comment.userIp.split('.').slice(0, 2).join('.');

    return(
        <CommentCard orientation="horizontal" variant="outlined" >
            <Stack>
                <AspectRatio ratio="1" sx={{ width: {
                        xs: 30,
                        sm: 60
                    } }} variant="outlined">
                    <img
                        src="/images/character/level2.png"
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <Stack direction="row" sx={{height: '100%'}}>
                    <Box sx={{width: '50%'}}/><Divider orientation="vertical"></Divider><Box/>
                </Stack>
            </Stack>

            <CardContent sx={{flexGrow: 1}}>
                <Stack direction="row">
                    <Stack sx={{ pl: 1, pb: 1}} spacing={1}>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <Typography level="title-sm" color="neutral">
                                {comment.nickname}({ipPart})
                                <Typography  level="body-xs" color="neutral" >
                                    &nbsp;&middot;&nbsp;<TimeAgo time={comment.updatedAt} />
                                </Typography>
                            </Typography>

                        </Stack>
                        <Typography
                            level="body-sm"
                            pr={{
                                xs: 1
                            }}
                        >
                            {comment.text}
                        </Typography>
                        {/*버튼들*/}
                        <Stack direction="row" spacing={1}   alignItems="center">
                                <Stack direction="row" spacing={0}  alignItems="center">
                                    {depth < 5 ? (
                                        <IconButton  variant="plain" sx={{
                                            "--IconButton-size": "20px",
                                            ml: -0.5
                                        }}
                                        onClick={() => onCommentButtonClick(`${comment.nickname}(${ipPart})`, comment.id, 'COMMENT')}
                                        >
                                            <CommentTwoToneIcon color="action" sx={{ fontSize: 20 }}/>
                                        </IconButton>
                                    ): (
                                        <IconButton  variant="plain" sx={{
                                            "--IconButton-size": "20px",
                                            ml: -0.5
                                        }}
                                        disabled
                                        >
                                            <CommentsDisabledTwoToneIcon color="action" sx={{ fontSize: 20 }}/>
                                        </IconButton>
                                    )}
                                    <Typography sx={{ml: 0}} level="body-xs" color="neutral">{comment.commentCount}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={0}  alignItems="center">
                                <IconButton  variant="plain" sx={{
                                    "--IconButton-size": "20px",
                                    ml: -0.5
                                }}>
                                    <FavoriteTwoToneIcon color="action" sx={{ fontSize: 20 }}/>
                                </IconButton>
                                <Typography sx={{ml: 0}} level="body-xs" color="neutral">{comment.likeCount}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={0}  alignItems="center">
                                <IconButton  variant="plain" sx={{
                                    "--IconButton-size": "20px",
                                    ml: -0.5
                                }}>
                                    <MoreHorizIcon color="action" sx={{ fontSize: 20 }}/>
                                </IconButton>
                            </Stack>
                        </Stack>
                        {/*버튼들*/}
                        {comment.replies.length > 0 ? (
                                <Box sx={{ width: 'calc(100% + 15px)', transform: 'translateX(-15px)' }}>
                                <CommentList
                                    comments={comment.replies}
                                    depth={depth + 1}
                                    commentCount={comment.replies.length}
                                    onCommentButtonClick={onCommentButtonClick}
                                />
                            </Box>
                            ) :
                        null}
                    </Stack>
                </Stack>
            </CardContent>
        </CommentCard>
    );
}