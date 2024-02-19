import Comment from "./Comment";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import {CardOverflow, Divider, Typography} from "@mui/joy";
import CardContent from "@mui/joy/CardContent";
import NotExistCommentList from "../loading/NotExistCommentList";
export default function CommentList({comments, depth, onCommentButtonClick, onEditComment, onDeleteComment}) {

    return(
        <Card sx={{ p: 1.5, pt: 0}}>
            <CardOverflow
                color="primary"
                sx={{
                    pt: 2.5,
                    pb: 1,
                    px: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography level="title-md" variant="soft"  color="success" >
                    {comments.totalElements}개의 댓글이 있습니다.
                </Typography>
            </CardOverflow>
            <CardContent>
                {comments.totalElements > 0 ? (
                    <Stack spacing={1} divider={<Divider orientation="horizontal" />}>
                        {comments.content.map((comment) => (
                            <React.Fragment key={comment.id}>
                                <Comment
                                    comment={comment}
                                    depth={depth}
                                    onCommentButtonClick={onCommentButtonClick}
                                    onEditComment={onEditComment}
                                    onDeleteComment={onDeleteComment}
                                />
                            </React.Fragment>
                        ))}
                    </Stack>
                ) : (
                    <NotExistCommentList />
                )}

            </CardContent>
        </Card>
    );
}