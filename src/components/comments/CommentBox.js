import CommentTextArea from "../textFields/CommentTextArea";
import * as React from "react";
import Box from "@mui/material/Box";
import CommentCard from "./CommentCard";

export default function CommentBox() {
    return(
        <Box>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
        </Box>

    );
}