import MuiFab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { FC, MouseEvent } from 'react';
import { MyTheme } from '../../../styles/global';

interface Props {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Fab = styled(MuiFab)(() => ({
    position: 'absolute',
    top: 10,
    left: 10,
    height: 50,
    width: 50,
    backgroundColor: `${MyTheme.colors.opaque}`,
    color: `${MyTheme.colors.lightBase}`,
}));

export const BackButton: FC<Props> = ({ onClick }) => (
    <Fab onClick={onClick}>
        <ArrowBackIcon />
    </Fab>
);

export const CloseButton: FC<Props> = ({ onClick }) => (
    <Fab onClick={onClick}>
        <CloseIcon />
    </Fab>
);
