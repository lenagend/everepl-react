import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone';
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';
import styled from "@emotion/styled";
import {Chat} from "@mui/icons-material";
import CommentTextArea from "../textFields/commentTextArea";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -6,
        top: -1,
        padding: '0 4px',
        fontWeight: 'bold'
    },
}));

export default function CommentList() {
    return(
        <List sx={{ width: '100%' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="익명1"
                    secondary={
                        <React.Fragment>
                            {"솔직히 시원스쿨은 현지가보면 쳐주지도 않는다. 내가 영국 갓을때 'Do you know seewonschool?'이라고 영국 맨체스터 국문학과 다니는 학생 발음으로 질문했더니 지나가던 영국 과외 알바생이 'aha? I wnat a go and get some coffee!라고 하던 게 눈에 선하다. 그에 비해 "}
                            <Box height="1rem"/>
                            <IconButton aria-label="add to favorites">
                                <StyledBadge
                                       badgeContent={500}
                                       max={999}
                                       color="default"
                                       anchorOrigin={{
                                           vertical: 'top',
                                           horizontal: 'right',
                                       }}
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
                                <StyledBadge
                                    badgeContent={20}
                                    max={999}
                                    color="default"
                                >
                                    <Chat aria-label="show comments" />
                                </StyledBadge>
                            </IconButton>
                            <CommentTextArea />
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
            <ListItemText
                primary="익명2"
                secondary={
                    <React.Fragment>
                        {" 위에 뭐라고 하는거냐 "}
                        <Box height="1rem"/>
                        <IconButton aria-label="add to favorites">
                            <StyledBadge
                                badgeContent={500}
                                max={999}
                                color="default"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
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
                            <StyledBadge
                                badgeContent={20}
                                max={999}
                                color="default"
                            >
                                <Chat aria-label="show comments" />
                            </StyledBadge>
                        </IconButton>
                    </React.Fragment>
                }
            />
        </ListItem>
        </List>
    );
}