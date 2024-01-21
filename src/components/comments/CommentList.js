import Comment from "./Comment";
import * as React from "react";
import CardContent from "@mui/joy/CardContent";
export default function CommentList({comments, depth, setTargetNicknameAndIp, setTargetId, setTargetType}) {

    return(
            <CardContent>
                {comments.map((comment) => (
                    <React.Fragment key={comment.id}>
                        <Comment
                            comment={comment}
                            depth={depth}
                            setTargetNicknameAndIp={setTargetNicknameAndIp}
                            setTargetId={setTargetId}
                            setTargetType={setTargetType}
                        />
                    </React.Fragment>
                ))}
            </CardContent>
    );
}