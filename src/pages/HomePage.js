import * as React from "react";
import UrlConsole from "../components/url/UrlConsole";
import UrlListCard from "../components/url/UrlListCard";
import Stack from "@mui/joy/Stack";
import {useState} from "react";
import axios from "axios";
import {Pagination, useMediaQuery} from "@mui/material";
import UrlPagination from "../components/url/UrlPagination";

const HomePage = () => {
    const [urlInfos, setUrlInfos] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [currentFilter, setCurrentFilter] = useState([]);
    const [currentSort, setCurrentSort] = useState('');

    const fetchUrlInfos = () => {
        axios.get('/api/url', {
            params: {
                filterStrings: searchKeyword ? [searchKeyword] : currentFilter,
                sort: currentSort,
                page: page - 1,
                size: size
            }
        })
            .then(response => {
                setUrlInfos(response.data);
            })
            .catch(error => {
                console.error('Error fetching data', error);
                // 오류 처리
            });
    };

    // 검색 핸들러
    // const handleSearch = (keyword) => {
    //     setSearchKeyword(keyword);
    //     fetchUrlInfos();
    // };

    // 페이지 변경 핸들러
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        fetchUrlInfos();
    };

    // 필터 및 정렬 변경 핸들러
    const handleFilterSortChange = (filter, sort) => {
        setCurrentFilter(filter);
        setCurrentSort(sort);
        setPage(1); // 첫 페이지로 이동
        fetchUrlInfos();
    };

    return(
            <Stack spacing={2}>
                <UrlConsole onFetchUrlInfos={handleFilterSortChange} />
                <UrlListCard urlInfos={urlInfos} />
                <UrlPagination page={page} handlePageChange={handlePageChange}/>
            </Stack>
    )
}

export default HomePage;