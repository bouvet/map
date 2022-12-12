import React from 'react';

import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MyTheme } from '../../styles/global';

interface Props {
    children?: React.ReactNode;
}

export const ProgressHeader: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <header
            style={{
                width: '100%',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                padding: '0 0.5rem',
                backgroundColor: `${MyTheme.colors.accent}`,
            }}
        >
            <IconButton
                color="inherit"
                aria-label="Navigate home"
                onClick={() => navigate(-1)}
                sx={{
                    position: 'absolute',
                    alignItems: 'center',
                }}
            >
                <ArrowBack sx={{ color: 'white' }} />
            </IconButton>
            <h1 style={{ fontSize: '1rem', fontWeight: '500', color: 'white', width: '100%', textAlign: 'center' }}>{children}</h1>
        </header>
    );
};
