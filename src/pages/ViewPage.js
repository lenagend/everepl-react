import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
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
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ShareIcon from '@mui/icons-material/Share';
import Button from "@mui/joy/Button";
import LikeButton from "../components/iconButtons/LikeButton";
import BookmarkButton from "../components/iconButtons/BookmarkButton";

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
                })
                    .then(response => {
                        const savedComment = response.data;
                        storeMyComment(savedComment.type, savedComment.id);
                    })
                ;
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

    const storeMyComment = (targetType, targetId) => {
        // 로컬 스토리지에서 기존 북마크 목록을 가져옵니다.
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

        // 동일한 targetId와 targetType을 가진 북마크가 이미 있는지 확인합니다.
        const alreadyBookmarked = bookmarks.some(bookmark => bookmark.targetId === targetId && bookmark.targetType === targetType);

        if (!alreadyBookmarked) {
            // 새 북마크 객체를 생성합니다.
            const newBookmark = { targetId, targetType };

            // 새 북마크를 기존 목록에 추가합니다.
            bookmarks.push(newBookmark);

            // 업데이트된 북마크 목록을 로컬 스토리지에 저장합니다.
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        }
    }

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
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);

    const fetchCommentsData = async (targetId, targetType, page, commentSize) => {
        try {
            const response = await axios.get('http://localhost:8080/api/comment', {
                params: {
                    page: page - 1,
                    size: commentSize,
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

        fetchCommentsData(targetId, targetType, page, commentSize)
            .then(data => {
                setComments(data); // 상태 업데이트
                setIsCommentsLoading(false);
            })
            .catch(error => {
                setErrorMessage({ fetchError: error.message });
                setIsCommentsLoading(false);
            });
    };

    // 페이지 변경 핸들러
    const handleCommentPageChange = () => {
        const nextPage = commentPage + 1;
        setCommentPage(nextPage); // 페이지 번호 업데이트
        fetchComments(id, 'URLINFO', nextPage); // 수정된 fetchComments 함수 호출
    };

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
            ) :  (
                <CommentList
                    comments={comments}
                    depth={0}
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
                    <BookmarkButton targetId={id} targetType='URLINFO'/>
                    <Button>신고</Button>
                    <IconButton><ShareIcon/></IconButton>
                </ButtonGroup>
            </Stack>
            <UrlListPage
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