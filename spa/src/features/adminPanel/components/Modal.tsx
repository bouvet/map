import React from 'react';
import { Button, CloseButton, FlexRowContainer, ModalContainer } from '../../../components/UI';
import { ILocation } from '../../../interfaces';
import { MyTheme } from '../../../styles/global';

interface Props {
    location: ILocation | null;
    closeModalHandler: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

export const Modal: React.FC<Props> = ({ location, closeModalHandler }) => (
    <ModalContainer closeModalHandler={closeModalHandler} center>
        <div style={{ position: 'relative' }}>
            <CloseButton onClick={closeModalHandler} sx={{ top: 0, left: 0 }} />
            <img
                src="https://raw.githubusercontent.com/bouvet/map/master/restapi/Requests/Assets/Lura-Skatepark-Review.png"
                alt=""
                style={{ width: '100%', borderRadius: '3px' }}
            />
            <h2 style={{ padding: '0.5rem 0' }}>{location?.properties.title}</h2>
            <p style={{ fontSize: '0.8rem', maxHeight: '10rem', overflow: 'scroll' }}>{location?.properties.description}</p>
            <p style={{ padding: '1.5rem 0', textAlign: 'center' }}>
                Status: <span style={{ color: `${MyTheme.colors.warning}`, fontWeight: '700' }}>Under Review</span>
            </p>
            <FlexRowContainer spacing="space-between" style={{ paddingBottom: '1rem' }}>
                <Button variant="contained" sx={{ width: '45%' }}>
                    Godkjenn
                </Button>
                <Button variant="contained" color="error" sx={{ width: '45%' }}>
                    Avslå
                </Button>
            </FlexRowContainer>
        </div>
    </ModalContainer>
);
