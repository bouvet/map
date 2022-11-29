import React from 'react';

import { Slide } from '@mui/material';
import { ILocation } from '../../../interfaces';
import { Popup, PopupCard } from '../../../components/Popup/Popup';

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
