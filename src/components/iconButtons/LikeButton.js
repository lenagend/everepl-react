import {IconButton} from "@mui/joy";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import * as React from "react";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Stack from "@mui/joy/Stack";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../security/AuthProvider";
import {useSnackbar} from "../../contexts/SnackbarProvider";

export default function ({ targetId, targetType, likeButtonContext}) {
    const navigate = useNavigate();
    const { isAuthenticated, axiosInstance } = useAuth();
    const location = useLocation();
    const { showSnackbar } = useSnackbar();

    const handleLikeClick = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        try {
            const response = await axiosInstance.post('/like/add', {
                targetId: targetId,
                type: targetType
            });
            showSnackbar('성공적으로 좋아요 되었습니다.', 'primary');
        } catch (error) {
            showSnackbar('좋아요에 실패했습니다. ' + (error.response?.data?.message || error.message), 'danger');
        }
    };


    const renderLikeButton = () => {
        switch (likeButtonContext) {
            case 'COMMENT':
                return (
                    <IconButton onClick={handleLikeClick} variant="plain" sx={{
                        "--IconButton-size": "20px",
                        ml: -0.5
                    }}>
                        <FavoriteTwoToneIcon color="action" sx={{ fontSize: 20 }}/>
                    </IconButton>
                );
            default:
                return (
                    <IconButton onClick={handleLikeClick}>
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                );
        }
    };

    return (
        <Stack alignContent={"center"} justifyContent={"center"}>
            {renderLikeButton()}
        </Stack>
    );
}