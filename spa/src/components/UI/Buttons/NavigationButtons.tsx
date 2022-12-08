import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import MuiFab from '@mui/material/Fab';
import { styled, SxProps } from '@mui/material/styles';
import { FC, MouseEvent } from 'react';
import { MyTheme } from '../../../styles/global';

interface ActionProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    sx?: SxProps;
}

export const Fab = styled(MuiFab)(() => ({
    position: 'absolute',
    height: 35,
    width: 35,
    backgroundColor: `${MyTheme.colors.opaque}`,
    color: `${MyTheme.colors.lightBase}`,
    zIndex: 1000,
}));

export const BackButton: FC<ActionProps> = ({ onClick, sx }) => (
    <Fab sx={{ top: 10, left: 10, ...sx }} onClick={onClick}>
        <ArrowBackIcon />
    </Fab>
);

export const CloseButton: FC<ActionProps> = ({ onClick, sx }) => (
    <Fab sx={{ top: 10, left: 10, ...sx }} onClick={onClick}>
        <CloseIcon />
    </Fab>
);
