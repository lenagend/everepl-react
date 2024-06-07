import Comment from "./Comment";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import NotExistCommentList from "../loading/NotExistCommentList";
import {CardOverflow, Typography} from "@mui/joy";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import Box from "@mui/joy/Box";
export default function CommentList({commentCount, comments, onCommentButtonClick, onEditComment, onDeleteComment, isReply, onLike}) {
    const location = useLocation();

    // URL에서 commentId 쿼리 파라미터를 추출합니다.
    const queryParams = new URLSearchParams(location.search);
    const commentId = queryParams.get('commentId');

    useEffect(() => {
        if (commentId) {
            // 해당 댓글로 스크롤 이동
            const element = document.getElementById(`comment-${commentId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [commentId]);

    return(
        <Card sx={{
            p: !isReply && 1.5,
            background: isReply && 'none',
            pt: !isReply && 0,
            border: isReply && 'none',
        }}>
            {!isReply &&
               (
                <CardOverflow
                    color="primary"
                    sx={{
                        pt: 2.5,
                        pb: 1,
                        px: 1,
                        borderBottom: '1px solid',
                        borderColor: 'divider',

                    }}
                >
                    <Typography level="title-md" sx={{
                        background: '#0A2744',
                        color: '#E3EFFB',
                        p: 0.5,
                        px: 1.5,
                        borderRadius: 8,
                        fontWeight: 600
                    }}>
                        {/*처리할것*/}
                        {commentCount}개의 댓글이 있습니다.
                    </Typography>
                </CardOverflow>
                 )
            }
            <CardContent sx={{background: 'none'}}>
                {comments.length > 0 ? (
                    <Stack
                        spacing={isReply ? 0 : 1}
                    >
                        {comments.map((comment) => (
                            <React.Fragment key={comment.id}>
                                <Box id={`comment-${comment.id}`}>
                                    <Comment
                                        comment={comment}
                                        onCommentButtonClick={onCommentButtonClick}
                                        onEditComment={onEditComment}
                                        onDeleteComment={onDeleteComment}
                                        onLike={onLike}
                                    />
                                </Box>
                            </React.Fragment>
                        ))}
                    </Stack>
                ) : (
                    <NotExistCommentList border={"none"}/>
                )}

            </CardContent>
        </Card>
    );
}