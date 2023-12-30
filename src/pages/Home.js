import {Box, Container} from "@mui/joy";
import Appbar from "../components/menu/Appbar";
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import TextAreaBottomNavigation from "../components/menu/TextAreaBottomNavigation";
import FloatingButtonBottomNavigation from "../components/menu/FloatingButtonBottomNavigation";
import * as React from "react";
import {useEffect, useState} from "react";
import ViewPage from "./ViewPage";
import HomePage from "./HomePage";
import axios from "axios";

export default function Home(){
    const [url, setUrl] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const urlParam = queryParams.get('url');
        if (urlParam) setUrl(urlParam);
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
                    // 성공적으로 데이터를 받아왔을 때의 처리
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.error("Error: ", error.response ? error.response.data : error.message);
            });
    };


    return(
        <Box sx={{pt: {
                xs: 7,
                sm: 11
            },
            pb: {
                xs:7
            }}}>
            <Appbar url={url} onSearch={handleSearch} />
            <Container maxWidth="md">
                {/* 서브 라우팅 처리 */}
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/view/:id" element={<ViewPage />} />
                </Routes>
            </Container>
            <TextAreaBottomNavigation/>
            <FloatingButtonBottomNavigation/>
        </Box>
    );
}