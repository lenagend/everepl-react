import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../security/AuthProvider";

const useComments = (endpoint, additionalParams = {}) => {
    const location = useLocation();
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const { axiosInstance } = useAuth();

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        fetchComments();
    }, [page]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageParam = parseInt(queryParams.get('page'), 10);
        if (pageParam) setPage(pageParam);
    }, [location]);

    const fetchComments = async () => {
        setIsCommentsLoading(true);
        axiosInstance.get(endpoint, {
            params: {
                page: page - 1,
                size: size,
                ...additionalParams
            },
        })
            .then(response => {
                setComments(response.data.content || response.data);
                setTotalPages(response.data.totalPages);
                setIsCommentsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data', error);
                setIsCommentsLoading(false);
            });
    };

    return {
        isCommentsLoading,
        comments,
        page,
        totalPages,
        handlePageChange
    };
};

export default useComments;