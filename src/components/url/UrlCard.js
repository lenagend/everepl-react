import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import VerticalUserMenu from "../iconButtons/VerticalUserMenu";
import Box from "@mui/material/Box";
import Typography from "@mui/joy/Typography";
import {Collapse, Pagination} from "@mui/material";
import CommentList from "../comments/CommentList";
import {Divider} from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import CommentTextArea from "../textFields/CommentTextArea";

export default function UrlCard({ isCommentPage }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card
            variant="outlined"
            sx={{
                '&:hover': { boxShadow: 'md', borderColor: 'primary.outlinedHoverBorder' },
                '& .css-14d6vet-MuiCardContent-root:last-child': {
                    paddingBottom: 0
                },
                border: isCommentPage? undefined: 'none',
                background: isCommentPage? undefined: 'none',
                padding: 1.5,
                gap: {
                    xs: 0
                }
            }}
        >
            <CardContent sx={{p: 0, pb: 0}} >
                <Stack direction="row" spacing={2}>
                    <Link
                        underline="none"
                        href="https://www.naver.com"
                        target="_blank"
                        sx={{ zIndex: 10}}
                    >
                    <AspectRatio ratio="1" sx={{ width: 40}}>
                        <img
                            src="/images/favicon/naver_favicon.ico"
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                    </Link>
                    <Stack sx={{flexGrow: 1}}>
                        <Typography level="title-md" id="card-description">
                            <Link
                                overlay
                                underline="none"
                                href="#"
                                onClick={handleExpandClick}
                                sx={{ color: 'text.tertiary' }}
                            >
                            지석진, 건강 문제로 '런닝맨' 잠시 하차 "치료 필요" [공식입장]
                            </Link>
                        </Typography>
                        <Typography level="body-sm" aria-describedby="card-description">
                            <Link
                                href="https://entertain.naver.com/read?oid=076&aid=0004089955"
                                target="_blank"
                            >
                                https://entertain.naver.com/read?oid=076&aid=0004089955
                            </Link>
                        </Typography>
                    </Stack>
                    <Box>
                        <VerticalUserMenu componentName={'Url'} />
                    </Box>
                </Stack>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Stack sx={{my: 2}} spacing={2}>
                    <Divider></Divider>
                    <CommentList/>
                    <Stack alignItems="center">
                        <Pagination count={10} showFirstButton showLastButton/>
                    </Stack>
                </Stack>
            </Collapse>
        </Card>
    );
}
