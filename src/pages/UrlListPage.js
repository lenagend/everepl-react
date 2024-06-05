import * as React from "react";
import MenuConsole from "../components/menu/MenuConsole";
import UrlListCard from "../components/url/UrlListCard";
import Stack from "@mui/joy/Stack";
import {useEffect} from "react";
import LoadingUrlCardList from "../components/loading/LoadingUrlCardList";
import {handleScrollToTop} from "../utils/navigationUtils";
import NotExistUrlCardList from "../components/loading/NotExistUrlCardList";
import AnnouncementList from "../components/Announcement/AnnouncementList";

const UrlListPage = ({ page, currentFilterKey, currentSortKey, onSortChange, onPageChange, onFilterChange, fetchUrlInfos, urlInfos, isUrlInfosLoading }) => {

    useEffect(() => {
        fetchUrlInfos();
    }, [page, currentFilterKey, currentSortKey]);

    useEffect(() => {
        handleScrollToTop();
    }, [urlInfos]);

    return(
            <Stack spacing={2}>
                <MenuConsole handleFilterChange={onFilterChange} currentFilterKey={currentFilterKey}/>
                <AnnouncementList/>
                {isUrlInfosLoading ? (
                    <LoadingUrlCardList/>
                ) : urlInfos.content.length === 0 ? (
                    <NotExistUrlCardList/>
                ) : (
                    <UrlListCard urlInfos={urlInfos} page={page} currentSortKey={currentSortKey} onPageChange={onPageChange} onSortChange={onSortChange} hasSortingOptions={false}/>
                )}


            </Stack>
    )
}

export default UrlListPage;