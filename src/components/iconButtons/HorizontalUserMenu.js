import * as React from 'react';
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {Chat, FavoriteBorder} from "@mui/icons-material";

export default function HorizontalUserMenu({commentCount}) {
    return (
        <Stack direction="row" spacing={0.5}>
            <Button aria-label="댓글" sx={{px: 0.5}} size="sm" variant="plain"  startDecorator={<Chat/>}>
                {commentCount}(15분전)
            </Button>
        </Stack>
    );
}
