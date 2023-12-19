import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Card from "@mui/joy/Card";
import {Chat} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import {useNavigate} from "react-router-dom";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import styled from "@emotion/styled";
import FlagIcon from '@mui/icons-material/Flag';
import Button from "@mui/joy/Button";

const StyledCard = styled(Card)(({ theme }) => ({
    '& .css-14d6vet-MuiCardContent-root:last-child': {
       paddingBottom: 0
    },
    border: 'none',
    background: 'none',
    padding: 10
}));


export default function UrlCardContent({ isViewPage }) {
    const navigate = useNavigate();

    const handleCommentButtonClick = () => {
        console.log("ㅎㅇ");
        if (isViewPage) {

        } else {
            navigate('/comment');
        }
    };

    return (
        <StyledCard
            variant="outlined"
            orientation="horizontal"
            sx={{
                '&:hover': { boxShadow: 'md', borderColor: 'primary.outlinedHoverBorder' },
            }}
        >
            <AspectRatio ratio="1" sx={{ width: 60 }}>
                <img
                    src="/images/favicon/naver_favicon.ico"
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <CardContent sx={{p: 0, pb: 0}}>
                <Typography level="title-md" id="card-description">
                    지석진, 건강 문제로 '런닝맨' 잠시 하차 "치료 필요" [공식입장]
                </Typography>
                <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                    <Link
                        overlay
                        underline="none"
                        href="https://entertain.naver.com/read?oid=076&aid=0004089955"
                        sx={{ color: 'text.tertiary' }}
                    >
                        https://entertain.naver.com/read?oid=076&aid=0004089955
                    </Link>
                </Typography>
                <Stack direction="row" spacing={0.5}>
                    <Button aria-label="북마크" sx={{px: 0.5}} size="sm" variant="plain"  startDecorator={<BookmarkIcon /> }>
                        북마크
                    </Button>
                    <Button aria-label="댓글" sx={{px: 0.5}} size="sm" variant="plain"  startDecorator={<Chat/>} onClick={handleCommentButtonClick}>
                            99+ 댓글
                    </Button>
                    <Button aria-label="신고" sx={{px: 0.5}} size="sm" variant="plain"  startDecorator={<FlagIcon />}>
                        신고
                    </Button>
                </Stack>
            </CardContent>
        </StyledCard>
    );
}
