import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import UrlCard from "./UrlCard";
import CardOverflow from "@mui/joy/CardOverflow";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import {Badge, Divider} from "@mui/joy";
import Button from "@mui/joy/Button";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {Pagination, useMediaQuery} from "@mui/material";

export default function UrlListCard({urlInfos, page, currentSort, handlePageChange, handleSortChange}){
    const isMobile = useMediaQuery('(max-width:600px)');

    const renderButton = (label, sort, icon) => (
        <Badge color="danger" invisible={currentSort.join(',') !== sort.join(',')}>
            <Button
                size="sm"
                variant="soft"
                startDecorator={icon}
                onClick={() => handleSortChange(sort)}
            >
                {label}
            </Button>
        </Badge>
    );

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
                    {renderButton('최신', ['updatedAt,desc'], <UploadFileIcon />)}
                    {renderButton('좋아요', ['updatedDate,desc', 'likeCount,desc'], <FavoriteIcon />)}
                    {renderButton('댓글많은', ['updatedDate,desc', 'commentCount,desc'], <ChatBubbleIcon />)}
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
                <Pagination
                    sx={{ mx: 'auto' }}
                    count={urlInfos.totalPages} // 전체 페이지 수
                    page={page} // 현재 페이지
                    onChange={handlePageChange} // 페이지 변경 핸들러
                    size={isMobile ? "small" : "large"}
                />
            </CardOverflow>
        </Card>
    )
}