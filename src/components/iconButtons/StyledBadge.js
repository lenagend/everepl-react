import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 25,
        padding: '0 4px',
        fontWeight: 'bold'
    },
}));

export default StyledBadge;