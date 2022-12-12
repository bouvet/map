import React from 'react';

import { CircularProgress } from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';
import { MyTheme } from '../../../styles/global';
import { ButtonBase } from './ButtonBase';

const PrimaryButtonStyle = styled(ButtonBase)({
    backgroundColor: `${MyTheme.colors.accent}`,
    ':hover': {
        backgroundColor: '#0067a3',
    },
});

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    sx?: SxProps;
    loading?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ children, sx, loading, disabled, type, onClick }) => (
    <PrimaryButtonStyle sx={sx} disabled={disabled} type={type} onClick={onClick}>
        {!loading && children}
        {loading && <CircularProgress color="inherit" size={20} />}
    </PrimaryButtonStyle>
);
