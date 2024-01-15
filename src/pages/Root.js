import {
    Box,
    CircularProgress,
    Container,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Modal,
    ModalDialog
} from "@mui/joy";
import Appbar from "../components/menu/Appbar";
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import * as React from "react";
import {useEffect, useState} from "react";
import ViewPage from "./ViewPage";
import HomePage from "./HomePage";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import WildcardPage from "./WildcardPage";
import UserCard from "../components/user/UserCard";
import Stack from "@mui/joy/Stack";
import LoadingProgressModal from "../components/loading/LoadingProgressModal";
import qs from "qs";

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
    }, [location]);

    useEffect(() => {
        if (url) {
            handleSearch(url);
        }
    }, [url]);

    const handleSortChange = (sort) => {
        setCurrentSort(sort);
        setPage(1); // 첫 페이지로 이동
        navigate("/");
    };

    // 페이지 변경 핸들러
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        navigate("/");
    };

    // 필터 및 정렬 변경 핸들러
    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
        setCurrentSort(['updatedAt,desc']);
        setPage(1); // 첫 페이지로 이동
        navigate("/");
    };

    //게시물목록의 페이징(뷰 페이지에서도 사용하기 위해 루트컴포넌트로 올림)
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [currentFilter, setCurrentFilter] = useState([]);
    const [currentSort, setCurrentSort] = useState(['updatedAt,desc']);
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
                // setIsUrlInfosLoading(true);
            });
    };

    return(
        <Box sx={{
            pt: {
                xs: 7,
                sm: 11
            },
            pb: {
                xs: 7
            }
        }}>
            <LoadingProgressModal isLoading={isViewPageLoading}/>
            <Appbar url={url} setUrl={setUrl} onSearch={handleSearch} />
            <Container maxWidth="md">
                <Stack spacing={2}>
                <UserCard/>
                <Routes>
                    <Route path="/" element={<HomePage
                        page={page}
                        currentFilter={currentFilter}
                        currentSort={currentSort}
                        onSortChange={handleSortChange}
                        onPageChange={handlePageChange}
                        onFilterChange={handleFilterChange}
                        fetchUrlInfos={fetchUrlInfos}
                        urlInfos={urlInfos}
                        isUrlInfosLoading={isUrlInfosLoading}
                    />} />
                    <Route path="/view/:id" element={<ViewPage
                        page={page}
                        currentFilter={currentFilter}
                        currentSort={currentSort}
                        onSortChange={handleSortChange}
                        onPageChange={handlePageChange}
                        onFilterChange={handleFilterChange}
                        fetchUrlInfos={fetchUrlInfos}
                        urlInfos={urlInfos}
                        isUrlInfosLoading={isUrlInfosLoading}
                    />} />
                    {/*<Route path="/login" element={<LoginPage />} />*/}
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