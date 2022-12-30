import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';

const StyledSessionHeader = styled.header`
    width: 100%;
    height: 3rem;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${MyTheme.colors.accent};
`;

export const SessionHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('..');
    };

    return (
        <StyledSessionHeader style={{ marginBottom: '2rem' }}>
            <IconButton
                color="inherit"
                aria-label="Navigate home"
                onClick={handleBackClick}
                sx={{ position: 'absolute', alignItems: 'center' }}
            >
                <ArrowBack sx={{ color: 'white' }} />
            </IconButton>
            <h1 style={{ fontSize: '1rem', fontWeight: '500', color: 'white', width: '100%', textAlign: 'center' }}>Dine treningsøkter</h1>
        </StyledSessionHeader>
    );
};
