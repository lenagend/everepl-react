import Link from "@mui/joy/Link";
import KeyboardAltRoundedIcon from '@mui/icons-material/KeyboardAltRounded';

export default function LogoButton({width}){

    return(
        <Link
            underline="none"
            href="/"
        >
            <KeyboardAltRoundedIcon fontSize="large" sx={{ color : 'white'}} />
        </Link>
    )
}