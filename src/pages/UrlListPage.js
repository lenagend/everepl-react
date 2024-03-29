import * as React from "react";
import MenuConsole from "../components/menu/MenuConsole";
import UrlListCard from "../components/url/UrlListCard";
import Stack from "@mui/joy/Stack";
import {useEffect} from "react";
import LoadingUrlCardList from "../components/loading/LoadingUrlCardList";
import {handleScrollToTop} from "../utils/navigationUtils";
import NotExistUrlCardList from "../components/loading/NotExistUrlCardList";

const UrlListPage = ({ page, currentFilter, currentSort, onSortChange, onPageChange, onFilterChange, fetchUrlInfos, urlInfos, isUrlInfosLoading }) => {

    useEffect(() => {
        fetchUrlInfos();
    }, [page, currentFilter, currentSort]);

    useEffect(() => {
        handleScrollToTop();
    }, [urlInfos]);

    return(
            <Stack spacing={2}>
                <MenuConsole handleFilterChange={onFilterChange} currentFilter={currentFilter}/>
                {isUrlInfosLoading ? (
                    <LoadingUrlCardList/>
                ) : urlInfos.content.length === 0 ? (
                    <NotExistUrlCardList/>
                ) : (
                    <UrlListCard urlInfos={urlInfos} page={page} currentSort={currentSort} handlePageChange={onPageChange} handleSortChange={onSortChange} isBookmarkPage={false}/>
                )}


            </Stack>
    )
}

export default UrlListPage;