import React from 'react';
import styled from 'styled-components';

import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { MyTheme } from '../../styles/global';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { uiActions } from '../../store';

interface Props {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const StyledHeader = styled.header`
    width: 100%;
    height: 3rem;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${MyTheme.colors.accent};
`;

export const Header: React.FC<Props> = ({ children, style }) => {
    const { showSidebar } = useStateSelector((state) => state.ui);

    const navigate = useNavigate();
    const dispatch = useStateDispatch();

    return (
        <StyledHeader style={style}>
            <IconButton
                color="inherit"
                aria-label="Navigate back"
                onClick={() => navigate(-1)}
                sx={{
                    alignItems: 'center',
                }}
            >
                <ArrowBack sx={{ color: 'white' }} />
            </IconButton>
            <h1
                style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: 'white',
                }}
            >
                {children}
            </h1>

            <IconButton
                color="inherit"
                aria-label="toggle drawer"
                onClick={() => dispatch(uiActions.setShowSidebar(!showSidebar))}
                sx={{
                    alignItems: 'center',
                    zIndex: 1300,
                }}
            >
                <span style={{ color: 'white' }} className="material-symbols-outlined">
                    {showSidebar ? 'close' : 'menu'}
                </span>
            </IconButton>
        </StyledHeader>
    );
};
