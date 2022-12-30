import CloseIcon from '@mui/icons-material/Close';
import MuiFab from '@mui/material/Fab';
import { styled, SxProps } from '@mui/material/styles';
import React, { MouseEvent } from 'react';
import { MyTheme } from '../../../styles/global';

interface Props {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    sx?: SxProps;
}

export const Fab = styled(MuiFab)(() => ({
    height: 50,
    width: 50,
    backgroundColor: `${MyTheme.colors.opaque}`,
    color: `${MyTheme.colors.lightBase}`,
}));

export const CloseButton: React.FC<Props> = ({ onClick, sx }) => (
    <Fab sx={{ height: 40, width: 40, top: 10, left: 10, ...sx }} onClick={onClick}>
        <CloseIcon />
    </Fab>
);
