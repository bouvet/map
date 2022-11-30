import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BackButton, PageContainer, SectionContainer } from '../components/UI';
import { SessionBlock } from '../features/session/components/SessionBlock';
import { sessionServices } from '../features/session/services/session.services';

import { useStateDispatch, useStateSelector } from '../hooks/useRedux';

export const WorkoutHeader = styled.div`
    width: 100%;
    height: 2rem;
    padding: 1rem;
    text-align: center;
`;

const WorkoutSubHeader = styled.text`
    font-weight: 600;
`;

const SessionSubHeaders = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 0.5rem;
`;

export const RegisterWorkout: FC = () => {
    const newDate = new Date();
    const navigate = useNavigate();
    const dispatch = useStateDispatch();
    const { currentSessions } = useStateSelector((state) => state.session);
    const formatter = new Intl.DateTimeFormat('default', { month: 'long' });
    const month = formatter.format(new Date());

    const sessionIds: string[] = currentSessions.map((session) => session.id);

    useEffect(() => {
        dispatch(sessionServices.getAllSessions());
    }, [dispatch]);

    const HandleSessionBlockDelete = (deleteId: string) => {
        dispatch(sessionServices.deleteSession(deleteId));
    };

    // const sortedDate = workoutDate.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <>
            <PageContainer>
                <BackButton onClick={() => navigate(-1)} />
                <SectionContainer>
                    <WorkoutHeader style={{ fontWeight: 700, marginBottom: 25 }}>Dine treningsøkter</WorkoutHeader>

                    <SessionSubHeaders>
                        <WorkoutSubHeader style={{ marginRight: 5 }}>{newDate.toDateString()}</WorkoutSubHeader>
                        <WorkoutSubHeader>{newDate.getFullYear()}</WorkoutSubHeader>
                    </SessionSubHeaders>
                    {/* prøvde å sette session: ISession, men den klager på at properties ikke har typen ISession */}
                    {currentSessions.map((session: any) => (
                        <SessionBlock
                            key={session.id}
                            locationTitle={session.locationTitle}
                            registered={session.registered}
                            deleteBlock={() => HandleSessionBlockDelete(session.id)}
                        />
                    ))}
                </SectionContainer>
            </PageContainer>
        </>
    );
};
