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
import TextAreaBottomNavigation from "../components/menu/TextAreaBottomNavigation";
import Card from "@mui/joy/Card";
import styled from "@emotion/styled";
import LoadingUrlCardList from "../components/loading/LoadingUrlCardList";
import NotExistCommentList from "../components/loading/NotExistCommentList";
import {CardOverflow, Typography} from "@mui/joy";

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
                console.error('Error fetching url info', error);
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
        console.log(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };


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
            setTargetType('');
            setTargetId('');

            fetchComments(id, 'URLINFO');
        } catch (error) {
            console.error('댓글 전송 오류:', error);
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
                setComments(response.data);
                setIsCommentsLoading(false);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching data', error);
                setIsCommentsLoading(true);
            });
    }

    // 스타일 컴포넌트 정의
    const StyledCard = styled(Card)({
        position: 'relative',
        width: '50px',
        height: '30px',
        justifyContent: 'center',

        // 역삼각형 추가
        '.MuiCard-root::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px', // 역삼각형의 위치 조정
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent', // 왼쪽 테두리
            borderRight: '10px solid transparent', // 오른쪽 테두리
            borderTop: '10px solid white', // 상단 테두리 (역삼각형 색)
        },
    });

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
                <Card sx={{ p: 1.5, gap: 2, pt: 0, overflow: 'auto' }}>
                    <CardOverflow
                        color="primary"
                        sx={{
                            p: 2.5,
                            pb: 1,
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
                        setTargetNicknameAndIp={setTargetNicknameAndIp}
                        setTargetId={setTargetId}
                        setTargetType={setTargetType}
                    />
                </Card>
            )}
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
            <TextAreaBottomNavigation
                nickname={nickname}
                onNicknameChange={handleNicknameChange}
                password={password}
                onPasswordChange={handlePasswordChange}
                commentText={commentText}
                onCommentChange={setCommentText}
                onSubmit={handleSubmit}
                targetNicknameAndIp={targetNicknameAndIp}
            />
        </Stack>
    )
}

export default ViewPage;