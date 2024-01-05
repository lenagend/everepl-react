import * as React from "react";
import MenuConsole from "../components/url/MenuConsole";
import UrlListCard from "../components/url/UrlListCard";
import Stack from "@mui/joy/Stack";
import {useState} from "react";
import axios from "axios";
import LoadingUrlCardList from "../components/loading/LoadingUrlCardList";

const HomePage = () => {
    const [urlInfos, setUrlInfos] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [currentFilter, setCurrentFilter] = useState([]);
    const [currentSort, setCurrentSort] = useState('updatedAt,desc');
    const [isUrlInfosLoading, setIsUrlInfosLoading] = useState(true);


    const fetchUrlInfos = () => {
        axios.get('http://localhost:8080/api/url', {
            params: {
                filterStrings: searchKeyword ? [searchKeyword] : currentFilter,
                sort: currentSort,
                page: page - 1,
                size: size
            }
        })
            .then(response => {
                setUrlInfos(response.data);
                console.log(response.data)
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
    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
        setCurrentSort('updatedAt,desc');
        setPage(1); // 첫 페이지로 이동
        fetchUrlInfos();
    };

    const handleSortChange = (sort) => {
        setCurrentSort(sort);
        setPage(1); // 첫 페이지로 이동
        fetchUrlInfos();
    };

    return(
            <Stack spacing={2}>
                <MenuConsole onFetchUrlInfos={handleFilterChange} />
                {isUrlInfosLoading ? (
                    <LoadingUrlCardList/>
                ) : (
                    <UrlListCard urlInfos={urlInfos} page={page} handlePageChange={handlePageChange} handleSortChange={handleSortChange}/>
                )}
            </Stack>
    )
}

export default HomePage;