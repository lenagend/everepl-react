import { Divider, Stack} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import Button from "@mui/joy/Button";
import {Chat} from "@mui/icons-material";
import CardContent from "@mui/joy/CardContent";
import styled from "@emotion/styled";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import VerticalUserMenu from "../iconButtons/VerticalUserMenu";
import HorizontalUserMenu from "../iconButtons/HorizontalUserMenu";

const CommentCard = styled(Card)(({ theme }) => ({
    '& .css-14d6vet-MuiCardContent-root:last-child': {
        paddingBottom: 0
    },
    padding: 0,
    border: 'none',
    background: 'none',
    gap: 1
}));

export default function Comment({comment}){
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return(
        <CommentCard orientation="horizontal" variant="outlined" >
            <Stack>
                <AspectRatio ratio="1" sx={{ width: {
                        xs: 40,
                        sm: 60
                    } }} variant="outlined">
                    <img
                        src="/images/character/level2.png"
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <Stack direction="row" sx={{height: '100%'}}>
                    <Box sx={{width: '50%'}}/><Divider orientation="vertical"></Divider><Box/>
                </Stack>
            </Stack>

            <CardContent >
                <Stack direction="row">
                    <Stack sx={{flexGrow: 1}} spacing={1}>
                        <Stack direction="row" sx={{alignItems: 'center'}}>
                            <Typography level="title-sm" color="primary" px={1}>
                                {comment.nickname}({comment.userIp})
                            </Typography>
                            <Typography  level="body-xs" color="neutral">
                                {comment.createdAt}
                            </Typography>
                            <Box sx={{ml: 'auto'}}>
                                <VerticalUserMenu componentName={'Comment'} />
                            </Box>
                        </Stack>
                        <Typography
                            level="body-sm"
                            sx={{pl: 1}}
                        >
                            {comment.text}
                        </Typography>
                        <HorizontalUserMenu/>
                    </Stack>
                </Stack>
            </CardContent>
        </CommentCard>
    );
}