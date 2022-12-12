import React from 'react';

import { CircularProgress, Fab, SxProps } from '@mui/material';
import { MyTheme } from '../../../styles/global';

interface Props {
    onClickHandler: () => void;
    loadingUserLocation: boolean;
    sx?: SxProps;
}

export const MyLocationButton: React.FC<Props> = ({ onClickHandler, loadingUserLocation, sx }) => (
    <Fab
        onClick={onClickHandler}
        sx={{
            backgroundColor: `${MyTheme.colors.accent}`,
            color: 'white',
            '&:hover': {
                backgroundColor: `${MyTheme.colors.accent}`,
            },
            ...sx,
        }}
    >
        {!loadingUserLocation && <span className="material-symbols-outlined">my_location</span>}
        {loadingUserLocation && <CircularProgress color="inherit" size={25} />}
    </Fab>
);
