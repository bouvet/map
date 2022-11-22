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
        <Header style={{ padding: '0 1rem' }}>
            <IconButton
                color="inherit"
                aria-label="Navigate home"
                onClick={() => navigate('..')}
                sx={{
                    mr: 'auto',
                    alignItems: 'center',
                    display: {
                        xs: 'flex',
                        sm: 'none',
                    },
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
                    display: {
                        xs: 'flex',
                        sm: 'none',
                    },
                }}
            >
                <Menu sx={{ color: 'white' }} />
            </IconButton>
        </Header>
    );
};
