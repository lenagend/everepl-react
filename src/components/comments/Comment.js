import {Divider, Stack,  Dropdown, IconButton} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import CardContent from "@mui/joy/CardContent";
import { styled } from '@mui/material/styles';
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import TimeAgo from "../../utils/TimeAgo";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import CommentsDisabledTwoToneIcon from '@mui/icons-material/CommentsDisabledTwoTone';
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import moment from 'moment';
import Box from "@mui/material/Box";
import {formatIpAddress} from "../../utils/stringUtils";

export default function Comment({comment, depth, onCommentButtonClick, onEditComment, onDeleteComment}){
    const ipPart = formatIpAddress(comment.userIp);
    const parrentIpPard = formatIpAddress(comment.parentCommentUserIp);

    // 날짜 형식을 'YYYY-MM-DD HH:mm' 형식으로 변환
    const createdAt = moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss');
    const updatedAt = moment(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss');
    // 생성 시간과 수정 시간이 다른지 여부를 통해 댓글이 수정되었는지 판단
    const isModified = createdAt !== updatedAt;

    return(
        <Box>
        <Card orientation="horizontal" variant="soft" color="neutral" sx={{
            overflow: 'auto',
            padding: 1,
            ml : (comment.path.length - 3) * 1,
            '& .css-14d6vet-MuiCardContent-root:last-child': {
                paddingBottom: 0
            },
            gap: 0,
            border: '1px dotted #0A2744'
        }}>
            {/*<Box sx={{width: (comment.path.length - 3) * 10}}>*/}

            {/*</Box>*/}
            <Stack>
                <AspectRatio ratio="1" sx={{ width: {
                        xs: 30,
                        sm: 60
                    } }} variant="outlined">
                    <img
                        src={comment.user.imageUrl ? comment.user.imageUrl : "/images/character/level3.png"}
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
                                {comment.user.name ? comment.user.name : `유저${comment.user.id}`}
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
                                <Typography level="title-md" color="primary" sx={{mr: 1}}>@{comment.parentCommentNickname}({parrentIpPard})</Typography>
                            )}
                            {comment.text}
                            {!comment.isDeleted && isModified && <Typography sx={{display: 'block'}} level="body-xs">수정된 댓글입니다(<TimeAgo time={comment.updatedAt} />)</Typography>}
                        </Typography>
                        <Stack direction="row" spacing={1}   alignItems="center">
                                <Stack direction="row" spacing={0}  alignItems="center">
                                    {comment.path.length <= 9 ? (
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
                            {!comment.isDeleted && (
                                <Stack direction="row" spacing={0}  alignItems="center">
                                    <Dropdown>
                                        <MenuButton
                                            slots={{ root: IconButton }}
                                            slotProps={{ root: { variant: 'plane'} }}
                                        >
                                            <MoreHorizIcon color="action"/>
                                        </MenuButton>
                                        <Menu>
                                            <MenuItem onClick={() => onEditComment(comment)}><EditTwoToneIcon  color="action"/>수정</MenuItem>
                                            <MenuItem onClick={() => onDeleteComment(comment)}><DeleteTwoToneIcon  color="action"/>삭제</MenuItem>
                                            <MenuItem><FlagTwoToneIcon  color="action"/>신고</MenuItem>
                                        </Menu>
                                    </Dropdown>
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
        </Box>
    );
}