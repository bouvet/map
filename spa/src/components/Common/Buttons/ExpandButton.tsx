import { SxProps } from '@mui/material';
import React, { MouseEvent } from 'react';
import { Fab } from './CloseButton';

interface Props {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    sx?: SxProps;
}
const ExpandIcon: React.FC = () => <span className="material-symbols-outlined">open_in_full</span>;

export const ExpandButton: React.FC<Props> = ({ onClick, sx }) => (
    <Fab sx={{ position: 'absolute', height: 40, width: 40, top: 10, right: 10, ...sx }} onClick={onClick}>
        <ExpandIcon />
    </Fab>
);
