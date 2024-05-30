import * as React from "react";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import { Divider } from "@mui/joy";
import CardContent from "@mui/joy/CardContent";
import CommentWithResource from "./CommentWithSource";
export default function LikedOrMyCommentsList({comments}) {

    return(
        <Card sx={{ p: 1.5, pt: 2}}>
            <CardContent>
                <Stack spacing={1} divider={<Divider orientation="horizontal" />}>
                    {comments.map((comment, index) => (
                            <CommentWithResource
                                key={index} comment={comment}
                            />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}