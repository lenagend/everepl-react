import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Card from "@mui/joy/Card";
import {Chat} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import {useNavigate} from "react-router-dom";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FlagIcon from '@mui/icons-material/Flag';
import Box from "@mui/material/Box";
import SiteInfoCard from "./SiteInfoCard";

export default function UrlCard({ isViewPage }) {
    const navigate = useNavigate();

    const handleCommentButtonClick = () => {
        if (isViewPage) {

        } else {
            navigate('/comment');
        }
    };

    return (
        <Card sx={{ maxWidth: 'auto', mt: 2 }} color="primary" size="sm">
            <CardContent>
                <SiteInfoCard/>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <BookmarkIcon />
                </IconButton>
                <IconButton aria-label="comment">
                    <Badge badgeContent={100} max={99} color="primary">
                        <Chat onClick={handleCommentButtonClick}  aria-label="go comments page" />
                    </Badge>
                </IconButton>
            </CardActions>
        </Card>
    );
}
