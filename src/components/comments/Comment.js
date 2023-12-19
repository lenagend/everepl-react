import {ButtonGroup, Divider, Stack, Step, StepIndicator} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/joy/Button";
import {Chat} from "@mui/icons-material";
import FlagIcon from "@mui/icons-material/Flag";
import CardContent from "@mui/joy/CardContent";
import styled from "@emotion/styled";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";

const StyledCard = styled(Card)(({ theme }) => ({
    '& .css-14d6vet-MuiCardContent-root:last-child': {
        paddingBottom: 0
    },
    padding: 0,
    border: 'none',
    background: 'none',
    gap: 1
}));

export default function Comment({comment, depth}){
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return(
        <StyledCard orientation="horizontal" variant="outlined" >
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
                            <Stack direction="row" sx={{ml: 'auto'}}>
                                <IconButton>
                                    <EditIcon color="primary"/>
                                </IconButton>
                                <IconButton>
                                    <DeleteForeverIcon color="primary"/>
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Typography
                            level="body-sm"
                            sx={{pl: 1}}
                        >
                            {comment.text}
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                            <Button aria-label="댓글" sx={{px: 0.5}} size="sm" variant="plain"  startDecorator={<Chat/>} onClick={handleExpandClick}>
                                99+ 댓글
                            </Button>
                            <Button aria-label="신고" sx={{px: 0.5}} size="sm" variant="plain"  startDecorator={<FlagIcon />}>
                                신고
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </StyledCard>
    );
}