import React from 'react';

import { CircularProgress } from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';
import { ButtonBase } from './ButtonBase';
import { MyTheme } from '../../../styles/global';

const DeleteButtonStyle = styled(ButtonBase)({
    color: `${MyTheme.colors.lightBase}`,
    backgroundColor: `${MyTheme.colors.alert}`,
    ':hover': {
        backgroundColor: `${MyTheme.colors.alertLight}`,
        color: `${MyTheme.colors.lightBase}`,
    },
});

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    sx?: SxProps;
    loading?: boolean;
    asLink?: boolean;
}

export const DeleteButton: React.FC<Props> = ({ children, sx, loading, asLink, disabled, type, onClick }) => (
    <DeleteButtonStyle
        sx={asLink ? { backgroundColor: 'transparent', color: `${MyTheme.colors.alert}`, ...sx } : sx}
        disabled={disabled}
        type={type}
        onClick={onClick}
    >
        {!loading && children}
        {loading && <CircularProgress color="inherit" size={20} />}
    </DeleteButtonStyle>
);
