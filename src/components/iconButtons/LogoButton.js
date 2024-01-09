import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";

export default function LogoButton({width}){
    const navigate = useNavigate();
    const logo = '/images/logo/logo.png'
    const handleClick = () => {
        window.location.href="/";
    };
    return(
        <Box onClick={handleClick} sx={{ cursor: 'pointer', width: width }}>
            <img src={logo} alt="logo" style={{ width: '100%' }} />
        </Box>
    )
}