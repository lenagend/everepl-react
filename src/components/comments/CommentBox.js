import CommentList from "./CommentList";
import CommentTextArea from "../textFields/CommentTextArea";
import * as React from "react";
import Box from "@mui/material/Box";

export default function CommentBox() {
    return(
        <Box>
            <CommentTextArea/>
            <CommentList/>
        </Box>

    );
}