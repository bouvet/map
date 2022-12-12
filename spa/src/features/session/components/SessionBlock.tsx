import { ExpandMore } from '@mui/icons-material/';
import DeleteIcon from '@mui/icons-material/Delete';
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, IconButton } from '@mui/material';
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

export const SessionButton = styled(Button)`
    width: 100%;
    border-radius: 2.5px;
    border: solid #c4c4c4 1px;
    height: 40px;
    background-color: white;
    color: black;
    display: flex;
    justify-content: flex-start;
`;

const Title = styled.h1`
    padding: 10px;
    overflow: hidden;
`;

export const SessionBlock: FC<SessionBlockProps> = ({ locationTitle, registered, deleteBlock }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleModalOnClick = () => setModalIsOpen(!modalIsOpen);
    const DateRegistered = moment(registered.toString()).format('LL');

    return (
        <Accordion sx={{ marginBottom: '1rem' }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Title style={{ fontStyle: 'italic', color: 'grey' }}>{DateRegistered}</Title>
            </AccordionSummary>
            <Divider />
            <AccordionDetails sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>{locationTitle.toString()}</Text>
                <IconButton onClick={handleModalOnClick} color="warning">
                    <DeleteIcon />
                </IconButton>
            </AccordionDetails>

            <SessionBlockModal isOpen={modalIsOpen} handler={handleModalOnClick} deleteBlock={deleteBlock} />
        </Accordion>
    );
};
