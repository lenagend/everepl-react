import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../security/AuthProvider";
import {useSnackbar} from "../../contexts/SnackbarProvider";
import Box from "@mui/joy/Box";
import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Modal, ModalClose, ModalDialog, ModalOverflow, Table, Input, Typography} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Badge from "@mui/material/Badge";
import ProfileImage from "../user/ProfileImage";

const UserList = ({ page, onPageChange }) => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const { axiosInstance } = useAuth();
    const { showSnackbar } = useSnackbar();
    const [selectedUser, setSelectedUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [userDetails, setUserDetails] = useState({
        id: "",
        name: "",
        imageUrl: "",
    });
    const [previewUrl, setPreviewUrl] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get(`/admin/users?page=${page}&size=10`);
                setUsers(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [page, axiosInstance]);

    const handleDelete = async (userId) => {
        try {
            await axiosInstance.delete(`/admin/users/${userId}`);
            showSnackbar('사용자가 정상적으로 삭제되었습니다.', 'primary');
        } catch (error) {
            showSnackbar('사용자 삭제에 실패했습니다. ' + (error.response ? error.response.data.message : error.message), 'danger');
        }
    };

    const handleSuspendProfilePicture = async (userId) => {
        const days = prompt("프로필 사진 정지 기간을 일 수로 입력하세요:", "14");
        if (days !== null && days !== "") {
            try {
                await axiosInstance.post(`/admin/users/${userId}/suspend-profile-picture?days=${days}`);
                showSnackbar('프로필 사진이 정상적으로 정지되었습니다.', 'primary');
            } catch (error) {
                showSnackbar('프로필 사진 정지에 실패했습니다. ' + (error.response ? error.response.data.message : error.message), 'danger');
            }
        }
    };

    const handleSuspendComments = async (userId) => {
        const days = prompt("댓글 작성 정지 기간을 일 수로 입력하세요:", "14");
        if (days !== null && days !== "") {
            try {
                await axiosInstance.post(`/admin/users/${userId}/suspend-comments?days=${days}`);
                showSnackbar('댓글 작성이 정상적으로 정지되었습니다.', 'primary');
            } catch (error) {
                showSnackbar('댓글 작성 정지에 실패했습니다. ' + (error.response ? error.response.data.message : error.message), 'danger');
            }
        }
    };

    const handleEdit = (user) => {
        setUserDetails({
            id: user.id,
            name: user.name || "", // null 대신 빈 문자열 사용
            imageUrl: user.imageUrl || "", // null 대신 빈 문자열 사용
        });
        setPreviewUrl(user.imageUrl || "");
        setSelectedUser(user);
        setOpenModal(true);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                imageUrl: file,
            }));
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("name", userDetails.name);
        if (userDetails.imageUrl instanceof File) {
            formData.append("profileImage", userDetails.imageUrl);
        }

        try {
            await axiosInstance.patch(`/admin/users/${userDetails.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            showSnackbar('사용자 정보가 정상적으로 수정되었습니다.', 'primary');
            setOpenModal(false);
        } catch (error) {
            showSnackbar('사용자 정보 수정에 실패했습니다. ' + (error.response ? error.response.data.message : error.message), 'danger');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 50 }}>ID</TableCell>
                            <TableCell sx={{ width: 120 }}>이름</TableCell>
                            <TableCell sx={{ width: 100 }}>역할</TableCell>
                            <TableCell>액션</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{Array.from(user.roles).join(', ')}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Button onClick={() => handleEdit(user)} variant="outlined">
                                            수정
                                        </Button>
                                        <Button onClick={() => handleDelete(user.id)} variant="outlined" color="danger">
                                            삭제
                                        </Button>
                                        <Button onClick={() => handleSuspendProfilePicture(user.id)} variant="outlined" color="warning">
                                            프로필 정지
                                        </Button>
                                        <Button onClick={() => handleSuspendComments(user.id)} variant="outlined" color="warning">
                                            댓글 정지
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                <Button
                    disabled={page === 0}
                    onClick={() => onPageChange(page - 1)}
                >
                    이전
                </Button>
                <Button
                    disabled={page >= totalPages - 1}
                    onClick={() => onPageChange(page + 1)}
                >
                    다음
                </Button>
            </Stack>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openModal}
                onClose={() => setOpenModal(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalOverflow>
                    <ModalDialog aria-labelledby="modal-dialog-overflow" layout={'center'} sx={{ maxWidth: 600 }}>
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                            mb={1}
                        >
                            사용자 정보 수정
                        </Typography>
                        <Stack spacing={2} mt={2}>
                            <Input
                                placeholder="이름"
                                name="name"
                                value={userDetails.name}
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                            />
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
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />
                            </Badge>
                            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                                <Button onClick={handleSave} color="primary">
                                    저장
                                </Button>
                                <Button onClick={() => setOpenModal(false)} color="danger">
                                    취소
                                </Button>
                            </Stack>
                        </Stack>
                    </ModalDialog>
                </ModalOverflow>
            </Modal>
        </Box>
    );
};

export default UserList;