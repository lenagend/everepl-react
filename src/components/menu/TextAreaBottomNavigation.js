import * as React from 'react';
import Box from "@mui/material/Box";
import CommentTextArea from "../textFields/CommentTextArea";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {CardOverflow, Container, FormControl, Input, Typography} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import IconButtonJoy from '@mui/joy/IconButton';
import SendIcon from '@mui/icons-material/Send';
import AspectRatio from "@mui/joy/AspectRatio";
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Collapse} from "@mui/material";
import Link from "@mui/joy/Link";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function TextAreaBottomNavigation({ }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10}} elevation={3}>
            <Container maxWidth="md" sx={{p: 0}}>
                <Card sx={{p: 0, gap: 0}}>
                    <CardOverflow
                        variant="soft"
                        color="primary"
                        sx={{
                            px: 2,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Link
                            overlay
                            onClick={handleExpandClick}
                            underline="none"
                        >
                        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography level="title-md">댓글쓰기</Typography>
                            <ExpandMore
                                expand={expanded}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </Stack>
                        </Link>
                    </CardOverflow>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent sx={{p: 0}}>
                            <Card orientation="horizontal" variant="outlined" sx={{p: 1, border: 'none'}}>
                                <CardContent>
                                        <Box sx={{flexGrow: 1}}>
                                            <CommentTextArea/>
                                        </Box>
                                </CardContent>
                                <Stack spacing={2}>
                                    <AspectRatio ratio="1" sx={{ width: {
                                            xs: 60,
                                            sm: 90
                                        }}} variant="outlined">
                                        <img
                                            src="/images/character/level2.png"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </AspectRatio>
                                    <IconButtonJoy variant="solid" color="primary" sx={{flexGrow: 1}}
                                    >
                                        <SendIcon />
                                    </IconButtonJoy>
                                </Stack>
                            </Card>
                        </CardContent>
                    </Collapse>
                </Card>
            </Container>
        </Box>
    );
}
