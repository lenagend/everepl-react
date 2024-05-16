import MyMenuConsole from "../menu/MyMenuConsole";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import Card from "@mui/joy/Card";
import ProfileImage from "../user/ProfileImage";
import {useAuth} from "../../security/AuthProvider";
import {Badge, CardContent, Input, Typography} from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import Button from "@mui/joy/Button";
import {useEffect, useRef, useState} from "react";
import Box from "@mui/joy/Box";

export default function Profile() {
    const { user, setUser, axiosInstance, isAuthLoading } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [previewUrl, setPreviewUrl] = useState(''); // 미리보기 URL 상태
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setPreviewUrl(user.imageUrl);
        }
    }, [user]);

    // 파일 선택을 처리하는 함수
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // 이미지 파일만 허용하고, 파일 크기는 5MB 이하만 허용
            if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
                setSelectedFile(file);
                const preview = URL.createObjectURL(file); // 선택된 이미지의 미리보기 URL 생성
                setPreviewUrl(preview); // 미리보기 URL 업데이트
            } else {
                alert('이미지 파일만 선택 가능하며, 크기는 5MB 이하여야 합니다.');
            }
        }
    };

    // 변경 사항을 서버에 업데이트하는 함수
    const updateProfile = async () => {
        const formData = new FormData();
        formData.append('name', name);
        if (selectedFile) {
            formData.append('profileImage', selectedFile);
        }

        try {
            const response = await axiosInstance.patch('/auth', formData);
            setUser(response.data);
            alert('프로필이 업데이트 되었습니다.');
        } catch (error) {
            console.error('프로필 업데이트 중 에러 발생:', error);
            alert('프로필 업데이트에 실패했습니다.');
        }
    };

    if (isAuthLoading) {
        return <Box>프로필 로딩중...</Box>; // 로딩 중일 때 표시할 컴포넌트
    }

    if (!user) {
        return <Box>유저를 찾을 수 없습니다. 다시 로그인해주세요.</Box>; // 사용자 정보가 없을 때 표시할 컴포넌트
    }

    return (
        <Stack spacing={2}>
            <MyMenuConsole currentPath={"/my/profile"} />
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} alignItems={'center'} justifyContent={'center'}>
                <Card
                    orientation="horizontal"
                    sx={{
                        width: { xs: '100%', sm: '50%' },
                        maxWidth: '100%', // 화면을 넘어가지 않도록 최대 너비 설정
                        boxSizing: 'border-box' // 패딩이나 보더가 너비에 포함되도록
                    }}
                >
                    <CardOverflow
                        variant="soft"
                        color="primary"
                        sx={{
                            px: 0.2,
                            writingMode: 'vertical-rl',
                            textAlign: 'center',
                            fontSize: 'xs',
                            fontWeight: 'xl',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            borderLeft: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        유저정보
                    </CardOverflow>
                    <CardContent>
                        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'start'}>
                            <Badge
                                badgeInset="14%"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                badgeContent={<Typography sx={{ color: 'white', fontSize: { xs: 7, sm: 10 } }}>클릭</Typography>}
                                sx={{ p: 0 }}
                                onClick={() => fileInputRef.current.click()}
                            >
                                <ProfileImage src={previewUrl} />
                                <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileSelect} />
                            </Badge>
                            <Input sx={{ flexGrow: 1 }} value={name} onChange={(e) => setName(e.target.value)} />
                            <Button onClick={updateProfile}>변경</Button>
                        </Stack>
                    </CardContent>
                </Card>
                <Card
                    orientation="horizontal"
                    sx={{
                        width: { xs: '100%', sm: '50%' },
                        maxWidth: '100%', // 화면을 넘어가지 않도록 최대 너비 설정
                        boxSizing: 'border-box' // 패딩이나 보더가 너비에 포함되도록
                    }}
                >
                    <CardOverflow
                        variant="soft"
                        color="primary"
                        sx={{
                            px: 0.2,
                            writingMode: 'vertical-rl',
                            textAlign: 'center',
                            fontSize: 'xs',
                            fontWeight: 'xl',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            borderLeft: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        회원탈퇴
                    </CardOverflow>
                    <Stack spacing={2} direction={'row'} alignItems={'center'} width={'100%'}>
                        <Typography sx={{ flexGrow: 1 }}>복구할 수 없습니다</Typography>
                        <Button color={'danger'}>탈퇴</Button>
                    </Stack>
                </Card>
            </Stack>
        </Stack>
    );
}