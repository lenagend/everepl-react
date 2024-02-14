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
import {Add} from "@mui/icons-material";
import Button from "@mui/joy/Button";

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

        fetchComments(id, 'URLINFO', 1);
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

        // 오류가 있을 경우에만 실행
        if (Object.keys(tempErrors).length > 0) {
            setErrorMessageOpen(true);
            setErrorMessage(tempErrors);
        }

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
        if (!isValid) return;
        try {
            let response;
            if (commentActionType === 'edit') {
                // 수정 요청
                response = await axios.patch('http://localhost:8080/api/comment', {
                    nickname: nickname,
                    text: commentText,
                    password: password,
                    targetId: targetId
                });
            }else if (commentActionType === 'delete') {
                // 삭제 요청
                response = await axios.patch('http://localhost:8080/api/comment', {
                    password: password,
                    targetId: targetId,
                    isDeleted: true
                });
            }
            else {
                // 생성 요청
                response = await axios.post('http://localhost:8080/api/comment', {
                    nickname: nickname,
                    text: commentText,
                    password: password,
                    type: targetType || 'URLINFO',
                    targetId: targetId || id
                });
            }
            finalizeCommentAction();
        } catch (error) {
            let actionWord = '저장'; // 기본 동작은 '저장'
            if (commentActionType === 'edit') {
                actionWord = '수정';
            } else if (commentActionType === 'delete') {
                actionWord = '삭제';
            }

            setErrorMessage({ fetchError: `댓글 ${actionWord}에 실패했습니다. ${error.response ? error.response.data.message : error.message}` });

            // 서버로부터 오류 응답이 있는 경우, 상세 메시지를 추가
            if (error.response && error.response.data) {
                // 서버 응답에서 상세 메시지 추출
                const serverErrorMessage = error.response.data;
                setErrorMessage(prevState => ({
                    ...prevState, // 이전 상태를 유지
                    serverErrorMessage: serverErrorMessage // 상세 메시지 추가
                }));
            }
            setErrorMessageOpen(true);
        }
    };

    // 댓글 수정/삭제
    const [commentActionType, setCommentActionType] = useState('');

    const handleCommentAction = (comment, actionType) => {
        resetCommentState(actionType);
        setNickname(comment.nickname);
        setCommentText(comment.text);
        setTargetId(comment.id);
        setCommentActionType(actionType);
        setCommentEditorExpanded(true);
    };

    const handleEditComment = (comment) => {
        handleCommentAction(comment, 'edit');
    };

    const handleDeleteComment = (comment) => {
        handleCommentAction(comment, 'delete');
    };

    const resetCommentState = (actionType) => {
        setPassword('');
        // 오직 'edit' 또는 'delete' 액션일 때만 특정 상태를 초기화
        if (actionType === 'edit' || actionType === 'delete') {
            setNickname('');
            setTargetId('');
            setTargetNicknameAndIp('');
        }
        setCommentText('');
        setCommentActionType('');
    }

    const finalizeCommentAction = () => {
        resetCommentState(); // 상태 초기화
        setCommentEditorExpanded(false); // 댓글창 닫기
        fetchComments(id, 'URLINFO', 1); // 댓글 목록 다시 불러오기
    };


    //댓글 목록을 위한 변수와 함수들.
    const [commentPage, setCommentPage] = useState(1);
    const [commentSize, setCommentSize] = useState(10);
    const [comments, setComments] = useState([]);
    const [commentTree, setCommentTree] = useState([]); // 계층적 구조를 가진 댓글 목록
    const [totalElements, setTotalElements] = useState([]); // 계층적 구조를 가진 댓글 목록
    const [totalPages, setTotalPages] = useState([]); // 계층적 구조를 가진 댓글 목록
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);

    const fetchComments = (targetId, targetType, page) => {


        axios.get('http://localhost:8080/api/comment', {
            params: {
                page: page - 1,
                size: commentSize,
                type: targetType,
                targetId: targetId
            },
        })
            .then(response => {
                setTotalElements(response.data.totalElements)
                setTotalPages(response.data.totalPages)
                const newComments = response.data.content;
                // 기존 댓글 목록에 새로운 댓글 추가
                setComments(prevComments => [...prevComments, ...newComments]);

                //새로운 댓글을 포함해 전체 댓글 목록에 대해 자식 관계 설정
                const updatedCommentTree = buildCommentTree([...comments, ...newComments]);
                // 계층적 구조가 설정된 댓글 목록 업데이트
                setCommentTree(updatedCommentTree);

                setIsCommentsLoading(false);
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
    const handleCommentPageChange = () => {
        const nextPage = commentPage + 1;
        setCommentPage(nextPage); // 페이지 번호 업데이트
        fetchComments(id, 'URLINFO', nextPage); // 수정된 fetchComments 함수 호출
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
        setCommentActionType('');
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
            ) : comments.length === 0 ? (
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
                            {totalElements}개의 댓글이 있습니다.
                        </Typography>
                    </CardOverflow>
                    <CommentList
                        comments={commentTree}
                        depth={0}
                        commentCount={totalElements}
                        onCommentButtonClick={handleCommentButtonClick}
                        onEditComment={handleEditComment} onDeleteComment={handleDeleteComment}
                    />
                    <CardOverflow
                        color="primary"
                        sx={{
                            p: 2,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Button disabled={commentPage === totalPages ? true : false}
                                variant="solid" startDecorator={<Add />}
                                onClick={handleCommentPageChange}
                        >
                            더보기 [{commentPage}/{totalPages}]
                        </Button>
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
                commentActionType={commentActionType}
                resetCommentState={resetCommentState}
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