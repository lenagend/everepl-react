import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {CardOverflow, IconButton} from "@mui/joy";
import {useMediaQuery} from "@mui/material";
import {truncateString} from "../../utils/stringUtils";
import TimeAgo from "../../utils/TimeAgo";
import ChatBubbleTwoToneIcon from "@mui/icons-material/ChatBubbleTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import YouTubeEmbed from "../embeds/YouTubeEmbed";
import InstagramEmbed from "../embeds/InstagramEmbed";


export default function UrlCard({ isListItem, urlInfo }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width:600px)');
    const { id } = useParams();

    const handleCardClick = () => {
        if (isListItem) {
            // 현재 URL의 쿼리 파라미터를 그대로 사용
            navigate(`/view/${urlInfo.id}${location.search}`);
        } else {
            // 현재 URL의 쿼리 파라미터를 그대로 사용하여 페이지 새로고침
            window.location.href = `/view/${urlInfo.id}${location.search}`;
        }
    };

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
                <CardContent sx={{p: 0,
                    pb: isListItem? 0 : 2
                }} >
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
                        <Stack sx={{flexGrow: 1}} spacing={0} justifyContent={
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
                                    {isMobile ? truncateString(urlInfo.title, 45) : truncateString(urlInfo.title, 50)}
                                </Link>
                                <Typography  level="body-xs" color={
                                    (id == urlInfo.id && isListItem) ? 'white' : 'neutral'
                                } >
                                    &nbsp;&middot;&nbsp;<TimeAgo time={urlInfo.updatedAt} />
                                </Typography>
                            </Typography>
                                <Link
                                    underline="hover"
                                    href={urlInfo.url}
                                    target="_blank"
                                    variant="plain"
                                    level="body-xs"
                                    sx={{ zIndex: 6, pt: 0, pl: 0.5}}
                                >
                                {isMobile ? truncateString(urlInfo.url, 40) : truncateString(urlInfo.url, 100)}
                                </Link>
                                {isListItem? (
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{pt: 0.5}}>
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
                                ): null}
                        </Stack>
                    </Stack>
                </CardContent>
                {isListItem ? null : (
                    <CardOverflow>
                        {urlInfo.url.includes('youtube.com') ? (
                            <YouTubeEmbed url={urlInfo.url} />
                        ) : urlInfo.url.includes('instagram.com') ? (
                            <InstagramEmbed url={urlInfo.url} />
                        ) : null}
                    </CardOverflow>
                )}
            </Card>
    );
}
