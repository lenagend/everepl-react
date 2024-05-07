import MyMenuConsole from "../menu/MyMenuConsole";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import LoadingUrlCardList from "../loading/LoadingUrlCardList";
import {useEffect, useState} from "react";
import {useAuth} from "../../security/AuthProvider";
import {useLocation} from "react-router-dom";
import NotExistCommentList from "../loading/NotExistCommentList";
import LikedCommentList from "../comments/LikedCommentList";

export default function LikedComments() {
    const location = useLocation();
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const { axiosInstance } = useAuth();

    // 페이지 변경 핸들러
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        fetchComments();
    }, [page])

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const pageParam = parseInt(queryParams.get('page'), 10);
        if (pageParam) setPage(pageParam);

    }, [location]);

    const fetchComments = async () => {

        axiosInstance.get('http://localhost:8080/api/comment/my', {
            params: {
                page: page - 1,
                size: size
            },
        })
            .then(response => {
                setComments(response.data);
                setIsCommentsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data', error);
                setIsCommentsLoading(true);
            });
    };

    return(
        <Stack spacing={2}>
            <MyMenuConsole currentPath={location.pathname} />
            {isCommentsLoading ? (
                <LoadingUrlCardList/>
            ) : comments.content.length === 0 ? (
                <NotExistCommentList/>
            ) : (
                <LikedCommentList comments={comments} page={page} context={"liked"}/>
            )}
        </Stack>
    );
}