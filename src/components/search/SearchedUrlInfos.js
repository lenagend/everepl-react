import Stack from "@mui/joy/Stack";
import * as React from "react";
import UrlListCard from "../url/UrlListCard";
import NotExistUrlCardList from "../loading/NotExistUrlCardList";

export default function SearchedUrlInfos({ results, page, onPageChange }) {
    if (!results || results.content.length === 0) {
        return <NotExistUrlCardList/>
    }

    return(
        <Stack spacing={2}>
                <UrlListCard urlInfos={results} page={page} onPageChange={onPageChange} hasSortingOptions={true}/>
        </Stack>
    );
}