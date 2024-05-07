import Comment from "./Comment";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import NotExistCommentList from "../loading/NotExistCommentList";
import {CardOverflow, Typography} from "@mui/joy";
export default function CommentList({commentCount, comments, onCommentButtonClick, onEditComment, onDeleteComment, isReply}) {

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
                                <Comment
                                    comment={comment}
                                    onCommentButtonClick={onCommentButtonClick}
                                    onEditComment={onEditComment}
                                    onDeleteComment={onDeleteComment}
                                />
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