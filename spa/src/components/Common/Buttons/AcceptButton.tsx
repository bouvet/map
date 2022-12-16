import React from 'react';

import { CircularProgress } from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';
import { MyTheme } from '../../../styles/global';
import { ButtonBase } from './ButtonBase';

const AcceptButtonStyle = styled(ButtonBase)({
    backgroundColor: `${MyTheme.colors.success}`,
    ':hover': {
        backgroundColor: `${MyTheme.colors.successLight}`,
    },
});

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    sx?: SxProps;
    loading?: boolean;
}

export const AcceptButton: React.FC<Props> = ({ children, sx, loading, disabled, type, onClick }) => (
    <AcceptButtonStyle sx={sx} disabled={disabled} type={type} onClick={onClick}>
        {!loading && children}
        {loading && <CircularProgress color="inherit" size={20} />}
    </AcceptButtonStyle>
);
