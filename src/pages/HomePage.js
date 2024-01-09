import * as React from "react";
import MenuConsole from "../components/url/MenuConsole";
import UrlListCard from "../components/url/UrlListCard";
import Stack from "@mui/joy/Stack";
import {useEffect, useState} from "react";
import axios from "axios";
import LoadingUrlCardList from "../components/loading/LoadingUrlCardList";
import qs from "qs";
import {handleScrollToTop} from "../utils/navigationUtils";
import Typography from "@mui/joy/Typography";
import NotExistUrlCardList from "../components/loading/NotExistUrlCardList";

const HomePage = () => {
    const [urlInfos, setUrlInfos] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [currentFilter, setCurrentFilter] = useState([]);
    const [currentSort, setCurrentSort] = useState(['updatedAt,desc']);
    const [isUrlInfosLoading, setIsUrlInfosLoading] = useState(true);

    useEffect(() => {
        fetchUrlInfos();
        handleScrollToTop();
    }, [currentSort, page, currentFilter]);


    const fetchUrlInfos = () => {
        axios.get('http://localhost:8080/api/url', {
            params: {
                filterStrings: searchKeyword ? [searchKeyword] : currentFilter,
                sort: currentSort,
                page: page - 1,
                size: size
            },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
        })
            .then(response => {
                setUrlInfos(response.data);
                setIsUrlInfosLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data', error);
               // setIsUrlInfosLoading(true);
            });
    };


    const handleSortChange = (sort) => {
        setCurrentSort(sort);
        setPage(1); // 첫 페이지로 이동
    };

    // 검색 핸들러
    // const handleSearch = (keyword) => {
    //     setSearchKeyword(keyword);
    //     fetchUrlInfos();
    // };

    // 페이지 변경 핸들러
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    // 필터 및 정렬 변경 핸들러
    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
        setCurrentSort(['updatedAt,desc']);
        setPage(1); // 첫 페이지로 이동
    };


    return(
            <Stack spacing={2}>
                <MenuConsole handleFilterChange={handleFilterChange} currentFilter={currentFilter}/>
                {isUrlInfosLoading ? (
                    <LoadingUrlCardList/>
                ) : urlInfos.content.length === 0 ? (
                    <NotExistUrlCardList/>
                ) : (
                    <UrlListCard urlInfos={urlInfos} page={page} currentSort={currentSort} handlePageChange={handlePageChange} handleSortChange={handleSortChange}/>
                )}

            </Stack>
    )
}

export default HomePage;