
import PersonIcon from '@mui/icons-material/Person';
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "@mui/joy";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import {useAuth} from "../../security/AuthProvider";

export default function MyPageButton(){
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleMyPageClick = () => {
        navigate("/my/notification");
    }

    const handleLoginClick = () => {
        navigate("/signin");
    }

    return(
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
            >
                <PersonIcon sx={{fontSize: 25, color: 'white'}}/>
            </MenuButton>
            <Menu>
                <Menu>
                    {user ? (
                        <>
                            <MenuItem onClick={handleMyPageClick}>마이페이지</MenuItem>
                            <MenuItem onClick={logout}>로그아웃</MenuItem>
                        </>
                    ) : (
                        <MenuItem onClick={handleLoginClick}>로그인</MenuItem>
                    )}
                </Menu>
            </Menu>
        </Dropdown>
    )
}