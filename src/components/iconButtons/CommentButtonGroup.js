import {Stack} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SentimentVerySatisfiedTwoToneIcon from "@mui/icons-material/SentimentVerySatisfiedTwoTone";
import SentimentDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import {Chat} from "@mui/icons-material";
import * as React from "react";
import StyledBadge from "./StyledBadge";


export default function CommentButtonGroup({ onChatClick, depth }){
    return(
        <Stack direction="row">
            <IconButton aria-label="add to favorites">
                <StyledBadge
                    badgeContent={500}
                    max={999}
                    color="default"
                >
                    <SentimentVerySatisfiedTwoToneIcon/>
                </StyledBadge>
            </IconButton>
            <IconButton aria-label="add to favorites">
                <StyledBadge
                    badgeContent={20}
                    max={999}
                    color="default"
                >
                    <SentimentDissatisfiedTwoToneIcon/>
                </StyledBadge>
            </IconButton>
            <IconButton aria-label="comment">
                    <Chat aria-label="show comments" onClick={onChatClick}/>
            </IconButton>
        </Stack>
    );
}