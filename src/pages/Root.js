import { Box, Container } from "@mui/joy";
import Appbar from "../components/menu/Appbar";
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import * as React from "react";
import {useEffect, useState} from "react";
import ViewPage from "./ViewPage";
import UrlListPage from "./UrlListPage";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import WildcardPage from "./WildcardPage";
import Stack from "@mui/joy/Stack";
import LoadingProgressModal from "../components/loading/LoadingProgressModal";
import qs from "qs";
import PolicyPage from "./PolicyPage";
import BookmarkPage from "./MyPage";
import LoginPage from "./LoginPage";
import MyPage from "./MyPage";

export default function Root(){
    //주소창에 url을 붙여 들어왔을때나, 검색바에 url을 검색했을때.
    const [url, setUrl] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [isViewPageLoading, setIsViewPageLoading] = useState(false);

    const handleSearch = (url) => {
        setIsViewPageLoading(true);
        axios.post('http://localhost:8080/api/url', { url: url })
            .then(response => {
                if (response.status === 200) {
                    navigate(`/view/${response.data.id}`);
                }
            })
            .catch(error => {
                console.error("Error: ", error.response ? error.response.data : error.message);
            })
            .finally(()=>{
                setIsViewPageLoading(false);
            });
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const urlParam = queryParams.get('url');
        if (urlParam) setUrl(decodeURIComponent(urlParam));

        const pageParam = parseInt(queryParams.get('page'), 10);
        if (pageParam) setPage(pageParam);

        // 'filter' 쿼리 파라미터 처리
        const filterParam = queryParams.get('filter');
        if (filterParam) {
            // 필터 식별자를 실제 필터 값 배열로 변환하고 상태 업데이트
            // 예: filterMappings 객체를 사용하여 식별자를 필터 값 배열로 매핑
            const filterValues = filterMappings[filterParam] || [];
            setCurrentFilter(filterValues);
            setCurrentFilterKey(filterParam); // 필터 식별자를 상태로 저장하는 경우
        }

        // 'sort' 쿼리 파라미터 처리
        const sortParam = queryParams.get('sort');
        if (sortParam) {
            // 정렬 식별자를 실제 정렬 값 배열로 변환하고 상태 업데이트
            // 예: sortOptions 객체를 사용하여 식별자를 정렬 값 배열로 매핑
            const sortValues = sortOptions[sortParam] || [];
            setCurrentSort(sortValues);
            setCurrentSortKey(sortParam); // 정렬 식별자를 상태로 저장하는 경우
        }
    }, [location]);

    useEffect(() => {
        if (url) {
            handleSearch(url);
        }
    }, [url]);

    // 정렬 식별자와 실제 정렬 값의 매핑
    const sortOptions = {
        popularity: ['updatedDate,desc', 'popularityScore,desc'],
        latest: ['updatedAt,desc']
    };

    const [currentSortKey, setCurrentSortKey] = useState('popularity');


    // 정렬 변경 핸들러
    const handleSortChange = (sortKey) => {
        setCurrentSortKey(sortKey);
        const sortValue = sortOptions[sortKey];
        setCurrentSort(sortValue);
        setPage(1); // 첫 페이지로 이동
        // 필터 상태를 유지하면서 정렬 상태를 URL에 반영
        navigate(`/?filter=${currentFilterKey}&sort=${sortKey}`);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (event, newPage) => {
        setPage(newPage);

        // 현재 필터 배열을 기반으로 filterMappings에서 해당하는 키 찾기
        let filterKey = Object.keys(filterMappings).find(key =>
            filterMappings[key].join(',') === currentFilter.join(',')
        );

        // 만약 현재 필터 배열에 해당하는 키를 찾지 못했다면, 'all'로 기본 설정
        filterKey = filterKey || 'all';

        // 페이지 변경 시 URL 업데이트, filterMappings의 키값 사용
        navigate(`/?filter=${filterKey}&page=${newPage}`);
    };




    const filterMappings = {
        'all': [],
        'youtube': ['youtube'],
        'news': ['news', 'entertain', 'article'],
        'instagram': ['instagram.com'],
        'community': ['dcinside.com', 'mania.kr', 'fmkorea.com', 'ppomppu.co.kr', "instiz.net", "theqoo.net", "clien.net", "mlbpark.donga.com", "humoruniv.com", "bobaedream.co.kr", "etoland.co.kr", "ilbe.com", "82cook.com", "slrclub.com", "todayhumor.co.kr", "gasengi.com", "ruliweb.com", "inven.co.kr"]
    };

    const [currentFilterKey, setCurrentFilterKey] = useState('all');

    // 필터 변경 핸들러
    const handleFilterChange = (filterKey) => {
        setCurrentFilterKey(filterKey);

        navigate(`/?filter=${filterKey}`);

        // 서버에 전달할 실제 필터 값 설정
        const actualFilters = filterMappings[filterKey];
        setCurrentFilter(actualFilters);
        setCurrentSort(['updatedAt,desc']);
        setPage(1); // 첫 페이지로 이동
    };

    //게시물목록의 페이징(뷰 페이지에서도 사용하기 위해 루트컴포넌트로 올림)
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [currentFilter, setCurrentFilter] = useState([]);
    const [currentSort, setCurrentSort] = useState(['updatedDate,desc', 'popularityScore,desc']);
    const [urlInfos, setUrlInfos] = useState([]);
    const [isUrlInfosLoading, setIsUrlInfosLoading] = useState(true);

    const fetchUrlInfos = () => {
        axios.get('http://localhost:8080/api/url', {
            params: {
                filterStrings:  currentFilter,
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
                setIsUrlInfosLoading(true);
            });
    };

    return(
        <Box sx={{
            pt: 10,
            pb: {
                xs: 7
            },
            backgroundColor: '#F0F4F8',
            minHeight : '100vh'
        }}>
            <LoadingProgressModal isLoading={isViewPageLoading}/>
            <Appbar url={url} setUrl={setUrl} onSearch={handleSearch} />
            <Container maxWidth="md" sx={{p: {
                     xs: 0.5,
                    sm: 1
                }
            }}>
                <Stack spacing={2}>
                <Routes>
                    <Route path="/" element={<UrlListPage
                        page={page}
                        currentFilterKey={currentFilterKey}
                        currentSortKey={currentSortKey}
                        onSortChange={handleSortChange}
                        onPageChange={handlePageChange}
                        onFilterChange={handleFilterChange}
                        fetchUrlInfos={fetchUrlInfos}
                        urlInfos={urlInfos}
                        isUrlInfosLoading={isUrlInfosLoading}
                    />} />
                    <Route path="/view/:id" element={<ViewPage
                        page={page}
                        currentFilterKey={currentFilterKey}
                        currentSortKey={currentSortKey}
                        onSortChange={handleSortChange}
                        onPageChange={handlePageChange}
                        onFilterChange={handleFilterChange}
                        fetchUrlInfos={fetchUrlInfos}
                        urlInfos={urlInfos}
                        isUrlInfosLoading={isUrlInfosLoading}
                    />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/policy" element={<PolicyPage />} />
                    <Route path="/my" element={<MyPage />} />
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<WildcardPage />} />
                </Routes>
                </Stack>
            </Container>
            {/*<TextAreaBottomNavigation/>*/}
            {/*<FloatingButtonBottomNavigation/>*/}
        </Box>
    );
}