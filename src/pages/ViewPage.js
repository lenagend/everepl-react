import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UrlCard from "../components/url/UrlCard";
import Stack from "@mui/joy/Stack";
import CommentList from "../components/comments/CommentList";
import UrlListCard from "../components/url/UrlListCard";
import axios from "axios";
import LoadingUrlCard from "../components/loading/LoadingUrlCard";

const ViewPage = () => {
    let {id} = useParams();
    const [urlInfo, setUrlInfo] = useState(null);
    const [isUrlCardLoading, setIsUrlCardLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/url/${id}`);
                setUrlInfo(response.data);
                setIsUrlCardLoading(false);
            } catch (error) {
                console.error('Error fetching url info', error);
            }
        })();
    }, [id]);

    return(
        <Stack spacing={2}>
            {isUrlCardLoading ? (
                <LoadingUrlCard/>
            ) : (
                <UrlCard isListItem={false} urlInfo={urlInfo}/>
            )}
            <CommentList/>
            <UrlListCard/>
        </Stack>
    )
}

export default ViewPage;