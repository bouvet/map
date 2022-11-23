import React from 'react';

import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../components/Navigation';

interface Props {
    pageIndex: number;
    setPageIndex: (pageIndex: number) => void;
}

export const AddLocationHeader: React.FC<Props> = ({ pageIndex, setPageIndex }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        if (pageIndex === 0) {
            navigate('..');
        }
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    };

    return (
        <Header>
            <IconButton
                color="inherit"
                aria-label="Navigate home"
                onClick={handleBackClick}
                sx={{
                    position: 'absolute',
                    alignItems: 'center',
                    display: {
                        xs: 'flex',
                        sm: 'none',
                    },
                }}
            >
                <ArrowBack sx={{ color: 'white' }} />
            </IconButton>
            <h1 style={{ fontSize: '1rem', fontWeight: '500', color: 'white', width: '100%', textAlign: 'center' }}>
                Legg til treningssted
            </h1>
        </Header>
    );
};
