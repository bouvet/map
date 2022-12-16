import React from 'react';

import { Slide } from '@mui/material';
import styled from 'styled-components';
import { Popup } from '../../../components/Popup/Popup';
import { ILocation } from '../../../interfaces';
import { MyTheme } from '../../../styles/global';

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
export const PopupCard = styled.div`
    width: 92%;
    height: 150px;
    background-color: ${MyTheme.colors.lightBase};
    position: absolute;
    bottom: 10px;
    right: 4%;
    border-radius: 10px;
    z-index: 1000;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;
