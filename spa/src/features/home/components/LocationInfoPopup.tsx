import React from 'react';

import { Slide } from '@mui/material';
import { Popup, PopupCard } from '../../../components/Popup/Popup';
import { ILocation } from '../../../interfaces';

interface Props {
    selectedLocation: ILocation;
}

export const LocationInfoPopup: React.FC<Props> = ({ selectedLocation }) => (
    <Slide direction="up" in={!!selectedLocation} mountOnEnter unmountOnExit>
        <PopupCard>
            <Popup location={selectedLocation} />
        </PopupCard>
    </Slide>
);
