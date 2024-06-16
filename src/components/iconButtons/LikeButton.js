import {IconButton} from "@mui/joy";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import * as React from "react";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Stack from "@mui/joy/Stack";

export default function LikeButton({ targetId, targetType, onLike, disable, likeButtonContext}) {

    const renderLikeButton = () => {
        switch (likeButtonContext) {
            case 'COMMENT':
                return (
                    <IconButton onClick={() => onLike(targetId, targetType)} variant="plain" sx={{
                        "--IconButton-size": "20px",
                        ml: -0.5
                    }}
                    disabled={disable}
                    >
                        <FavoriteTwoToneIcon color="action" sx={{ fontSize: 20 }}/>
                    </IconButton>
                );
            default:
                return (
                    <IconButton onClick={() => onLike(targetId, targetType)}
                                disabled={disable}
                    >
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