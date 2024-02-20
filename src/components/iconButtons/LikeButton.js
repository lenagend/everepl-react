import {IconButton} from "@mui/joy";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import * as React from "react";
import axios from "axios";

export default function LikeButton({ targetId, targetType }) {
    const handleLikeClick = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/like/add', {
                targetId: targetId,
                type: targetType
            });
            console.log('좋아요 되었습니다.', response.data);
            // 여기에 성공 시 UI 업데이트 로직을 추가할 수 있습니다.
        } catch (error) {
            console.error('좋아요에 실패했습니다.', error.response ? error.response.data : error.message);
            // 여기에 에러 처리 로직을 추가할 수 있습니다.
        }
    };

    return (
        <IconButton onClick={handleLikeClick}>
            <FavoriteBorderOutlinedIcon />
        </IconButton>
    );
}