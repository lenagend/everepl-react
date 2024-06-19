import * as React from "react";
import MenuItem from "@mui/joy/MenuItem";
import {useAuth} from "../../security/AuthProvider";
import {useSnackbar} from "../../contexts/SnackbarProvider";
import Button from "@mui/joy/Button";
import {useLocation, useNavigate} from "react-router-dom";

export default function ReportButton({ targetId, targetType }) {
    const { isAuthenticated, axiosInstance } = useAuth();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const location = useLocation();

    const handleReport = async (reason) => {

        if (!isAuthenticated) {
            navigate('/signin', { state: { from: location.pathname } });
            return;
        }

        try {
            const response = await axiosInstance.post('/reports', {
                target: {
                    targetId: targetId,
                    type: targetType
                },
                reason
            });
            showSnackbar('신고가 접수되었습니다.', 'primary');
        } catch (error) {
            showSnackbar('신고 접수에 실패했습니다. ' + (error.response ? error.response.data.message : error.message), 'danger');
        }
    };

    if (targetType === 'URLINFO') {
        return <Button onClick={() => handleReport('INAPPROPRIATE_URL')}>신고</Button>;
    }

    if (targetType === 'COMMENT') {
        return (
                <MenuItem onClick={() => handleReport('INAPPROPRIATE_COMMENT')}>
                    댓글신고
                </MenuItem>
        );
    }

    if (targetType === 'USER') {
        return (
            <MenuItem onClick={() => handleReport('INAPPROPRIATE_PROFILE_PICTURE')}>
                프로필신고
            </MenuItem>
        );
    }

    return null;
}
