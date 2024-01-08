import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import UrlCard from "./UrlCard";
import CardOverflow from "@mui/joy/CardOverflow";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import {Divider} from "@mui/joy";
import Button from "@mui/joy/Button";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {Pagination, useMediaQuery} from "@mui/material";

export default function UrlListCard({urlInfos, page, handlePageChange, handleSortChange}){
    const isMobile = useMediaQuery('(max-width:600px)');

    return(
        <Card sx={{p: 0, mt: 2, gap: 0}}>
            <CardOverflow
                color="primary"
                sx={{
                    p: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap" useFlexGap>
                    <Button
                        size="sm"
                        variant="soft"
                        startDecorator={<UploadFileIcon />}
                        onClick={() => handleSortChange(["updatedAt,desc"])}
                    >
                        최신
                    </Button>
                    <Button
                        size="sm"
                        variant="soft"
                        startDecorator={<FavoriteIcon />}
                        onClick={() => handleSortChange(['updatedAt,desc','likeCount,desc'])}
                    >
                        좋아요
                    </Button>
                    <Button
                        size="sm"
                        variant="soft"
                        startDecorator={<ChatBubbleIcon />}
                        onClick={() => handleSortChange(['updatedAt,desc','commentCount,desc'])}
                    >
                        댓글많은
                    </Button>
                </Stack>

            </CardOverflow>
            <CardContent>
                <Stack sx={{ borderRadius: 3 }} divider={<Divider />}>
                    {urlInfos.content.map((urlInfo, index) => (
                        <UrlCard key={index} urlInfo={urlInfo} isListItem={true} />
                    ))}
                </Stack>

            </CardContent>
            <CardOverflow
                color="primary"
                sx={{
                    p: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Pagination sx={{mx: 'auto'}} count={isMobile ? 5 : 10} page={page} onChange={handlePageChange}/>
            </CardOverflow>
        </Card>
    )
}