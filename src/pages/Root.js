import {Box, Container} from "@mui/joy";
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

export default function Root(){
    //주소창에 url을 붙여 들어왔을때나, 검색바에 url을 검색했을때.
    const [url, setUrl] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

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

    const handleSearch = (url) => {
        axios.post('http://localhost:8080/api/url', { url: url })
            .then(response => {
                if (response.status === 200) {
                    navigate(`/view/${response.data.id}`);
                }
            })
            .catch(error => {
                console.error("Error: ", error.response ? error.response.data : error.message);
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
            <Appbar url={url} setUrl={setUrl} onSearch={handleSearch} />
            <Container maxWidth="md">
                <Stack spacing={2}>
                <UserCard/>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/view/:id" element={<ViewPage />} />
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