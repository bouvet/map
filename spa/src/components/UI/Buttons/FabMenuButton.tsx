import React from 'react';

import { Fab, SxProps } from '@mui/material';
import { MyTheme } from '../../../styles/global';

interface Props {
    showMenu: boolean;
    showMenuToggler: () => void;
    sx?: SxProps;
}

export const FabMenuButton: React.FC<Props> = ({ showMenu, showMenuToggler, sx }) => (
    <Fab
        onClick={showMenuToggler}
        sx={{
            backgroundColor: `${MyTheme.colors.accent}`,
            color: 'white',
            '&:hover': {
                backgroundColor: `${MyTheme.colors.accent}`,
            },
            ...sx,
        }}
    >
        <span className="material-symbols-outlined">{showMenu ? 'close' : 'menu'}</span>
    </Fab>
);
