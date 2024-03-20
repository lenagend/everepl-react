import * as React from "react";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import { Divider } from "@mui/joy";
import CardContent from "@mui/joy/CardContent";
import BookmarkComment from "./BookmarkComment";
export default function BookmarkCommentList({comments}) {

    return(
        <Card sx={{ p: 1.5, pt: 2}}>
            <CardContent>
                <Stack spacing={1} divider={<Divider orientation="horizontal" />}>
                    {comments.content.map((comment, index) => (
                            <BookmarkComment
                                key={index} comment={comment}
                            />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}