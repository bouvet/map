import { FC, MouseEvent } from 'react';
import MuiFab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { MyTheme } from '../../../styles/global';

interface ActionProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    sx?: {};
}

export const Fab = styled(MuiFab)(() => ({
    position: 'absolute',
    height: 50,
    width: 50,
    top: 10,
    left: 10,
    backgroundColor: `${MyTheme.colors.opaque}`,
    color: `${MyTheme.colors.lightBase}`,
    zIndex: 1000,
}));

export const BackButton: FC<ActionProps> = ({ onClick, sx }) => (
    <Fab sx={sx} onClick={onClick}>
        <ArrowBackIcon />
    </Fab>
);

export const CloseButton: FC<ActionProps> = ({ onClick, sx }) => (
    <Fab sx={sx} onClick={onClick}>
        <CloseIcon />
    </Fab>
);
