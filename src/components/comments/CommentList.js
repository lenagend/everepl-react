import Comment from "./Comment";
import * as React from "react";
import CardContent from "@mui/joy/CardContent";
export default function CommentList({comments, depth, onCommentButtonClick}) {

    return(
            <CardContent>
                {comments.map((comment) => (
                    <React.Fragment key={comment.id}>
                        <Comment
                            comment={comment}
                            depth={depth}
                            onCommentButtonClick={onCommentButtonClick}
                        />
                    </React.Fragment>
                ))}
            </CardContent>
    );
}