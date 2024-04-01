import Link from "@mui/joy/Link";
import KeyboardAltRoundedIcon from '@mui/icons-material/KeyboardAltRounded';
import {Avatar} from "@mui/joy";

export default function LogoButton({width, variant, border}){

    return(
        <Link
            underline="none"
            href="/"
        >
            <Avatar variant={variant} alt="에브리플 로고" src="/images/logo/logo.png" size="lg"
                    sx={{border: border,
                        "--Avatar-size": width
                    }}/>
        </Link>
    )
}