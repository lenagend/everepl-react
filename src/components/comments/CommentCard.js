import CommentTextArea from "../textFields/CommentTextArea";
import * as React from "react";
import Box from "@mui/material/Box";
import CommentCardContent from "./CommentCardContent";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Divider} from "@mui/joy";
import UrlCardContent from "../url/UrlCardContent";
import CommentList from "./CommentList";

export default function CommentCard() {
    return(
        <Card>
            <CardContent >
                    <CommentList/>
            </CardContent>
        </Card>

    );
}