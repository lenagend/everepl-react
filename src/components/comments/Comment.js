import {Stack} from "@mui/joy";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/joy/Typography";
import CommentButtonGroup from "../iconButtons/CommentButtonGroup";
import * as React from "react";
import {Divider, Grid} from "@mui/material";
import CommentList from "./CommentList";
import {useState} from "react";
import CommentTextArea from "../textFields/CommentTextArea";

export default function Comment({comment, depth}){
    const [showTextArea, setShowTextArea] = useState(false);

    const handleChatClick = () => {
        setShowTextArea(!showTextArea);
    };

    return(
        <Stack spacing={1} >
            <Grid container alignItems="center" spacing={1}>
                <Grid item>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30 }} />
                </Grid>
                <Grid item>
                    <Typography color="primary" level="title-md">
                        {comment.nickname}({comment.userIp})
                    </Typography>
                </Grid>
                <Grid item xs={12} sm="auto">
                    <Typography color="neutral" level="body-sm">
                        &middot; {comment.createdAt}
                    </Typography>
                </Grid>
            </Grid>
            <Stack spacing={2}>
                <Typography
                    color="neutral"
                    level="body-sm"
                    variant="soft"
                    sx={{p: 2}}
                >
                    {comment.text}
                </Typography>
            </Stack>
            <CommentButtonGroup onChatClick={handleChatClick} depth={depth}/>
            <Divider/>
            {showTextArea && <CommentTextArea/>}
            <CommentList depth={depth + 1} />
        </Stack>
    );
}