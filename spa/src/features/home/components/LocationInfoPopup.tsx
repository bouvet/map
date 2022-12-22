import React, { useEffect, useState } from 'react';

import { Slide } from '@mui/material';

import styled from 'styled-components';
import { Popup } from '../../../components/Popup/Popup';
import { useStateDispatch } from '../../../hooks';
import { ILocation } from '../../../interfaces';
import { uiActions } from '../../../store';
import { MyTheme } from '../../../styles/global';

interface Props {
    selectedLocation: ILocation;
    onMarkerSelectHandler: Function;
}

export const LocationInfoPopup: React.FC<Props> = ({ selectedLocation, onMarkerSelectHandler }) => {
    const [openPopup, setOpenPopup] = useState(false);

    const dispatch = useStateDispatch();

    useEffect(() => {
        if (selectedLocation) {
            setOpenPopup(true);
        }
    }, [selectedLocation]);

    const popupHandler = () => {
        if (openPopup) {
            setOpenPopup(false);
        }
    };

    const popupEndHandler = () => {
        dispatch(uiActions.setShowLocationPopup(false));
        onMarkerSelectHandler(selectedLocation);
    };

    return (
        <Slide direction="up" in={openPopup} onExited={popupEndHandler} mountOnEnter unmountOnExit>
            <PopupCard>
                <Popup location={selectedLocation} popupHandler={popupHandler} />
            </PopupCard>
        </Slide>
    );
};
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
