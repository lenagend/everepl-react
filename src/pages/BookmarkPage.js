import * as React from "react";
import Stack from "@mui/joy/Stack";
import BookmarkMenuConsole from "../components/menu/BookmarkMenuConsole";
import {useEffect, useState} from "react";
import axios from "axios";
import UrlListPage from "./UrlListPage";
import {Route, useNavigate} from "react-router-dom";
import LoadingUrlCardList from "../components/loading/LoadingUrlCardList";
import NotExistUrlCardList from "../components/loading/NotExistUrlCardList";
import UrlListCard from "../components/url/UrlListCard";

const BookmarkPage = () => {
    //게시물목록의 페이징(뷰 페이지에서도 사용하기 위해 루트컴포넌트로 올림)
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [datas, setDatas] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [targetType, setTargetType] = useState('URLINFO');
    const navigate = useNavigate();

    // 페이지 변경 핸들러
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        navigate("/");
    };

    useEffect(() => {
        const fetchBookmarks = async () => {
            setIsDataLoading(true);
            try {
                // localStorage에서 bookmarks를 가져옵니다.
                const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
                const targetIds = bookmarks.map(bookmark => bookmark.targetId);
                console.log(bookmarks);
                console.log(targetIds);

                const response = await axios.post('http://localhost:8080/api/bookmarks/process', {
                    targetType,
                    targetIds
                }, {
                    params: { page: page - 1, size }
                });

                setDatas(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            } finally {
                setIsDataLoading(false);
            }
        };

        fetchBookmarks();
    }, [page, size, targetType]);

    return(
            <Stack spacing={2}>
               <BookmarkMenuConsole
                currentTargetType={targetType}
                setTargetType={setTargetType}
               />
                {isDataLoading ? (
                    <LoadingUrlCardList/>
                ) : datas.length === 0 ? (
                    <NotExistUrlCardList/>
                ) : (
                    <UrlListCard urlInfos={datas} page={page} isBookmarkPage={true}/>
                )}
            </Stack>
    )
}

export default BookmarkPage;