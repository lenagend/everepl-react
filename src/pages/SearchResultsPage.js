import * as React from "react";
import Stack from "@mui/joy/Stack";
import SearchedUrlInfos from "../components/search/SearchedUrlInfos";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../security/AuthProvider";
import LoadingUrlCardList from "../components/loading/LoadingUrlCardList";


export default function SearchResultsPage() {
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const { axiosInstance } = useAuth();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const title = queryParams.get('title');
        const pageParam = parseInt(queryParams.get('page'), 10);
        if (pageParam) setPage(pageParam);

        if (title) {
            axiosInstance.get(`/url/search`, {
                params: {
                    title: title,
                    page: page - 1,
                    size: size
                }
            })
            .then(response => {
                setResults(response.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
        }
    }, [location.search, page]);

    if (loading) {
        return  <LoadingUrlCardList/>;
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Stack spacing={2}>
            <SearchedUrlInfos results={results} page={page} onPageChange={handlePageChange}/>
        </Stack>
    );
}