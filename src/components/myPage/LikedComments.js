import MyMenuConsole from "../menu/MyMenuConsole";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import LoadingUrlCardList from "../loading/LoadingUrlCardList";
import {useLocation} from "react-router-dom";
import NotExistCommentList from "../loading/NotExistCommentList";
import LikedOrMyCommentsList from "../comments/LikedOrMyCommentsList";
import useComments from "../../hooks/useComments";
import {Pagination} from "@mui/material";

export default function LikedComments() {
    const location = useLocation();
    const {
        isCommentsLoading,
        comments,
        page,
        totalPages,
        handlePageChange
    } = useComments('/like', { type: 'COMMENT' });

    return (
        <Stack spacing={2}>
            <MyMenuConsole currentPath={location.pathname} />
            {isCommentsLoading ? (
                <LoadingUrlCardList />
            ) : comments.length === 0 ? (
                <NotExistCommentList />
            ) : (
                <>
                    <LikedOrMyCommentsList comments={comments} page={page} />
                    <Stack alignItems={'center'}>
                        <Pagination
                            size={'sm'}
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Stack>
                </>
            )}
        </Stack>
    );
}