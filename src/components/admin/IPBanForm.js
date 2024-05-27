import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import {useAuth} from "../../security/AuthProvider";
import {useSnackbar} from "../../contexts/SnackbarProvider";

const IPBanForm = () => {
    const { axiosInstance } = useAuth();
    const { showSnackbar } = useSnackbar();
    const [ipAddress, setIpAddress] = useState('');
    const [bannedIps, setBannedIps] = useState([]);

    const handleBanIp = async () => {
        try {
            await axiosInstance.post('/api/admin/ban-ip', { ipAddress });
            showSnackbar('IP 주소가 차단되었습니다.', 'primary');
            setIpAddress('');
            fetchBannedIps();
        } catch (error) {
            showSnackbar('IP 주소 차단에 실패했습니다. ' + error.message, 'danger');
        }
    };

    const fetchBannedIps = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/banned-ips');
            setBannedIps(response.data);
        } catch (error) {
            showSnackbar('차단된 IP 주소를 불러오는 데 실패했습니다. ' + error.message, 'danger');
        }
    };

    const handleUnbanIp = async (ip) => {
        try {
            await axiosInstance.post('/api/admin/unban-ip', { ipAddress: ip });
            showSnackbar('IP 주소 차단이 해제되었습니다.', 'primary');
            fetchBannedIps();
        } catch (error) {
            showSnackbar('IP 주소 차단 해제에 실패했습니다. ' + error.message, 'danger');
        }
    };

    useEffect(() => {
        fetchBannedIps();
    }, []);

    return (
        <Box>
            <TextField
                label="IP 주소"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
            />
            <Button onClick={handleBanIp}>차단</Button>
            <List>
                {bannedIps.map((ipBan) => (
                    <ListItem key={ipBan.id}>
                        <ListItemText primary={ipBan.ipAddress} secondary={`차단 해제 날짜: ${ipBan.bannedUntil}`} />
                        <Button onClick={() => handleUnbanIp(ipBan.ipAddress)}>차단 해제</Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default IPBanForm;
