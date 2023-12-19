import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import {FormControl, FormHelperText, FormLabel, Input} from "@mui/joy";
import Stack from "@mui/joy/Stack";

export default function UserCard() {
    return (
        <Card orientation="horizontal" variant="outlined" sx={{mt: 2, p: 1}}>
            <AspectRatio ratio="1" sx={{ width: 90,  }} variant="outlined">
                <img
                    src="/images/character/level2.png"
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <CardContent>
                <Stack direction={{sm: 'row'}} alignItems="center">
                    <Typography fontWeight="md" textColor="success.plainColor" level="title-sm" sx={{flexGrow: 1}}>
                        프로필을 작성해주세요
                    </Typography>
                    <Button sx={{p: 0}} size="sm" variant="plain">로그인/회원가입</Button>
                </Stack>
                <Box maxWidth={250}>
                    <FormControl>
                        <Input placeholder="익명5" size="sm"/>
                        <FormHelperText sx={{fontSize:12}}>댓글에 표시될 닉네임입니다.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input placeholder="0012" size="sm"/>
                        <FormHelperText sx={{fontSize:12}}>삭제에 필요한 비밀번호입니다.</FormHelperText>
                    </FormControl>
                </Box>
            </CardContent>
            <CardOverflow
                variant="soft"
                color="primary"
                sx={{
                    px: 0.2,
                    writingMode: 'vertical-rl',
                    textAlign: 'center',
                    fontSize: 'xs',
                    fontWeight: 'xl',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                }}
            >
                계정
            </CardOverflow>
        </Card>
    );
}
