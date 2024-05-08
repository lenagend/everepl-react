import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import UrlCard from "../components/url/UrlCard";
import Stack from "@mui/joy/Stack";
import CommentList from "../components/comments/CommentList";
import axios from "axios";
import LoadingUrlCard from "../components/loading/LoadingUrlCard";
import UrlListPage from "./UrlListPage";
import {handleScrollToTop} from "../utils/navigationUtils";
import CommentEditor from "../components/menu/CommentEditor";
import LoadingUrlCardList from "../components/loading/LoadingUrlCardList";
import {ButtonGroup, IconButton, Snackbar, Typography} from "@mui/joy";
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShareIcon from '@mui/icons-material/Share';
import Button from "@mui/joy/Button";
import LikeButton from "../components/iconButtons/LikeButton";
import {useAuth} from "../security/AuthProvider";

const ViewPage = ({ page, currentFilterKey, currentSortKey, onSortChange, onPageChange, onFilterChange, fetchUrlInfos, urlInfos, isUrlInfosLoading }) => {
    let {id} = useParams();
    const [urlInfo, setUrlInfo] = useState(null);
    const [isUrlCardLoading, setIsUrlCardLoading] = useState(true);
    const { isAuthenticated, axiosInstance } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

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
    const [commentText, setCommentText] = useState('');
    const [targetId, setTargetId] = useState('');
    const [targetType, setTargetType] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);


    const validate = () => {
        let tempErrors = {};

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

    const actionWordMapping = {
        edit: '수정',
        delete: '삭제',
        default: '저장',
    };

    // API 요청에 대한 함수들
    const createComment = async () => {
        return await axiosInstance.post('http://localhost:8080/api/comment', {
            text: commentText,
            type: targetType || 'URLINFO',
            targetId: targetId || id
        });
    };

    const editComment = async () => {
        return await axiosInstance.patch('http://localhost:8080/api/comment', {
            text: commentText,
            targetId: targetId
        });
    };

    const deleteComment = async () => {
        return await axiosInstance.delete(`http://localhost:8080/api/comment/${targetId}`);
    };

    // 에러 처리 함수
    const handleError = (error, actionWord) => {
        const defaultMessage = `댓글 ${actionWord}에 실패했습니다. `;
        const detailedMessage = error.response ? error.response.data.message : error.message;

        setErrorMessage({ fetchError: defaultMessage + detailedMessage });
        setErrorMessageOpen(true);
    };

    const handleSubmit = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        if (!validate()) return;

        try {
            const actionMapping = {
                edit: editComment,
                delete: deleteComment,
                default: createComment,
            };

            const action = actionMapping[commentActionType] || actionMapping.default;
            const actionWord = actionWordMapping[commentActionType] || actionWordMapping.default;

            const response = await action();

            finalizeCommentAction();
        } catch (error) {
            handleError(error, actionWordMapping[commentActionType] || actionWordMapping.default);
        }
    };

    // 댓글 수정/삭제
    const [commentActionType, setCommentActionType] = useState('');

    const handleCommentAction = (comment, actionType) => {
        resetCommentState(actionType);
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
        // 오직 'edit' 또는 'delete' 액션일 때만 특정 상태를 초기화
        if (actionType === 'edit' || actionType === 'delete') {
            setTargetId('');
            setSelectedComment(null);
        }
        setCommentText('');
        setCommentActionType('');
    }

    const finalizeCommentAction = () => {
        resetCommentState(); // 상태 초기화
        handleToggleCommentEditor(false); // 댓글창 닫기
        fetchUrlInfo(id);
        fetchComments(id, 'URLINFO', 1); // 댓글 목록 다시 불러오기
    };


    //댓글 목록을 위한 변수와 함수들.
    const [comments, setComments] = useState([]);
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);

    const fetchCommentsData = async (targetId, targetType, page, commentSize) => {
        try {
            const response = await axios.get('http://localhost:8080/api/comment', {
                params: {
                    type: targetType,
                    targetId: targetId
                },
            });
            return response.data; // 데이터 반환
        } catch (error) {
            throw new Error('댓글 정보를 불러오는데 실패했습니다.'); // 에러 처리
        }
    };

    const fetchComments = (targetId, targetType, page) => {
        setIsCommentsLoading(true);

        fetchCommentsData(targetId, targetType)
            .then(data => {
                setComments(data); // 상태 업데이트
                setIsCommentsLoading(false);
            })
            .catch(error => {
                setErrorMessage({ fetchError: error.message });
                setIsCommentsLoading(false);
            });
    };

    //댓글창 열었다 닫기
    const [commentEditorExpanded, setCommentEditorExpanded] = React.useState(false);

    const handleToggleCommentEditor = (expand) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        // 파라미터에 따라 댓글창 상태 설정
        if (expand === true) {
            // 댓글창을 무조건 열기
            setCommentEditorExpanded(true);
        } else if (expand === false) {
            // 댓글창을 무조건 닫기
            setCommentEditorExpanded(false);
        } else {
            // 파라미터가 제공되지 않거나 null인 경우, 댓글창 상태 토글
            setCommentEditorExpanded(prev => !prev);
        }
    };


    const handleCommentExpandClick = () => {
        handleToggleCommentEditor();
    };

    //대댓글 클릭
    const handleCommentButtonClick = (selectedComment, targetId, targetType) => {
        setSelectedComment(selectedComment);
        setTargetId(targetId);
        setTargetType(targetType);
        setCommentActionType('');
        handleToggleCommentEditor(true);
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
            ) :  (
                <CommentList
                    commentCount={urlInfo ? urlInfo.commentCount : 0}
                    comments={comments}
                    onCommentButtonClick={handleCommentButtonClick}
                    onEditComment={handleEditComment} onDeleteComment={handleDeleteComment}
                />
            )}
            <Stack direction="row" justifyContent="flex-end">
                <ButtonGroup
                    color="primary"
                    variant="soft"
                    spacing="0.5rem"
                >
                    <LikeButton targetId={id} targetType='URLINFO'/>
                    <Button>신고</Button>
                    <IconButton><ShareIcon/></IconButton>
                </ButtonGroup>
            </Stack>
            <UrlListPage
                page={page}
                currentFilterKey={currentFilterKey}
                currentSortKey={currentSortKey}
                onSortChange={onSortChange}
                onPageChange={onPageChange}
                onFilterChange={onFilterChange}
                fetchUrlInfos={fetchUrlInfos}
                urlInfos={urlInfos}
                isUrlInfosLoading={isUrlInfosLoading}
            />
            <CommentEditor
                commentText={commentText}
                onCommentChange={setCommentText}
                onSubmit={handleSubmit}
                selectedComment={selectedComment}
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