import {Box, Container, Typography} from "@mui/joy";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import LoginCard from "../components/login/LoginCard";
import LogoButton from "../components/iconButtons/LogoButton";
import IPBanForm from "../components/admin/IPBanForm";

const AdminPage = () => {
    return(
        <Box>
            <Typography level={'h1'}>관리자 페이지</Typography>
            <IPBanForm />
        </Box>
    )
}

export default AdminPage;