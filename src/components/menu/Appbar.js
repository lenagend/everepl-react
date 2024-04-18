import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoButton from "../iconButtons/LogoButton";
import {RateReview} from "@mui/icons-material";
import {InputAdornment} from "@mui/material";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Stack from "@mui/joy/Stack";
import MyPageButton from "../iconButtons/MyPageButton";
import Typography from "@mui/joy/Typography";
import {Switch} from "@mui/joy";
import NotificationSetting from "../alert/NotificationSetting";
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 5,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(0)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 600,
        },
    },
}));

export default function Appbar({ url, setUrl }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [inputValue, setInputValue] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (url) {
            setInputValue(url);
        }
    }, [url]);

    const handleSubmitOnEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearchButtonClick();
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchButtonClick = () => {
        setUrl('');
        navigate(`/${inputValue}`)
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <RateReview />
                </IconButton>
                <p>My</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1,  position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10 }}>
            <AppBar position="static" sx={{backgroundColor: '#051423'}}>
                    <Stack direction="row" sx={{p: 1.5}} alignItems="center" justifyContent="center" spacing={2}>
                            <Stack direction="row" alignContent={"start"}>
                                <LogoButton width={'45px'} variant={"soft"}/>
                            </Stack>
                            <Search>
                                <StyledInputBase
                                    placeholder="URL을 붙여넣으세요…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleSubmitOnEnter}
                                    startAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                                onClick={handleSearchButtonClick}
                                            >
                                                <SearchIcon sx={{color: 'white'}}/>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Search>
                            <Stack direction="row">
                                <NotificationSetting/>
                                <MyPageButton width={'45px'} variant={"plane"}/>
                            </Stack>
                    </Stack>
            </AppBar>
            {/*{renderMobileMenu}*/}
        </Box>
    );
}

