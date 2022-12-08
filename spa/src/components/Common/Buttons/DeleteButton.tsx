import React from 'react';

import { CircularProgress } from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';
import { ButtonBase } from './ButtonBase';
import { MyTheme } from '../../../styles/global';

const DeleteButtonStyle = styled(ButtonBase)({
    color: `${MyTheme.colors.alert}`,
    ':hover': {
        backgroundColor: `${MyTheme.colors.alert}`,
        color: `${MyTheme.colors.lightBase}`,
    },
});

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    sx?: SxProps;
    loading?: boolean;
}

export const DeleteButton: React.FC<Props> = ({ children, sx, loading, disabled, type, onClick }) => (
    <DeleteButtonStyle sx={sx} disabled={disabled} type={type} onClick={onClick}>
        {!loading && children}
        {loading && <CircularProgress color="inherit" size={20} />}
    </DeleteButtonStyle>
);
