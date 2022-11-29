import React from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material/';

import { ILocation } from '../../../interfaces';
import { Button, FlexRowContainer, PillButton } from '../../../components/UI';
import { useLocationStatus } from '../../../hooks';

interface Props {
    location: ILocation;
    onClickHandler: (location: ILocation) => void;
}

export const LocationCard: React.FC<Props> = ({ location, onClickHandler }) => {
    const { status, color } = useLocationStatus(location.properties.status);

    return (
        <li style={{ marginBottom: '1rem' }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                        {location.properties.category[0].emoji} {location.properties.title}
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails sx={{ paddingTop: '1rem' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30%' }}>
                            {location?.properties.webpImage?.cdnUri && (
                                <img
                                    src={location?.properties.webpImage?.cdnUri}
                                    alt={location?.properties.title}
                                    style={{ width: '100%', borderRadius: '3px', objectFit: 'cover' }}
                                />
                            )}
                            {!location?.properties.webpImage?.cdnUri && (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '7rem',
                                        backgroundColor: 'lightgray',
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: '3px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Ingen bilde
                                </div>
                            )}
                        </div>
                        <div
                            style={{
                                width: '70%',
                                paddingLeft: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                            }}
                        >
                            <p style={{ fontWeight: 600 }}>{location.properties.title}</p>
                            <FlexRowContainer style={{ zIndex: '2', gap: '10px', padding: '5px 5px', overflowX: 'scroll' }}>
                                {location.properties.category.map((category) => (
                                    <PillButton key={category.id} style={{ fontSize: '0.8rem' }}>
                                        {category.emoji} {category.name}
                                    </PillButton>
                                ))}
                            </FlexRowContainer>
                            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: `${color}` }}>{status}</p>
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        sx={{ width: '100%', marginTop: '1rem', textTransform: 'none' }}
                        onClick={() => onClickHandler(location)}
                    >
                        Se mer
                    </Button>
                </AccordionDetails>
            </Accordion>
        </li>
    );
};
