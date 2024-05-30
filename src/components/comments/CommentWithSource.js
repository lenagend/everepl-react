import {Divider, Stack, Dropdown, IconButton, Button, Chip} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import CardContent from "@mui/joy/CardContent";
import Card from "@mui/joy/Card";
import TimeAgo from "../../utils/TimeAgo";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import Box from "@mui/material/Box";
import LikeButton from "../iconButtons/LikeButton";
import Link from "@mui/joy/Link";
import CommentList from "./CommentList";
import {useState} from "react";
import ProfileImage from "../user/ProfileImage";
import {useAuth} from "../../security/AuthProvider";
import {useSnackbar} from "../../contexts/SnackbarProvider";
import {STATIC_SERVER_URL} from "../../config/Config";
import ReportButton from "../iconButtons/ReportButton";
import {truncateString} from "../../utils/stringUtils";
import {useMediaQuery} from "@mui/material";

function CommentWithResource({ comment, onCommentButtonClick, onEditComment, onDeleteComment }) {
    const [replies, setReplies] = useState(comment.replies || []);
    const [isAllRepliesLoaded, setIsAllRepliesLoaded] = useState(false);
    const [isRepliesLoading, setIsRepliesLoading] = useState(false);
    const { axiosInstance, user } = useAuth();
    const { showSnackbar } = useSnackbar();
    const isMobile = useMediaQuery('(max-width:600px)');

    const commentUserUrl = comment.comment.user.imageUrl && `${STATIC_SERVER_URL}${comment.comment.user.imageUrl}`;

    const fetchAllReplies = async () => {
        try {
            setIsRepliesLoading(true);
            const response = await axiosInstance.get(`/comment/${comment.comment.id}/replies`);
            setReplies(response.data);
            setIsAllRepliesLoaded(true);
            setIsRepliesLoading(false);
        } catch (error) {
            showSnackbar('답글 목록을 불러오는데 실패했습니다.', 'danger');
            setIsRepliesLoading(false);
        }
    };

    return (
        <Box>

            <Card variant="soft" color="neutral" sx={{
                overflow: 'auto',
                padding: 1,
                '& .css-14d6vet-MuiCardContent-root:last-child': {
                    paddingBottom: 0
                },
                gap: 0,
                border: '1px dotted #0A2744'
            }}>
                <Box sx={{p: 1, pt: 0}}>
                    <Chip  color="primary" variant={'solid'}>{isMobile ? truncateString(comment.sourceTitle, 20) : comment.sourceTitle}</Chip>
                </Box>
                <Stack direction={'row'}>
                    <Link underline="none" href={comment.sourceLink} sx={{ zIndex: 5 }} overlay />
                    <Stack>
                        <ProfileImage src={commentUserUrl} />
                        {replies.length > 0 && (
                            <Stack direction="row" sx={{ height: '100%' }}>
                                <Box sx={{ width: '50%' }} /><Divider orientation="vertical" /><Box />
                            </Stack>
                        )}
                    </Stack>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Stack direction="row">
                            <Stack sx={{ pl: 1, pb: 1 }} spacing={1}>
                                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                                    <Typography level="title-sm" color="neutral">
                                        {comment.comment.user.name}
                                        <Typography level="body-xs" color="neutral">
                                            &nbsp;&middot;&nbsp;<TimeAgo time={comment.comment.createdAt} />
                                        </Typography>
                                    </Typography>
                                </Stack>
                                <Typography
                                    level="body-sm"
                                    pr={{ xs: 1 }}
                                >
                                    {comment.comment.parentCommentUser && (
                                        <Typography level="title-md" color="primary" sx={{ mr: 1 }}>@{comment.comment.parentCommentUser.name}</Typography>
                                    )}
                                    {comment.comment.text}
                                    {comment.comment.modified && (
                                        <Typography color="primary" sx={{ display: 'block' }} level="body-xs">수정된 댓글입니다(<TimeAgo time={comment.comment.updatedAt} />)</Typography>
                                    )}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        {comment.comment.type !== 'COMMENT' && (
                                            <>
                                                <IconButton variant="plain" sx={{
                                                    "--IconButton-size": "20px",
                                                    ml: -0.5
                                                }}
                                                            onClick={() => onCommentButtonClick(comment, comment.comment.id, 'COMMENT')}
                                                >
                                                    <CommentTwoToneIcon color="action" sx={{ fontSize: 20 }} />
                                                </IconButton>
                                                <Typography sx={{ ml: 0 }} level="body-xs" color="neutral">{comment.comment.commentCount}</Typography>
                                            </>
                                        )}
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <LikeButton targetId={comment.comment.id} targetType={"COMMENT"} likeButtonContext={"COMMENT"} />
                                        <Typography sx={{ ml: 0 }} level="body-xs" color="neutral">{comment.comment.likeCount}</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <Stack alignContent={"center"} justifyContent={"center"}>
                                            <Dropdown>
                                                <MenuButton
                                                    slots={{ root: IconButton }}
                                                    slotProps={{ root: { variant: 'plane' } }}
                                                >
                                                    <FlagTwoToneIcon color="action" sx={{ ml: -1.5 }} />
                                                </MenuButton>
                                                <Menu>
                                                    <ReportButton targetId={comment.comment.user.id} targetType={'USER'} />
                                                    <ReportButton targetId={comment.comment.user.id} targetType={'COMMENT'} />
                                                </Menu>
                                            </Dropdown>
                                        </Stack>
                                    </Stack>
                                    {!comment.comment.isDeleted && user && comment.comment.user && user.id === comment.comment.user.id && (
                                        <Stack direction="row" spacing={0} alignItems="center">
                                            <Dropdown>
                                                <MenuButton
                                                    slots={{ root: IconButton }}
                                                    slotProps={{ root: { variant: 'plane' } }}
                                                >
                                                    <MoreHorizIcon color="action" />
                                                </MenuButton>
                                                <Menu>
                                                    <MenuItem onClick={() => onEditComment(comment)}><EditTwoToneIcon color="action" />수정</MenuItem>
                                                    <MenuItem onClick={() => onDeleteComment(comment)}><DeleteTwoToneIcon color="action" />삭제</MenuItem>
                                                </Menu>
                                            </Dropdown>
                                        </Stack>
                                    )}
                                </Stack>
                                {replies.length > 0 && (
                                    <Box sx={{ width: 'calc(100% + 15px)', transform: 'translateX(-15px)' }}>
                                        <CommentList
                                            comments={replies}
                                            onCommentButtonClick={onCommentButtonClick}
                                            onEditComment={onEditComment}
                                            onDeleteComment={onDeleteComment}
                                            isReply={true}
                                        />
                                        {comment.comment.commentCount - replies.length > 0 && (
                                            <Button variant={'plain'} onClick={fetchAllReplies} disabled={isRepliesLoading}>
                                                {comment.comment.commentCount - replies.length}개의 대댓글 더보기<MoreHorizIcon />
                                            </Button>
                                        )}
                                    </Box>
                                )}
                            </Stack>
                        </Stack>
                    </CardContent>
                </Stack>
            </Card>
        </Box>
    );
}

export default CommentWithResource;