import Comment from "./Comment";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import CommentTextArea from "../textFields/CommentTextArea";
import * as React from "react";
import Divider from "@mui/material/Divider";
import {useState} from "react";
const testComments = [
    {
        id: 1,
        userIp: "192.168.1.1",
        nickname: "UserA",
        url: "https://example.com/article1",
        text: "Great article!",
        pin: "1234",
        createdAt: "2023-12-15 11:00",
        updatedAt: "2023-12-15 11:30",
        parentCommentId: null,
        reportCount: 0
    },
    {
        id: 2,
        userIp: "192.168.1.2",
        nickname: "UserB",
        url: "https://example.com/article2",
        text: "Interesting point of view.",
        pin: "5678",
        createdAt: "2023-12-15 11:00",
        updatedAt: "2023-12-15 11:30",
        parentCommentId: 1,
        reportCount: 1
    },
    // 이하 동일한 구조로 3개의 추가 코멘트
];
export default function CommentList({depth = 0}) {

    if (depth > 3) return null;

    return(
        <Box>
            <Stack spacing={2} sx={{ ml: depth * 1}}>
                {testComments.map(comment => (
                    <Comment key={comment.id} comment={comment} depth={depth}/>
                ))}
            </Stack>
        </Box>
    );
}