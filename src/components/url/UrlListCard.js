import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import UrlCard from "./UrlCard";
import CardOverflow from "@mui/joy/CardOverflow";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import {Badge, Divider} from "@mui/joy";
import Button from "@mui/joy/Button";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {Pagination, useMediaQuery} from "@mui/material";

export default function UrlListCard({urlInfos, page, currentSortKey, onPageChange, onSortChange, isMyPage}){
    const isMobile = useMediaQuery('(max-width:600px)');

    const renderButton = (label, sortKey, icon) => (
        <Badge color="danger" invisible={currentSortKey !== sortKey}>
            <Button
                size="sm"
                variant="soft"
                startDecorator={icon}
                onClick={() => onSortChange(sortKey)}
            >
                {label}
            </Button>
        </Badge>
    );

    return(
        <Card sx={{p: 0, mt: 2, gap: 0}}>
            {!isMyPage && (
                <CardOverflow
                    color="primary"
                    sx={{
                        p: 1,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap" useFlexGap>
                        {renderButton('인기', 'popularity', <AutoAwesomeIcon />)}
                        {renderButton('최신', 'latest', <UploadFileIcon />)}
                    </Stack>
                </CardOverflow>
            )}
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
                    onChange={onPageChange} // 페이지 변경 핸들러
                    size={isMobile ? "small" : "large"}
                />
            </CardOverflow>
        </Card>
    )
}