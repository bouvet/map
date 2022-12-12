import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ArrowBack } from '@mui/icons-material';

import { IconButton } from '@mui/material';
import { Header } from '../../../components/Navigation';

interface Props {
    toggleDrawerHandler: () => void;
}

export const AdminHeader: React.FC<Props> = ({ toggleDrawerHandler }) => {
    const navigate = useNavigate();

    return (
        <Header>
            <IconButton
                color="inherit"
                aria-label="Navigate back"
                onClick={() => navigate(-1)}
                sx={{
                    mr: 'auto',
                    alignItems: 'center',
                }}
            >
                <ArrowBack sx={{ color: 'white' }} />
            </IconButton>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawerHandler}
                sx={{
                    ml: 'auto',
                    alignItems: 'center',
                }}
            >
                <Menu sx={{ color: 'white' }} />
            </IconButton>
        </Header>
    );
};
