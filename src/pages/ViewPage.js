import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UrlCard from "../components/url/UrlCard";
import Stack from "@mui/joy/Stack";
import CommentList from "../components/comments/CommentList";
import UrlListCard from "../components/url/UrlListCard";
import axios from "axios";
import LoadingUrlCard from "../components/loading/LoadingUrlCard";
import qs from "qs";
import HomePage from "./HomePage";
import {handleScrollToTop} from "../utils/navigationUtils";

const ViewPage = ({ page, currentFilter, currentSort, onSortChange, onPageChange, onFilterChange, fetchUrlInfos, urlInfos, isUrlInfosLoading }) => {
    let {id} = useParams();
    const [urlInfo, setUrlInfo] = useState(null);
    const [isUrlCardLoading, setIsUrlCardLoading] = useState(true);

    useEffect(() => {
        handleScrollToTop();

        (async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/url/${id}`);
                setUrlInfo(response.data);
                setIsUrlCardLoading(false);
            } catch (error) {
                console.error('Error fetching url info', error);
            }
        })();
    }, [id]);

    return(
        <Stack spacing={2}>
            {isUrlCardLoading ? (
                <LoadingUrlCard isListItem={false}/>
            ) : (
                <UrlCard isListItem={false} urlInfo={urlInfo}/>
            )}
            <CommentList/>
            <HomePage
                page={page}
                currentFilter={currentFilter}
                currentSort={currentSort}
                onSortChange={onSortChange}
                onPageChange={onPageChange}
                onFilterChange={onFilterChange}
                fetchUrlInfos={fetchUrlInfos}
                urlInfos={urlInfos}
                isUrlInfosLoading={isUrlInfosLoading}
            />
        </Stack>
    )
}

export default ViewPage;