import { ExpandMore } from '@mui/icons-material/';
import DeleteIcon from '@mui/icons-material/Delete';
import { Accordion, AccordionDetails, AccordionSummary, Divider, IconButton, Typography } from '@mui/material';
import moment from 'moment';
import { FC, useState } from 'react';
import { Text } from '../../../components/Common';
import { Section } from '../../../components/Layout';
import { SessionBlockModal } from './SessionBlockModal';

interface SessionBlockProps {
    locationTitle: any;
    registered: any;
    deleteBlock: Function;
}

export const SessionBlock: FC<SessionBlockProps> = ({ locationTitle, registered, deleteBlock }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleModalOnClick = () => setModalIsOpen(!modalIsOpen);
    const DateRegistered = moment(registered.toString()).format('LL');
    const TimeRegistered = moment(registered.toString()).format('LT');

    return (
        <Section style={{ paddingTop: 0, paddingBottom: 0.5 }}>
            <ul style={{ width: '100%', marginBottom: '0.5rem' }}>
                <Accordion>
                    <AccordionSummary sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} expandIcon={<ExpandMore />}>
                        <Typography>
                            {locationTitle}
                            <Text style={{ fontStyle: 'italic', fontSize: '0.7em' }}>{DateRegistered}</Text>
                        </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography style={{ fontSize: '0.9em' }}>
                            Registrert klokken
                            <Text style={{ fontSize: '1em' }}>{TimeRegistered}</Text>
                        </Typography>
                        <IconButton onClick={handleModalOnClick} color="warning">
                            <DeleteIcon />
                        </IconButton>
                    </AccordionDetails>

                    <SessionBlockModal isOpen={modalIsOpen} handler={handleModalOnClick} deleteBlock={deleteBlock} />
                </Accordion>
            </ul>
        </Section>
    );
};
