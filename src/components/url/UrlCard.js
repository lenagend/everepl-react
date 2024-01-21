import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import {useNavigate, useParams} from "react-router-dom";
import {Badge, CardOverflow, Chip, IconButton} from "@mui/joy";
import {useMediaQuery} from "@mui/material";
import {truncateString} from "../../utils/stringUtils";
import TimeAgo from "../../utils/TimeAgo";
import ChatBubbleTwoToneIcon from "@mui/icons-material/ChatBubbleTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";


export default function UrlCard({ isListItem, urlInfo }) {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');
    const { id } = useParams();

    const handleCardClick = () => {
        if (isListItem) {
            // 리스트 아이템일 경우, navigate를 사용
            navigate(`/view/${urlInfo.id}`);
        } else {
            // 리스트 아이템이 아닐 경우, 페이지 새로고침
            window.location.href = `/view/${urlInfo.id}`;
        }
    }

    return (

            <Card
                variant="outlined"
                sx={{
                    '&:hover': { boxShadow: 'md', borderColor: 'primary.outlinedHoverBorder' },
                    '& .css-14d6vet-MuiCardContent-root:last-child': {
                        paddingBottom: 0
                    },
                    border: isListItem? 'none': undefined,
                    background: isListItem? 'none': undefined,
                    padding: 1.5,
                    gap: {
                        xs: 0
                    }
                }}
            >
                <CardContent sx={{p: 0, pb: 0}} >
                    <Stack direction="row" spacing={3} >
                        <Link
                            underline="none"
                            href={urlInfo.url}
                            target="_blank"
                            sx={{ zIndex: 5}}
                        >
                                <AspectRatio ratio="1" sx={{ width: 40}} variant="plain">
                                <img
                                    src={urlInfo.faviconSrc ? urlInfo.faviconSrc : '/images/favicon/homepage.png'}
                                    loading="lazy"
                                    alt={urlInfo.title}
                                    />
                                </AspectRatio>
                        </Link>
                        <Stack sx={{flexGrow: 1}} spacing={1} justifyContent={
                            isListItem? "flex-start" : "center"
                        }>
                            <Typography level="title-md" id="card-description" sx={{fontWeight: 700}}
                                        variant={(id == urlInfo.id && isListItem)? 'solid' : 'plane'}
                                        color='primary'
                            >
                                <Link
                                    overlay
                                    underline="none"
                                    onClick={handleCardClick}
                                    sx={{ color: (id == urlInfo.id && isListItem) ? 'white' : 'text.tertiary'}}
                                >
                                    {isMobile ? truncateString(urlInfo.title, 35) : truncateString(urlInfo.title, 50)}
                                </Link>
                                <Typography  level="body-xs" color={
                                    (id == urlInfo.id && isListItem) ? 'white' : 'neutral'
                                } >
                                    &nbsp;&middot;&nbsp;<TimeAgo time={urlInfo.updatedAt} />
                                </Typography>
                            </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <IconButton variant="plain" sx={{
                                            "--IconButton-size": "20px",
                                            ml: -0.5
                                        }}>
                                            <ChatBubbleTwoToneIcon color="action" sx={{fontSize: 20}}/>
                                        </IconButton>
                                        <Typography sx={{ml: 0}} level="body-xs"
                                                    color="neutral">{urlInfo.commentCount}</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <IconButton variant="plain" sx={{
                                            "--IconButton-size": "20px",
                                            ml: -0.5
                                        }}>
                                            <FavoriteTwoToneIcon color="action" sx={{fontSize: 20}}/>
                                        </IconButton>
                                        <Typography sx={{ml: 0}} level="body-xs"
                                                    color="neutral">{urlInfo.likeCount}</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={0} alignItems="center">
                                        <IconButton variant="plain" sx={{
                                            "--IconButton-size": "20px",
                                            ml: -0.5
                                        }}>
                                            <MoreHorizIcon color="action" sx={{fontSize: 20}}/>
                                        </IconButton>
                                    </Stack>
                                </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
    );
}
