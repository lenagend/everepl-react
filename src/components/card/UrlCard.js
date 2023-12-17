import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from "@mui/joy/Card";
import {Chat} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import {useNavigate} from "react-router-dom";
import CommentTextArea from "../textFields/CommentTextArea";


export default function UrlCard({ isViewPage }) {
    const navigate = useNavigate();

    const handleCommentButtonClick = () => {
        if (isViewPage) {

        } else {
            navigate('/view');
        }
    };

    return (
        <Card sx={{ maxWidth: 'auto', mt: 2 }} color="primary">
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        G
                    </Avatar>
                }
                title={
                   'https://www.youtube.com/watch?v=2zx3REQxfDo'
                }
                subheader={
                    '업데이트:23/12/15 13:26'
                }
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    타이틀: 쇠쟁이들은 정말 다 이럴까...? (Feat. 마선호)
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon color="error"/>
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
