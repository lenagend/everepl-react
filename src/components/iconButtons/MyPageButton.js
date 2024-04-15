
import PersonIcon from '@mui/icons-material/Person';
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";

export default function MyPageButton(){
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate("/my/profile");
    }
    return(
        <IconButton sx={{ color: "white" }} onClick={handleButtonClick}>
            <PersonIcon sx={{fontSize: 25}}/>
        </IconButton>
    )
}