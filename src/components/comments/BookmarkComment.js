import {Divider, Stack,  Dropdown, IconButton} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import CardContent from "@mui/joy/CardContent";
import { styled } from '@mui/material/styles';
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import TimeAgo from "../../utils/TimeAgo";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import moment from 'moment';
import {formatIpAddress} from "../../utils/stringUtils";
import Link from "@mui/joy/Link";
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';

const CommentCard = styled(Card)(({ theme }) => ({
    '& .css-14d6vet-MuiCardContent-root:last-child': {
        paddingBottom: 0
    },
    padding: 0,
    border: 'none',
    background: 'none',
    gap: 0,
    overflow: 'auto',
}));

export default function BookmarkComment({comment}){
    const ipPart = formatIpAddress(comment.userIp);
    const parentIpPard = formatIpAddress(comment.parentCommentUserIp);

    // 날짜 형식을 'YYYY-MM-DD HH:mm' 형식으로 변환
    const createdAt = moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss');
    const updatedAt = moment(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss');
    // 생성 시간과 수정 시간이 다른지 여부를 통해 댓글이 수정되었는지 판단
    const isModified = createdAt !== updatedAt;

    return(
        <Link
            underline="none"
            href={comment.rootUrl}
            sx={{ zIndex: 5}}

        >
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
            </Stack>

            <CardContent sx={{flexGrow: 1}}>
                <Stack direction="row">
                    <Stack sx={{ pl: 1, pb: 1}} spacing={1}>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <Typography level="title-sm" color="neutral">
                                {comment.nickname}({ipPart})
                                <Typography  level="body-xs" color="neutral" >
                                    &nbsp;&middot;&nbsp;<TimeAgo time={comment.createdAt} />
                                </Typography>
                            </Typography>

                        </Stack>

                        <Typography
                            level="body-sm"
                            pr={{
                                xs: 1
                            }}
                        >
                            {comment.parentCommentNickname && (
                                <Typography level="title-md" color="primary" sx={{mr: 1}}>@{comment.parentCommentNickname}({parentIpPard})</Typography>
                            )}
                            {comment.text}
                            {!comment.isDeleted && isModified && <Typography sx={{display: 'block'}} level="body-xs">수정된 댓글입니다(<TimeAgo time={comment.updatedAt} />)</Typography>}
                        </Typography>

                        <Stack direction="row" spacing={1}   alignItems="center">
                                <Stack direction="row" spacing={0}  alignItems="center">
                                    <CommentTwoToneIcon color="action" sx={{ fontSize: 20 }}/>
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
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </CommentCard>
        </Link>
    );
}