import * as React from "react";
import Stack from "@mui/joy/Stack";
import MyMenuConsole from "../components/menu/MyMenuConsole";
import {useEffect, useState} from "react";

const MyPage = () => {
    //게시물목록의 페이징(뷰 페이지에서도 사용하기 위해 루트컴포넌트로 올림)
    const [targetType, setTargetType] = useState('URLINFO');
    const handleTargetType = (targetType) => {
        setTargetType(targetType);
    }
    //
    // useEffect(() => {
    //     const fetchBookmarks = async () => {
    //         setIsDataLoading(true);
    //         try {
    //             // localStorage에서 bookmarks를 가져옵니다.
    //             const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    //             const targetIds = bookmarks.map(bookmark => bookmark.targetId);
    //
    //             const response = await axios.post('http://localhost:8080/api/bookmarks/process', {
    //                 targetType,
    //                 targetIds
    //             }, {
    //                 params: { page: page - 1, size }
    //             });
    //
    //             setDatas(response.data);
    //         } catch (error) {
    //             console.error('Error fetching bookmarks:', error);
    //         } finally {
    //             setIsDataLoading(false);
    //         }
    //     };
    //
    //     fetchBookmarks();
    // }, [page, targetType]);

    // const renderContent = () => {
    //     if (!datas || !datas.content || datas.content.length === 0) {
    //         return <NotExistBookmarkUrlCardList />;
    //     } else if (targetType === 'URLINFO') {
    //         return <UrlListCard urlInfos={datas} page={page} isBookmarkPage={true}/>;
    //     } else if (targetType === 'COMMENT') {
    //         return <LikedCommentList comments={datas} page={page} />;
    //     }
    // };

    return(
        <Stack spacing={2}>
            <MyMenuConsole currentPath={"/my"} />
        </Stack>
    )
}

export default MyPage;