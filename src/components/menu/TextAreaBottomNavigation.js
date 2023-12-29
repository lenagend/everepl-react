import * as React from 'react';
import Box from "@mui/material/Box";
import CommentTextArea from "../textFields/CommentTextArea";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {CardOverflow, Container, Typography} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/joy/IconButton";
export default function TextAreaBottomNavigation({ }) {

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
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography level="title-md">@UserA에게 댓글쓰기</Typography>
                            <IconButton size="sm" >
                                <CloseIcon/>
                            </IconButton>
                        </Stack>
                    </CardOverflow>
                    <CardContent sx={{p: 0}}>
                        <CommentTextArea/>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
