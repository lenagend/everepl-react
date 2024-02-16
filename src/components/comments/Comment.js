import {Divider, Stack,  Dropdown, IconButton} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import CardContent from "@mui/joy/CardContent";
import { styled } from '@mui/material/styles';
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import TimeAgo from "../../utils/TimeAgo";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentList from "./CommentList";
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import CommentsDisabledTwoToneIcon from '@mui/icons-material/CommentsDisabledTwoTone';
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import moment from 'moment';
import Button from "@mui/joy/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState} from "react";
import {Collapse} from "@mui/material";
import LoadingUrlCardList from "../loading/LoadingUrlCardList";

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

const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Comment({comment, depth, fetchCommentsData, onCommentButtonClick, onEditComment, onDeleteComment}){
    const ipPart = comment.userIp.split('.').slice(0, 2).join('.');
    // 날짜 형식을 'YYYY-MM-DD HH:mm' 형식으로 변환
    const createdAt = moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss');
    const updatedAt = moment(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss');
    // 생성 시간과 수정 시간이 다른지 여부를 통해 댓글이 수정되었는지 판단
    const isModified = createdAt !== updatedAt;

    //답글확장
    const [expand, setExpand] = useState(false);

    const handleReplyButtonClick = () => {
        setExpand(!expand);
        fetchReplies(comment.id);
    }

    //답글 목록을 위한 변수와 함수들.
    const [replyPage, setReplyPage] = useState(1); // 답글을 불러올 때 사용할 페이지 번호
    const [replySize, setReplySize] = useState(10); // 한 번에 불러올 답글의 개수
    const [replies, setReplies] = useState([]); // 불러온 답글 목록을 저장할 상태
    const [isRepliesLoading, setIsRepliesLoading] = useState(true); // 답글 불러오기의 로딩 상태

    const fetchReplies = (commentId) => {
        setIsRepliesLoading(true);

        fetchCommentsData(commentId, 'COMMENT', 1, replySize) // 1페이지, replySize는 원하는 답글 수
            .then(data => {
                setReplies(data); // 답글 상태 업데이트
                setIsRepliesLoading(false);
            })
            .catch(error => {
                setIsRepliesLoading(false);
            });
    };

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
                            {comment.text}
                            {!comment.isDeleted && isModified && <Typography sx={{display: 'block'}} level="body-xs">수정된 댓글입니다(<TimeAgo time={comment.updatedAt} />)</Typography>}
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
                                    <Typography sx={{ml: 0}} level="body-xs" color="neutral">{comment.replyCount}</Typography>
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
                        {/*버튼들*/}
                        {comment.replyCount > 0 && (
                            <Stack justifyContent="flex-start" alignItems="flex-start">
                                <Button sx={{
                                    p: 0, // 패딩을 0으로 설정
                                    pr: 1,
                                    minWidth: 0, // 최소 너비를 제거하거나 줄임
                                    '& .MuiButton-startDecorator': { // startDecorator에 적용되는 패딩 제거
                                        marginRight: 0,
                                        pl: 0
                                    }
                                }} variant="plain" size="sm"
                                        startDecorator={<StyledExpandMoreIcon expand={expand} />}
                                        onClick={handleReplyButtonClick}
                                >
                                    {comment.replyCount}개의 답글
                                </Button>
                            </Stack>
                        )}
                        <Collapse in={expand} timeout={0} unmountOnExit>
                            {isRepliesLoading ? (
                                <LoadingUrlCardList/>
                            ) : (
                                <CommentList
                                    comments={replies.content}
                                    depth={depth + 1}
                                    fetchCommentsData={fetchCommentsData}
                                    commentCount={replies.totalElements}
                                    onCommentButtonClick={onCommentButtonClick}
                                    onEditComment={onEditComment}
                                    onDeleteComment={onDeleteComment}
                                />
                            )}
                        </Collapse>
                    </Stack>
                </Stack>
            </CardContent>
        </CommentCard>
    );
}