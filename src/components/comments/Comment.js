import {Divider, Stack, IconButton} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import CardContent from "@mui/joy/CardContent";
import styled from "@emotion/styled";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import TimeAgo from "../../utils/TimeAgo";
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const CommentCard = styled(Card)(({ theme }) => ({
    '& .css-14d6vet-MuiCardContent-root:last-child': {
        paddingBottom: 0
    },
    padding: 0,
    border: 'none',
    background: 'none',
    gap: 1
}));

export default function Comment({comment}){
    return(
        <CommentCard orientation="horizontal" variant="outlined" >
            <Stack>
                <AspectRatio ratio="1" sx={{ width: {
                        xs: 40,
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

            <CardContent >
                <Stack direction="row">
                    <Stack sx={{flexGrow: 1, pl: 1, pb: 1}} spacing={1}>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <Typography level="title-sm" color="neutral">
                                {comment.nickname}({comment.userIp})
                                <Typography  level="body-xs" color="neutral" >
                                    &nbsp;&middot;&nbsp;<TimeAgo time={comment.updatedAt} />
                                </Typography>
                            </Typography>

                        </Stack>
                        <Typography
                            level="body-sm"

                        >
                            {comment.text}
                        </Typography>
                        <Stack direction="row" spacing={1}   alignItems="center">
                            <Stack direction="row" spacing={0}  alignItems="center">
                                <IconButton  variant="plain" sx={{
                                    "--IconButton-size": "20px",
                                    ml: -0.5
                                }}>
                                    <ChatBubbleTwoToneIcon color="action" sx={{ fontSize: 20 }}/>
                                </IconButton>
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
                    </Stack>
                </Stack>
            </CardContent>

        </CommentCard>
    );
}