import React, { createContext, useContext, useState, useCallback } from 'react';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {IconButton, Snackbar} from "@mui/joy";
import Typography from "@mui/joy/Typography";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('neutral');

    const showSnackbar = useCallback((msg, color = 'neutral') => {
        setMessage(msg);
        setColor(color);
        setSnackbarOpen(true);
    }, []);

    const handleMessageClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={5000}
                open={snackbarOpen}
                color={color}
                variant={'outlined'}
                size="lg"
                onClose={handleMessageClose}
                startDecorator={<ErrorOutlineRoundedIcon />}
                endDecorator={
                    <IconButton color="neutral" onClick={handleMessageClose}>
                        <CloseRoundedIcon />
                    </IconButton>
                }
            >
                <Typography color="neutral" level="title-md">{message}</Typography>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    return useContext(SnackbarContext);
};
