import Comment from "./Comment";
import * as React from "react";
import CardContent from "@mui/joy/CardContent";
export default function CommentList({comments, depth, fetchCommentsData, onCommentButtonClick, onEditComment, onDeleteComment}) {

    return(
            <CardContent>
                {comments.map((comment) => (
                    <React.Fragment key={comment.id}>
                        <Comment
                            comment={comment}
                            depth={depth}
                            fetchCommentsData={fetchCommentsData}
                            onCommentButtonClick={onCommentButtonClick}
                            onEditComment={onEditComment}
                            onDeleteComment={onDeleteComment}
                        />
                    </React.Fragment>
                ))}
            </CardContent>
    );
}