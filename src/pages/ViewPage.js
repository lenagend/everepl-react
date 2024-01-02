import * as React from "react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import UrlCard from "../components/url/UrlCard";
import Stack from "@mui/joy/Stack";
import CommentList from "../components/comments/CommentList";
import UrlListCard from "../components/url/UrlListCard";

const ViewPage = () => {
    let {id} = useParams();

    useEffect(() => {
        console.log(id);
    }, [id]);

    return(
        <Stack spacing={2}>
            <UrlCard isListItem={false}/>
            <CommentList/>
            <UrlListCard/>
        </Stack>
    )
}

export default ViewPage;