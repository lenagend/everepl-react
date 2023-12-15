import * as React from 'react';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CommentTextArea from "../textFields/CommentTextArea";
import CommentButtonGroup from "../iconButtons/CommentButtonGroup";
import {Grid, Stack} from "@mui/joy";
import Typography from "@mui/joy/Typography";

export default function CommentList() {
    return(
        <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{width: 30, height: 30}}/>
                <Typography color="primary" level="title-md">익명1</Typography>
                <Typography color="neutral" level="body-md">&middot; 15분 전 작성</Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography
                    color="neutral"
                    level="title-md"
                    variant="soft"
                    sx={{p: 2}}
                >
                    솔직히 시원스쿨은 현지가보면 쳐주지도 않는다. 내가 영국 갔을 때 'Do you know seewonschool?'이라고 영국 맨체스터 국문학과 다니는 학생 발음으로 질문했더니 지나가던 영국 과외 알바생이 'aha? I want to go and get some coffee!'라고 하던 게 눈에 선하다. 그에 비해
                </Typography>
                <CommentButtonGroup />
                <CommentTextArea/>
                <Divider variant="inset" />
            </Stack>

        </Stack>
    );
}