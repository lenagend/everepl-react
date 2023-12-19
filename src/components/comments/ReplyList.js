import Stack from "@mui/joy/Stack";
import * as React from "react";
import Reply from "./Reply";
import Box from "@mui/material/Box";


export default function ReplyList(){
    return(
        <Box>
        <Stack spacing={1} sx={{ml:1, pl: 1, borderLeft: '1px solid #C7DFF7'}}>
            <Reply/>
            <Reply/>
            <Reply/>
        </Stack>
        </Box>
    );
}