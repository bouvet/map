import React from 'react';

import { MyTheme } from '../../../styles/global';

import { useStateDispatch } from '../../../hooks/useRedux';
import { approvalServices } from '../services/approval.services';
import { ILocation, LocationStatus } from '../../../interfaces';

import { Button, CloseButton, FlexRowContainer, ModalContainer, PillButton } from '../../../components/UI';

interface Props {
    location: ILocation | null;
    closeModalHandler: (event?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
    removeLocationFromList: Function;
}

export const Modal: React.FC<Props> = ({ location, closeModalHandler, removeLocationFromList }) => {
    const dispatch = useStateDispatch();

    let statusColor: string;
    let statusText: string = 'Under Behandling';

    const status = location?.properties.status;

    switch (status) {
        case 'Approved':
            statusColor = `${MyTheme.colors.success}`;
            statusText = 'Godkjent';
            break;
        case 'Rejected':
            statusColor = `${MyTheme.colors.alert}`;
            statusText = 'Avslått';
            break;
        case 'Reported':
            statusColor = `${MyTheme.colors.alert}`;
            statusText = 'Rapportert';
            break;
        case 'Under Review':
            statusColor = `${MyTheme.colors.warning}`;
            statusText = 'Under Behandling';
            break;
        default:
            statusColor = `${MyTheme.colors.alert}`;
    }

    const updateLocationHandler = (status: LocationStatus) => {
        if (location?.id) {
            dispatch(approvalServices.updateLocationStatus(status, location?.id));
            removeLocationFromList(location.id);
            closeModalHandler();
        }
    };

    const deleteLocationHandler = () => {
        if (location?.id) {
            dispatch(approvalServices.deleteLocation(location?.id));
            removeLocationFromList(location.id);
            closeModalHandler();
        }
    };

    return (
        <ModalContainer closeModalHandler={closeModalHandler}>
            {location && (
                <div style={{ position: 'relative' }}>
                    <CloseButton onClick={closeModalHandler} sx={{ top: 0, left: 0 }} />
                    {location?.properties.webpImage?.cdnUri && (
                        <img
                            src={location?.properties.webpImage?.cdnUri}
                            alt={location?.properties.title}
                            style={{ width: '100%', borderRadius: '3px', objectFit: 'cover', maxHeight: '30vh' }}
                        />
                    )}
                    {!location?.properties.webpImage?.cdnUri && (
                        <div
                            style={{
                                height: '9rem',
                                backgroundColor: 'lightgray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '3px',
                            }}
                        >
                            Bruker har ikke valgt et bilde
                        </div>
                    )}
                    <h2 style={{ padding: '0.5rem 0' }}>{location?.properties.title}</h2>
                    <p style={{ fontSize: '0.8rem', maxHeight: '10rem', overflow: 'scroll' }}>{location?.properties.description}</p>
                    <p style={{ padding: '1.5rem 0' }}>
                        Status: <span style={{ color: `${statusColor}`, fontWeight: '700' }}>{statusText}</span>
                    </p>
                    <FlexRowContainer style={{ zIndex: '2', gap: '10px', padding: '5px', overflowX: 'scroll' }}>
                        {location?.properties.category.map((category) => (
                            <PillButton key={category.id}>
                                {category.emoji} {category.name}
                            </PillButton>
                        ))}
                    </FlexRowContainer>
                    <FlexRowContainer spacing="space-between" style={{ padding: '1.5rem 0' }}>
                        {status !== 'Approved' && status !== 'Rejected' && (
                            <Button variant="contained" sx={{ width: '45%' }} onClick={() => updateLocationHandler('Approved')}>
                                Godkjenn
                            </Button>
                        )}
                        {status === 'Approved' && (
                            <Button
                                variant="contained"
                                color="warning"
                                sx={{ width: '45%' }}
                                onClick={() => updateLocationHandler('Under Review')}
                            >
                                Behandle
                            </Button>
                        )}
                        {status === 'Rejected' && (
                            <Button
                                variant="contained"
                                color="warning"
                                sx={{ width: '45%' }}
                                onClick={() => updateLocationHandler('Under Review')}
                            >
                                Behandle
                            </Button>
                        )}
                        {status !== 'Rejected' && (
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ width: '45%' }}
                                onClick={() => updateLocationHandler('Rejected')}
                            >
                                Avslå
                            </Button>
                        )}
                        {status === 'Rejected' && (
                            <Button variant="contained" color="error" sx={{ width: '45%' }} onClick={deleteLocationHandler}>
                                Slett
                            </Button>
                        )}
                    </FlexRowContainer>
                </div>
            )}
        </ModalContainer>
    );
};
