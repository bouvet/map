import React from 'react';

import { Fab } from '@mui/material';

import { mapboxStreets, mapboxSatellite } from '../../../styles/map-styles';

import satellitt from '../assets/satellitt.jpg';
import streets from '../assets/streets.jpg';

interface Props {
    setMapStyleHandler: (mapStyle: string) => void;
    mapStyle: string;
    style?: React.CSSProperties;
}

export const MapStyleMenu: React.FC<Props> = ({ setMapStyleHandler, mapStyle, style }) => (
    <div
        style={{
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            ...style,
        }}
    >
        <Fab
            size="small"
            sx={{ marginBottom: '1rem', overflow: 'hidden' }}
            onClick={() => setMapStyleHandler(mapStyle === mapboxSatellite ? mapboxStreets : mapboxSatellite)}
        >
            {mapStyle === mapboxSatellite && <img src={streets} alt="" style={{ width: '100%', height: '100%' }} />}
            {mapStyle === mapboxStreets && <img src={satellitt} alt="" style={{ width: '100%', height: '100%' }} />}
        </Fab>
    </div>
);
