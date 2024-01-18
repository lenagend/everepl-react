import Comment from "./Comment";
import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Box from "@mui/joy/Box";
import LoadingUrlCardList from "../loading/LoadingUrlCardList";
import NotExistCommentList from "../loading/NotExistCommentList";
export default function CommentList({fetchComments, comments, isCommentsLoading}) {

    return(
        <Card sx={{ p: 1.5, gap: 2 }}>

            <CardContent>
            {isCommentsLoading? (
                <LoadingUrlCardList/>
            ) : comments.content.length === 0 ? (
                <NotExistCommentList/>
            ) : (
                <Box>
                    {comments.content.map((comment) => (
                        <React.Fragment key={comment.id}>
                            <Comment comment={comment} />
                        </React.Fragment>
                    ))}
                </Box>
            )}
            </CardContent>
        </Card>
    );
}