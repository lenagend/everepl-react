import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import {useNavigate} from "react-router-dom";
import {Badge, Chip} from "@mui/joy";
import {ChatBubble, Favorite, FavoriteBorder} from "@mui/icons-material";
import {useMediaQuery} from "@mui/material";
import {truncateString} from "../../utils/stringUtils";
import TimeAgo from "../../utils/TimeAgo";


export default function UrlCard({ isListItem, urlInfo }) {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

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
                                    src={urlInfo.faviconSrc}
                                    loading="lazy"
                                    alt={urlInfo.title}
                                    />
                                </AspectRatio>
                        </Link>
                        <Stack sx={{flexGrow: 1}} spacing={1}>
                                <Typography level="title-md" id="card-description" sx={{fontWeight: 700}}>
                                    <Link
                                        overlay
                                        underline="none"
                                        onClick={handleCardClick}
                                        sx={{ color: 'text.tertiary' }}
                                    >
                                        {isMobile ? truncateString(urlInfo.title, 35) : urlInfo.title}
                                    </Link>
                                </Typography>

                            <Stack direction="row" spacing={1}>
                                <Chip variant="soft" component="span" color="danger" size="sm" startDecorator={<Favorite sx={{fontSize: 12}}/>}>
                                    {urlInfo.likeCount}
                                </Chip>
                                <Chip variant="soft" component="span" size="sm" startDecorator={<ChatBubble sx={{fontSize: 12}}/>}>
                                    {urlInfo.commentCount}
                                </Chip>
                                <Chip variant="soft" component="span" color="success" size="sm" >
                                   <TimeAgo time={urlInfo.updatedAt} />
                                </Chip>
                            </Stack>
                            {/*<HorizontalUserMenu likeCount={urlInfo.likeCount} commentCount={urlInfo.commentCount}/>*/}
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
    );
}
