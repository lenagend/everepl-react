import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Card from "@mui/joy/Card";
import {Chat} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import VerticalUserMenu from "../iconButtons/VerticalUserMenu";
import Box from "@mui/material/Box";
import CommentTextArea from "../textFields/CommentTextArea";
import Typography from "@mui/joy/Typography";
import {Badge} from "@mui/joy";

export default function UrlCard({ isCommentPage }) {
    const navigate = useNavigate();

    const handleCommentButtonClick = () => {
        if (isCommentPage) {
        } else {
            navigate('/comment');
        }
    };


    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                '&:hover': { boxShadow: 'md', borderColor: 'primary.outlinedHoverBorder' },
                '& .css-14d6vet-MuiCardContent-root:last-child': {
                    paddingBottom: 50
                },
                border: isCommentPage? undefined: 'none',
                background: isCommentPage? undefined: 'none',
                padding: 1.5,
                gap: {
                    xs: 0
                }
            }}
        >
            <Badge
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                badgeContent={100000}
                color="danger"
            >
                <AspectRatio ratio="1" sx={{ width: 60, minWidth: 40 }}>
                    <img
                        src="/images/favicon/naver_favicon.ico"
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
            </Badge>
            <CardContent sx={{p: 0, pb: 0}} sx={{flexGrow: 1}}>
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
                <Stack spacing={0.5} alignItems="flex-start" >
                    <Button aria-label="댓글" sx={{px: 0.5}} size="sm" variant="plain"  startDecorator={<Chat/>} onClick={handleCommentButtonClick}>
                            99+ 댓글
                    </Button>
                </Stack>
            </CardContent>
            <Box sx={{ml: 'auto'}}>
                <VerticalUserMenu componentName={'Url'} />
            </Box>
        </Card>
    );
}
