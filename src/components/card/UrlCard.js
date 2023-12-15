import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from "@mui/joy/Card";
import {Chat} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import CommentList from "../comments/CommentList";


export default function UrlCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 'auto', mt: 2 }} color="primary">
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        G
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="https://www.youtube.com/watch?v=2zx3REQxfDo"
                subheader="첫댓글: 2023년 12월 24일"
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
                        <Chat onClick={handleExpandClick}  aria-label="show comments" />
                    </Badge>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                   <CommentList/>
                </CardContent>
            </Collapse>
        </Card>
    );
}
