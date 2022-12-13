import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { DeleteButton } from '../components/Common';
import { Main, Section } from '../components/Layout';
import { Header } from '../components/Navigation';

import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { userServices } from '../services';
import { monthIndexToString } from '../utils';

const Sessions = () => {
    const [months, setMonths] = useState<number[]>([]);

    const { sessions } = useStateSelector((state) => state.user);

    const dispatch = useStateDispatch();

    useEffect(() => {
        dispatch(userServices.loadSessions());
    }, [dispatch]);

    useEffect(() => {
        if (sessions.length > 0) {
            const months = sessions.map((session) => new Date(session.registered).getMonth());
            const filtered = new Set(months.sort((a, b) => b - a));
            setMonths(Array.from(filtered));
        }
    }, [sessions]);

    return (
        <>
            <Header>Dine treningsøkter</Header>
            <Main>
                <Section>
                    {months.map((index) => (
                        <>
                            <p style={{ margin: '1rem 0', fontWeight: 700 }}>{monthIndexToString(index)}</p>
                            <ul key={index}>
                                {sessions
                                    .filter((session) => new Date(session.registered).getMonth() === index)
                                    .map((session) => (
                                        <li key={session.id}>
                                            <Accordion sx={{ margin: '1rem 0' }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMore />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                                        {session.locationTitle}
                                                        <Moment style={{ fontSize: '0.7em', marginRight: '0.5rem' }}>
                                                            {session.registered}
                                                        </Moment>
                                                    </Typography>
                                                </AccordionSummary>
                                                <Divider />
                                                <AccordionDetails>
                                                    <div>
                                                        <Moment>{session.registered}</Moment>
                                                    </div>
                                                    <DeleteButton sx={{ margin: '1rem 0' }}>Slett økt</DeleteButton>
                                                </AccordionDetails>
                                            </Accordion>
                                        </li>
                                    ))}
                            </ul>
                        </>
                    ))}
                </Section>
            </Main>
        </>
    );
};

export default Sessions;
