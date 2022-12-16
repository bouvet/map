import React from 'react';

import { approvalServices } from '../services/approval.services';
import { ILocation, LocationStatus } from '../../../interfaces';
import { useStateDispatch, useLocationStatus } from '../../../hooks';

import { AcceptButton, DeleteButton, Modal, PillButton, PrimaryButton } from '../../../components/Common';
import { FlexRowContainer } from '../../../components/Layout';

interface Props {
    location: ILocation | null;
    closeModalHandler: (event?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
    removeLocationFromList: Function;
}

export const LocationModal: React.FC<Props> = ({ location, closeModalHandler, removeLocationFromList }) => {
    const dispatch = useStateDispatch();

    const { status, color } = useLocationStatus(location?.properties.status);

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
        <Modal closeModalHandler={closeModalHandler} title={location?.properties.title}>
            {location && (
                <div style={{ position: 'relative' }}>
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
                        Status: <span style={{ color: `${color}`, fontWeight: '700' }}>{status}</span>
                    </p>
                    <FlexRowContainer style={{ zIndex: '2', gap: '10px', padding: '5px', overflowX: 'scroll' }}>
                        {location?.properties.category.map((category) => (
                            <PillButton key={category.id}>
                                {category.emoji} {category.name}
                            </PillButton>
                        ))}
                    </FlexRowContainer>
                    <FlexRowContainer spacing="space-between" style={{ padding: '1.5rem 0' }}>
                        {status !== 'Godkjent' && status !== 'Avslått' && (
                            <AcceptButton sx={{ width: '45%' }} onClick={() => updateLocationHandler('Approved')}>
                                Godkjenn
                            </AcceptButton>
                        )}
                        {status === 'Godkjent' && (
                            <PrimaryButton
                                sx={{ width: '45%', backgroundColor: '#ffa726' }}
                                onClick={() => updateLocationHandler('Under Review')}
                            >
                                Behandle
                            </PrimaryButton>
                        )}
                        {status === 'Avslått' && (
                            <PrimaryButton
                                sx={{ width: '45%', backgroundColor: '#ffa726' }}
                                onClick={() => updateLocationHandler('Under Review')}
                            >
                                Behandle
                            </PrimaryButton>
                        )}
                        {status !== 'Avslått' && (
                            <DeleteButton sx={{ width: '45%' }} onClick={() => updateLocationHandler('Rejected')}>
                                Avslå
                            </DeleteButton>
                        )}
                        {status === 'Avslått' && (
                            <DeleteButton sx={{ width: '45%' }} onClick={deleteLocationHandler}>
                                Slett
                            </DeleteButton>
                        )}
                    </FlexRowContainer>
                </div>
            )}
        </Modal>
    );
};
