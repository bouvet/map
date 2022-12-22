import React from 'react';
import { styled, SxProps } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { MyTheme } from '../../../styles/global';
import { ButtonBase } from './ButtonBase';

export const SecondaryButtonStyle = styled(ButtonBase)({
    backgroundColor: `${MyTheme.colors.gray}`,
});

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    sx?: SxProps;
    loading?: boolean;
}

export const SecondaryButton: React.FC<Props> = ({ children, sx, loading, disabled, type, onClick }) => (
    <SecondaryButtonStyle sx={sx} disabled={disabled} type={type} onClick={onClick}>
        {!loading && children}
        {loading && <CircularProgress color="inherit" size={20} />}
    </SecondaryButtonStyle>
);
