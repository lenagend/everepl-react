import {Avatar} from "@mui/joy";
import * as React from "react";

export default function ProfileImage({src}){

    return (
        <Avatar
            sx={{
                "--Avatar-size": {
                    xs: '40px',
                    sm: '60px'
                }
            }}
            variant={'soft'}
            src={src ? src : "/images/character/level3.png"}
            alt={'프로필이미지'}
        />
    )
}