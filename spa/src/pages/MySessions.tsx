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

const WorkoutSubHeader = styled.p`
    font-weight: 600;
`;

const SessionSubHeaders = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 0.5rem;
`;

export const MySessions: FC = () => {
    const newDate = new Date();
    const navigate = useNavigate();
    const dispatch = useStateDispatch();
    const { currentSessions } = useStateSelector((state) => state.session);

    useEffect(() => {
        dispatch(sessionServices.getAllSessions());
    }, [dispatch]);

    const HandleSessionBlockDelete = (deleteId: string) => {
        dispatch(sessionServices.deleteSession(deleteId));

        for (let i = 0; i < currentSessions.length; i += 1) {
            if (currentSessions[i].registered?.includes('november')) {
                <WorkoutSubHeader>{}</WorkoutSubHeader>;
            }
        }
    };

    // if (currentSessions.length > 0) {
    const sessionsSortedByDate = [...currentSessions].sort((a: any, b: any) => {
        if (a.registered < b.registered) {
            return 1;
        }
        return -1;
    });

    // }
    /*
    først sortere alle datoer fra session table sånn at de går fra eldste til nyeste registrerte datoer.
    Deretter kan man vider sortere datoer som er innenfor en spesifikk måned og år ved å hente ut måned og år
    fra hver eneste session item. 

    Forhåpentligvis kan man da lage dynamiske headere hvor alle session items plasseres under sortert.
    */

    return (
        <PageContainer>
            <BackButton onClick={() => navigate(-1)} />
            <SectionContainer>
                <WorkoutHeader style={{ fontWeight: 700, marginBottom: 25 }}>Dine treningsøkter</WorkoutHeader>

                <SessionSubHeaders>
                    <WorkoutSubHeader style={{ marginRight: 5 }}>{newDate.toDateString()}</WorkoutSubHeader>
                </SessionSubHeaders>
                {/* prøvde å sette session: ISession, men den klager på at properties ikke har typen ISession */}
                {sessionsSortedByDate.map((session: any) => (
                    <SessionBlock
                        key={session.id}
                        locationTitle={session.locationTitle}
                        registered={session.registered}
                        deleteBlock={() => HandleSessionBlockDelete(session.id)}
                    />
                ))}
            </SectionContainer>
        </PageContainer>
    );
};
