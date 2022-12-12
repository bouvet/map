import { ExpandMore } from '@mui/icons-material/';
import DeleteIcon from '@mui/icons-material/Delete';
import { Accordion, AccordionDetails, AccordionSummary, Divider, IconButton } from '@mui/material';
import moment from 'moment';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Common';
import { SessionBlockModal } from './SessionBlockModal';

interface SessionBlockProps {
    locationTitle: any;
    registered: any;
    deleteBlock: Function;
}

const Title = styled.h1`
    // padding: 10px;
    overflow: hidden;
`;

export const SessionBlock: FC<SessionBlockProps> = ({ locationTitle, registered, deleteBlock }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleModalOnClick = () => setModalIsOpen(!modalIsOpen);
    const DateRegistered = moment(registered.toString()).format('LL');

    return (
        <Section style={{ paddingTop: 0, paddingBottom: 0.5, overflow: 'scroll' }}>
            <ul style={{ width: '100%', marginBottom: '0.5rem' }}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Title style={{ fontStyle: 'italic' }}>{DateRegistered}</Title>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{locationTitle}</Text>
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
