import * as React from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Badge, CardOverflow, Container, FormControl, Input, Typography} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import IconButton from '@mui/material/IconButton';
import IconButtonJoy from '@mui/joy/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Collapse, Popover} from "@mui/material";
import Link from "@mui/joy/Link";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {useAuth} from "../../security/AuthProvider";
import ProfileImage from "../user/ProfileImage";
import ReactQuill from "react-quill";
import {useRef, useState} from "react";

const gifList = [
    '/images/imoticon/1.gif', '/images/imoticon/2.gif', '/images/imoticon/3.gif', '/images/imoticon/4.gif',
    '/images/imoticon/5.gif', '/images/imoticon/6.gif', '/images/imoticon/7.gif', '/images/imoticon/8.gif',
    '/images/imoticon/9.gif', '/images/imoticon/10.gif', '/images/imoticon/11.gif', '/images/imoticon/12.gif',
    '/images/imoticon/13.gif', '/images/imoticon/14.gif', '/images/imoticon/15.gif', '/images/imoticon/16.gif',
    '/images/imoticon/17.gif', '/images/imoticon/18.gif', '/images/imoticon/19.gif', '/images/imoticon/20.gif',
    '/images/imoticon/21.gif', '/images/imoticon/22.gif', '/images/imoticon/23.gif', '/images/imoticon/24.gif',
    '/images/imoticon/25.gif', '/images/imoticon/26.gif', '/images/imoticon/27.gif', '/images/imoticon/28.gif',
    '/images/imoticon/29.gif', '/images/imoticon/30.gif', '/images/imoticon/31.gif', '/images/imoticon/32.gif',
    '/images/imoticon/33.gif', '/images/imoticon/34.gif', '/images/imoticon/35.gif', '/images/imoticon/36.gif',
    '/images/imoticon/37.gif', '/images/imoticon/38.gif', '/images/imoticon/39.gif', '/images/imoticon/40.gif',
    '/images/imoticon/41.gif', '/images/imoticon/42.gif', '/images/imoticon/43.gif', '/images/imoticon/44.gif',
    '/images/imoticon/45.gif', '/images/imoticon/46.gif', '/images/imoticon/47.gif', '/images/imoticon/48.gif',
    '/images/imoticon/49.gif', '/images/imoticon/50.gif', '/images/imoticon/51.gif', '/images/imoticon/52.gif',
    '/images/imoticon/53.gif', '/images/imoticon/54.gif', '/images/imoticon/55.gif', '/images/imoticon/56.gif',
    '/images/imoticon/57.gif', '/images/imoticon/58.gif', '/images/imoticon/59.gif', '/images/imoticon/60.gif',
    '/images/imoticon/61.gif', '/images/imoticon/62.gif', '/images/imoticon/63.gif', '/images/imoticon/64.gif',
    '/images/imoticon/65.gif', '/images/imoticon/66.gif', '/images/imoticon/67.gif', '/images/imoticon/68.gif',
    '/images/imoticon/69.gif', '/images/imoticon/70.gif', '/images/imoticon/71.gif', '/images/imoticon/72.gif',
    '/images/imoticon/73.gif', '/images/imoticon/74.gif', '/images/imoticon/75.gif', '/images/imoticon/76.gif',
    '/images/imoticon/77.gif', '/images/imoticon/78.gif', '/images/imoticon/79.gif', '/images/imoticon/80.gif',
    '/images/imoticon/81.gif', '/images/imoticon/82.gif', '/images/imoticon/83.gif', '/images/imoticon/84.gif',
    '/images/imoticon/85.gif', '/images/imoticon/86.gif', '/images/imoticon/87.gif', '/images/imoticon/88.gif',
    '/images/imoticon/89.gif', '/images/imoticon/90.gif', '/images/imoticon/91.gif', '/images/imoticon/92.gif',
    '/images/imoticon/93.gif', '/images/imoticon/94.gif', '/images/imoticon/95.gif', '/images/imoticon/96.gif',
    '/images/imoticon/97.gif', '/images/imoticon/98.gif', '/images/imoticon/99.gif', '/images/imoticon/100.gif',
    '/images/imoticon/101.gif', '/images/imoticon/102.gif', '/images/imoticon/103.gif', '/images/imoticon/104.gif',
    '/images/imoticon/105.gif', '/images/imoticon/106.gif', '/images/imoticon/107.gif', '/images/imoticon/108.gif',
    '/images/imoticon/109.gif', '/images/imoticon/110.gif', '/images/imoticon/111.gif', '/images/imoticon/112.gif',
    '/images/imoticon/113.gif', '/images/imoticon/114.gif', '/images/imoticon/115.gif', '/images/imoticon/116.gif',
    '/images/imoticon/117.gif', '/images/imoticon/118.gif', '/images/imoticon/119.gif', '/images/imoticon/120.gif',
    '/images/imoticon/121.gif', '/images/imoticon/122.gif', '/images/imoticon/123.gif', '/images/imoticon/124.gif',
    '/images/imoticon/125.gif', '/images/imoticon/126.gif', '/images/imoticon/127.gif', '/images/imoticon/128.gif',
    '/images/imoticon/129.gif', '/images/imoticon/130.gif', '/images/imoticon/131.gif', '/images/imoticon/132.gif',
    '/images/imoticon/133.gif', '/images/imoticon/134.gif', '/images/imoticon/135.gif', '/images/imoticon/136.gif',
    '/images/imoticon/137.gif', '/images/imoticon/138.gif', '/images/imoticon/139.gif', '/images/imoticon/140.gif',
    '/images/imoticon/141.gif', '/images/imoticon/142.gif', '/images/imoticon/143.gif', '/images/imoticon/144.gif',
    '/images/imoticon/145.gif', '/images/imoticon/146.gif', '/images/imoticon/147.gif', '/images/imoticon/148.gif'
];


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const StyledQuill = styled(ReactQuill)(({ theme }) => ({
    '.ql-container': {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '16px',
        backgroundColor: '#f9f9f9',
        minHeight: '120px',
        maxHeight: '240px',
        overflowY: 'auto'
    },
    '.ql-editor': {
        minHeight: '120px',
        maxHeight: '240px',
        fontFamily: 'inherit',
        fontSize: '16px',
        lineHeight: '1.5',
        color: '#333',
        padding: '8px'
    },
    '.ql-toolbar': {
        border: '1px solid #e0e0e0',
        borderRadius: '8px 8px 0 0',
        backgroundColor: '#f1f1f1'
    },
    '.ql-clipboard': {
        display: 'none' // ql-clipboard 요소를 숨깁니다.
    },
}));


export default function CommentEditor({
                                          commentText, onCommentChange, onSubmit, selectedComment,
                                          handleCommentExpandClick, commentEditorExpanded, handleCommentButtonClick,
                                          commentActionType, resetCommentState
                                      }) {
    const { user } = useAuth();
    const [editorHtml, setEditorHtml] = useState(commentText);
    const [anchorEl, setAnchorEl] = useState(null);
    const quillRef = useRef(null);

    // 에디터 내용 변경 핸들러
    const handleEditorChange = (content) => {
        setEditorHtml(content);
        onCommentChange(content); // HTML 형태로 저장
    };

    // GIF 선택 핸들러
// GIF 선택 핸들러
    const handleGifClick = (gifUrl) => {
        setAnchorEl(null); // Popover를 닫습니다.

        const quill = quillRef.current.getEditor(); // Quill 에디터 인스턴스를 가져옵니다.
        const range = quill.getSelection(); // 현재 커서 위치를 가져옵니다.
        const editorContent = quill.getContents(); // 에디터의 전체 콘텐츠를 가져옵니다.

        // 이미지 삽입 함수
        const insertImageAtIndex = (index) => {
            quill.insertEmbed(index, 'image', gifUrl); // 지정된 위치에 이미지(GIF)를 삽입합니다.

            // Quill에서 삽입된 이미지 요소를 찾아 스타일을 적용합니다.
            const imgElements = quill.root.querySelectorAll(`img[src="${gifUrl}"]`);
            if (imgElements.length > 0) {
                const imgElement = imgElements[imgElements.length - 1]; // 가장 마지막에 삽입된 이미지
                if (imgElement) {
                    imgElement.style.width = '50px'; // 너비를 50px로 설정
                    imgElement.style.height = '50px'; // 높이를 50px로 설정
                    imgElement.style.borderRadius = '50%'; // 원형으로 만듭니다.
                    imgElement.style.verticalAlign = 'middle'; // 텍스트와 세로 중앙 정렬
                    imgElement.style.marginLeft = '5px';
                    imgElement.style.marginRight = '5px';
                }
            }

            // 한 칸 띄기를 통해 Quill 에디터의 업데이트를 트리거
            quill.insertText(index + 1, ' '); // 공백 문자 추가

            quill.setSelection(index + 1); // 커서를 이미지 뒤로 이동합니다.
        };

        if (range && range.index != null) {
            // 커서 위치가 있는 경우, 해당 위치에 이미지 삽입
            insertImageAtIndex(range.index);
        } else {
            // 커서 위치가 없는 경우
            if (editorContent.length() === 0 || (editorContent.length() === 1 && editorContent.ops[0].insert.trim() === '')) {
                // 에디터에 내용이 없으면 첫 줄에 이미지 삽입
                insertImageAtIndex(0);
            } else {
                // 에디터에 내용이 있으면 마지막 텍스트 위치 바로 뒤에 이미지 삽입
                const lastOp = editorContent.ops[editorContent.ops.length - 1]; // 마지막 오퍼레이션
                let lastIndex = editorContent.length() - 1; // 기본 마지막 위치

                if (typeof lastOp.insert === 'string') {
                    // 마지막 오퍼레이션이 텍스트라면 그 길이를 더함
                    lastIndex += lastOp.insert.length;
                }

                insertImageAtIndex(lastIndex);
            }
        }

        // 에디터에 포커스를 맞추기 위한 timeout
        setTimeout(() => {
            quill.focus(); // 에디터에 포커스를 맞춥니다.
        }, 0); // 포커스를 다시 맞추기 위해 약간의 딜레이를 줍니다.
    };





    const handleSubmit = () => {
        onSubmit(); // 기존의 onSubmit 기능을 호출합니다.
        setEditorHtml(''); // 에디터 내용을 초기화합니다.
    };

    const handleGifButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const commentTitles = {
        edit: '댓글수정',
        delete: '댓글삭제',
        create: '댓글쓰기', // 기본값 혹은 'create' 상태일 때의 제목
    };

    const commentTitle = commentTitles[commentActionType] || '댓글쓰기';

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }} elevation={3}>
            <Container maxWidth="md" sx={{ p: { xs: 0, sm: 0.5 } }}>
                <Card sx={{ p: 0, gap: 0 }}>
                    <CardOverflow
                        variant="soft"
                        color="primary"
                        sx={{
                            px: 2,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Link
                            overlay
                            onClick={handleCommentExpandClick}
                            underline="none"
                        >
                            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                                <Badge
                                    badgeContent={<CloseRoundedIcon sx={{ fontSize: 10 }} />}
                                    variant="outlined" color="danger" size="sm"
                                    badgeInset="-8%"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        resetCommentState();
                                    }}
                                    invisible={commentActionType ? false : true}
                                >
                                    <Typography level="title-md">
                                        {commentTitle}
                                    </Typography>
                                    {selectedComment ? (
                                        <Badge
                                            badgeContent={<CloseRoundedIcon sx={{ fontSize: 10 }} />}
                                            variant="outlined" color="danger" size="sm"
                                            badgeInset="-2%"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCommentButtonClick(null, '', '');
                                            }}>
                                            <Typography level="title-lg" color="primary" sx={{ pl: 1 }}>
                                                @{selectedComment.user.name}&nbsp;&nbsp;
                                            </Typography>
                                        </Badge>
                                    ) : (
                                        <Typography level="title-lg" color="primary" sx={{ pl: 1 }}>
                                            {commentActionType ? '' : '@원문'}
                                        </Typography>
                                    )}
                                </Badge>
                                <ExpandMore
                                    expand={commentEditorExpanded}
                                    aria-expanded={commentEditorExpanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </Stack>
                        </Link>
                    </CardOverflow>
                    <Collapse in={commentEditorExpanded} timeout="auto" unmountOnExit>
                        <CardContent sx={{ p: 0 }}>
                            <Card orientation="horizontal" variant="outlined" sx={{ p: 1, border: 'none' }}>
                                <CardContent>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <StyledQuill
                                            ref={quillRef}
                                            value={editorHtml}
                                            onChange={handleEditorChange}
                                            modules={{ toolbar: false }} // 툴바 제거
                                            placeholder="여기에 댓글을 달아주세요..."
                                        />
                                        <IconButton
                                            aria-describedby={id}
                                            onClick={handleGifButtonClick}
                                            sx={{
                                                position: 'absolute', // 절대 위치 설정
                                                top: '8px', // 위쪽 여백
                                                left: '8px', // 왼쪽 여백
                                                zIndex: 10 // 버튼이 에디터 위에 오도록 z-index 설정
                                            }}
                                        >
                                            <EmojiEmotionsIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                                <Stack spacing={2}>
                                    {user && (
                                        <Link href={'/my/profile'}>
                                            <ProfileImage src={user.imageUrl} />
                                        </Link>
                                    )}
                                    <IconButtonJoy variant="solid" color="primary" sx={{ flexGrow: 1 }}
                                                   onClick={handleSubmit}
                                    >
                                        <SendIcon />
                                    </IconButtonJoy>
                                </Stack>
                            </Card>
                        </CardContent>
                    </Collapse>
                </Card>
            </Container>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box display="flex" flexWrap="wrap" p={2} width="300px">
                    {gifList.map((gif) => (
                        <Box
                            key={gif}
                            sx={{ cursor: 'pointer', m: '5px' }}
                            onClick={() => handleGifClick(gif)}
                        >
                            <img src={gif} alt="GIF" style={{ width: '50px', height: '50px' }} />
                        </Box>
                    ))}
                </Box>
            </Popover>
        </Box>
    );
}

