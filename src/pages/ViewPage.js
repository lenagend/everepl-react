import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UrlCard from "../components/url/UrlCard";
import Stack from "@mui/joy/Stack";
import CommentList from "../components/comments/CommentList";
import axios from "axios";
import LoadingUrlCard from "../components/loading/LoadingUrlCard";
import HomePage from "./HomePage";
import {handleScrollToTop} from "../utils/navigationUtils";
import CommentEditor from "../components/menu/CommentEditor";
import Card from "@mui/joy/Card";
import LoadingUrlCardList from "../components/loading/LoadingUrlCardList";
import NotExistCommentList from "../components/loading/NotExistCommentList";
import {CardContent, CardOverflow, IconButton, Snackbar, Typography} from "@mui/joy";
import {Pagination, useMediaQuery} from "@mui/material";
import HeartBrokenRoundedIcon from '@mui/icons-material/HeartBrokenRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ViewPage = ({ page, currentFilter, currentSort, onSortChange, onPageChange, onFilterChange, fetchUrlInfos, urlInfos, isUrlInfosLoading }) => {
    //urlInfo를 불러오는 로직
    let {id} = useParams();
    const [urlInfo, setUrlInfo] = useState(null);
    const [isUrlCardLoading, setIsUrlCardLoading] = useState(true);

    const fetchUrlInfo = (id) => {
        axios.get(`http://localhost:8080/api/url/${id}`)
            .then(response => {
                setUrlInfo(response.data);
                setIsUrlCardLoading(false);
            })
            .catch(error => {
                setErrorMessage({ fetchError: 'URL 정보를 불러오는데 실패했습니다.' });
            });
    };


    useEffect(() => {
        handleScrollToTop();

        fetchUrlInfo(id);

        fetchComments(id, 'URLINFO');
    }, [id]);

    //댓글과 관련된 로직
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [commentText, setCommentText] = useState('');
    const [targetId, setTargetId] = useState('');
    const [targetType, setTargetType] = useState('');
    const [targetNicknameAndIp, setTargetNicknameAndIp] = useState('');

    const handlePasswordChange = (password) => {
        // 입력된 값의 길이가 15글자 이하인 경우에만 상태를 업데이트합니다.
        if (password.length <= 15) {
            setPassword(password);
        }
    };

    const handleNicknameChange = (nickname) => {
        // 입력된 값의 길이가 15글자 이하인 경우에만 상태를 업데이트합니다.
        if (nickname.length <= 8) {
            setNickname(nickname);
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!nickname) tempErrors.nickname = '닉네임을 입력해주세요.';
        else if (nickname.length < 2 || nickname.length > 8) {
            tempErrors.nickname = '닉네임은 2글자 이상 입력해주세요.';
        }
        if (!password) tempErrors.password = '비밀번호를 입력해주세요.';
        else if (password.length < 4 || password.length > 15) {
            tempErrors.password = '비밀번호는 4글자 이상 입력해주세요.';
        }
        if (!commentText) tempErrors.text = '텍스트를 입력해주세요.';
        setErrorMessageOpen(true);
        setErrorMessage(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const [errorMessageOpen, setErrorMessageOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState({});

    const handleErrorMessageClose = () => {
        setErrorMessageOpen(false);
        setErrorMessage({});
    }


    const handleSubmit = async () => {
        // 먼저 유효성 검사를 실행합니다.
        const isValid = validate();

        // 유효성 검사를 통과하지 못했다면, 요청을 중단합니다.
        if (!isValid)  return;


        try {
            const response = await axios.post('http://localhost:8080/api/comment', {
                nickname: nickname,
                text: commentText,
                password: password,
                type: targetType || 'URLINFO',
                targetId: targetId || id
            });

            // 댓글 목록을 다시 불러옵니다.
            //fetchComments(currentParentId, currentParentType);

            // 요청 후 상태 초기화
            setCommentText('');

            fetchComments(id, 'URLINFO');
        } catch (error) {
            setErrorMessage({ fetchError: '댓글 저장에 실패했습니다.' });
        }
    };

    //댓글 목록을 위한 변수와 함수들.
    const [commentPage, setCommentPage] = useState(1);
    const [commentSize, setCommentSize] = useState(10);
    const [comments, setComments] = useState([]);
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);

    const fetchComments = (targetId, targetType) => {
        axios.get('http://localhost:8080/api/comment', {
            params: {
                page: commentPage - 1,
                size: commentSize,
                type: targetType,
                targetId: targetId
            },
        })
            .then(response => {
                // 댓글 목록만 계층적 구조로 변환
                const commentTree = buildCommentTree(response.data.content);

                // 페이지에 관한 데이터를 유지하면서, 댓글 목록만 업데이트
                setComments({
                    ...response.data, // 기존 페이지 데이터 유지
                    content: commentTree // 댓글 목록만 업데이트
                });
                setIsCommentsLoading(false);
                console.log(response.data);
            })
            .catch(error => {
                setErrorMessage({ fetchError: '댓글 정보를 불러오는데 실패했습니다.' });
                setIsCommentsLoading(true);
            });
    };

    const buildCommentTree = (comments) => {
        let commentMap = {};

        // 먼저 모든 댓글을 map에 등록
        comments.forEach(comment => {
            commentMap[comment.id] = {...comment, replies: []};
        });

        // 각 댓글에 대해 자식 댓글을 찾아 매핑
        comments.forEach(comment => {
            // 댓글의 path에서 마지막 ID를 제거하여 부모 댓글의 path를 찾음
            const pathParts = comment.path.split('/');
            if (pathParts.length > 2) { // 최소 게시물 ID와 댓글 ID가 포함되어 있어야 함
                pathParts.pop(); // 마지막 ID 제거
                const parentPath = pathParts.join('/');
                const parentId = Object.values(commentMap).find(c => c.path === parentPath).id;
                commentMap[parentId].replies.push(commentMap[comment.id]);
            }
        });

        // 최상위 댓글만 반환
        return Object.values(commentMap).filter(comment => comment.path.split('/').length === 2);
    };

    // 페이지 변경 핸들러
    const handleCommentPageChange = (event, newPage) => {
        setCommentPage(newPage);
    };


    const isMobile = useMediaQuery('(max-width:600px)');

    //댓글창 열었다 닫기
    const [commentEditorExpanded, setCommentEditorExpanded] = React.useState(false);

    const handleCommentExpandClick = () => {
        setCommentEditorExpanded(!commentEditorExpanded);
    };

    //대댓글 클릭
    const handleCommentButtonClick = (nicknameAndIp, targetId, targetType) => {
        setTargetNicknameAndIp(nicknameAndIp);
        setTargetId(targetId);
        setTargetType(targetType);
        setCommentEditorExpanded(true);
    }

    return(
        <Stack spacing={2}>
            {isUrlCardLoading ? (
                <LoadingUrlCard isListItem={false}/>
            ) : (
                <UrlCard isListItem={false} urlInfo={urlInfo}/>
            )}
            {isCommentsLoading ? (
                <LoadingUrlCardList/>
            ) : comments.content.length === 0 ? (
                <NotExistCommentList/>
            ) : (
                <Card sx={{ p: 1.5, gap: 2, pt: 0}}>
                    <CardOverflow
                        color="primary"
                        sx={{
                            pt: 2.5,
                            pb: 1,
                            px: 1.5,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Typography level="title-md" variant="soft"  color="success" >
                            {comments.totalElements}개의 댓글이 있습니다.
                        </Typography>
                    </CardOverflow>
                    <CommentList
                        comments={comments.content}
                        depth={0}
                        commentCount={comments.totalElements}
                        onCommentButtonClick={handleCommentButtonClick}
                    />
                    <CardOverflow
                        color="primary"
                        sx={{
                            p: 2,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Pagination
                            sx={{ mx: 'auto' }}
                            count={comments.totalPages} // 전체 페이지 수
                            page={commentPage} // 현재 페이지
                            onChange={handleCommentPageChange} // 페이지 변경 핸들러
                            size={isMobile ? "small" : "large"}
                        />
                    </CardOverflow>
                </Card>
            )}
            <Card>
                <CardContent sx={{textAlign: 'center'}}>
                    <Typography level="title-md" color="primary">
                        이 페이지가 마음에 드셨나요..?
                    </Typography>
                    <Stack direction="row" justifyContent="center"
                           alignItems="center"
                           spacing={2}>

                        <IconButton variant="plain">
                            <HeartBrokenRoundedIcon color="action" sx={{fontSize: 40}}/>
                        </IconButton>
                        <Typography level="title-lg">
                            {urlInfo? (
                                urlInfo.likeCount
                            ) : 0}
                        </Typography>
                        <IconButton variant="plain" >
                            <FavoriteRoundedIcon color="action" sx={{fontSize: 40}}/>
                        </IconButton>
                    </Stack>
                </CardContent>
            </Card>
            <HomePage
                page={page}
                currentFilter={currentFilter}
                currentSort={currentSort}
                onSortChange={onSortChange}
                onPageChange={onPageChange}
                onFilterChange={onFilterChange}
                fetchUrlInfos={fetchUrlInfos}
                urlInfos={urlInfos}
                isUrlInfosLoading={isUrlInfosLoading}
            />
            <CommentEditor
                nickname={nickname}
                onNicknameChange={handleNicknameChange}
                password={password}
                onPasswordChange={handlePasswordChange}
                commentText={commentText}
                onCommentChange={setCommentText}
                onSubmit={handleSubmit}
                targetNicknameAndIp={targetNicknameAndIp}
                commentEditorExpanded={commentEditorExpanded}
                handleCommentExpandClick={handleCommentExpandClick}
                handleCommentButtonClick={handleCommentButtonClick}
            />
            <Snackbar
                autoHideDuration={5000}
                open={errorMessageOpen}
                color="danger"
                size="lg"
                onClose={handleErrorMessageClose}
                startDecorator={<ErrorOutlineRoundedIcon/>}
                endDecorator={
                    <IconButton color="danger" onClick={handleErrorMessageClose}>
                        <CloseRoundedIcon/>
                    </IconButton>
                }
            >
                <Stack>
                {Object.keys(errorMessage).map((key) => (
                    <Typography color="danger" level="title-md" key={key}>{errorMessage[key]}</Typography>
                ))}
                </Stack>
            </Snackbar>
        </Stack>
    )
}

export default ViewPage;