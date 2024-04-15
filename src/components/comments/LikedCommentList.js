import * as React from "react";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import { Divider } from "@mui/joy";
import CardContent from "@mui/joy/CardContent";
import Comment from "./Comment";
export default function LikedCommentList({comments}) {

    return(
        <Card sx={{ p: 1.5, pt: 2}}>
            <CardContent>
                <Stack spacing={1} divider={<Divider orientation="horizontal" />}>
                    {comments.content.map((comment, index) => (
                            <Comment
                                key={index} comment={comment} commentConext={"liked"}
                            />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}