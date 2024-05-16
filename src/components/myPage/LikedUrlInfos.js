import MyMenuConsole from "../menu/MyMenuConsole";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import LoadingUrlCardList from "../loading/LoadingUrlCardList";
import NotExistUrlCardList from "../loading/NotExistUrlCardList";
import UrlListCard from "../url/UrlListCard";
import {useEffect, useState} from "react";
import {useAuth} from "../../security/AuthProvider";
import {useLocation} from "react-router-dom";

export default function LikedUrlInfos() {
    const location = useLocation();
    const [isUrlInfosLoading, setIsUrlInfosLoading] = useState(true);
    const [urlInfos, setUrlInfos] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const { axiosInstance } = useAuth();

    // 페이지 변경 핸들러
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        fetchUrlInfos();
    }, [page])

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const pageParam = parseInt(queryParams.get('page'), 10);
        if (pageParam) setPage(pageParam);

    }, [location]);

    const fetchUrlInfos = async () => {

        axiosInstance.get('/like', {
            params: {
                page: page - 1,
                size: size,
                type : 'URLINFO',
            },
        })
            .then(response => {
                setUrlInfos(response.data);
                setIsUrlInfosLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data', error);
                setIsUrlInfosLoading(true);
            });
    };

    return(
        <Stack spacing={2}>
            <MyMenuConsole currentPath={location.pathname} />
            {isUrlInfosLoading ? (
                <LoadingUrlCardList/>
            ) : urlInfos.content.length === 0 ? (
                <NotExistUrlCardList/>
            ) : (
                <UrlListCard urlInfos={urlInfos} page={page} onPageChange={handlePageChange} isMyPage={true}/>
            )}
        </Stack>
    );
}