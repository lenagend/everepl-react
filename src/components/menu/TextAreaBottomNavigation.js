import * as React from 'react';
import Box from "@mui/material/Box";
import CommentTextArea from "../textFields/CommentTextArea";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {CardOverflow, Container, Typography} from "@mui/joy";

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
                            textAlign: 'left',
                            fontSize: 'sm',
                            fontWeight: 'xl',
                            letterSpacing: '1px',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                            @UserA에게 댓글쓰기
                    </CardOverflow>
                    <CardContent sx={{p: 0}}>
                        <CommentTextArea/>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
