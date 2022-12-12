import moment from 'moment';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SessionBlock } from '../features/session/components/SessionBlock';
import { sessionServices } from '../features/session/services/session.services';

import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { ISessionTypeGet } from '../utils/types.d';

export const SessionHeader = styled.div`
    width: 100%;
    height: 2rem;
    padding: 1rem;
    text-align: center;
`;

const SessionSubHeader = styled.p`
    font-weight: 600;
    display: flex;
    justify-content: center;
    padding: 1rem;
`;

const SessionPageContainer = styled.div`
    width: 100%;
    margin-bottom: 0.5rem;
`;

export const MySessions: FC = () => {
    const navigate = useNavigate();
    const dispatch = useStateDispatch();
    const { currentSessions } = useStateSelector((state) => state.session);

    moment.locale('nb');

    useEffect(() => {
        dispatch(sessionServices.getAllSessions());
    }, [dispatch]);

    const HandleSessionBlockDelete = (deleteId: string) => {
        dispatch(sessionServices.deleteSession(deleteId));
    };

    // if (currentSessions.length > 0) {
    const sessionsSortedByDate: ISessionTypeGet[] = [...currentSessions].sort((a: any, b: any) => {
        if (a.registered < b.registered) {
            return 1;
        }
        return -1;
    });

    const getISOFromSessions: any = [];
    sessionsSortedByDate.map((getDates: any) => getISOFromSessions.push(new Date(getDates.registered)));

    const getMonthFromDates: any = [];
    const getYearFromDates: any = [];

    getISOFromSessions.map((singleDate: Date) => {
        if (getMonthFromDates.indexOf(singleDate.getMonth() + 1) === -1) {
            getMonthFromDates.push(singleDate.getMonth() + 1);
        }
        if (getYearFromDates.indexOf(singleDate.getFullYear()) === -1) {
            getYearFromDates.push(singleDate.getFullYear());
        }
        return singleDate;
    });

    return (
        <SessionPageContainer style={{ backgroundColor: '#fafafa' }}>
            {/* <BackButton onClick={() => navigate('/')} /> */}
            <SessionPageContainer>
                <SessionHeader style={{ fontWeight: 700, marginBottom: 25 }}>Dine treningsøkter</SessionHeader>
                {getYearFromDates.map((year: number) => (
                    <SessionPageContainer key={Math.round(Math.random() * 1000)}>
                        <SessionSubHeader key={`${year} - ${new Date().getMilliseconds()}`}>
                            {moment(year.toString()).format('YYYY')}
                        </SessionSubHeader>

                        {getMonthFromDates.map((month: number) =>
                            getISOFromSessions.some(
                                (sessionDate: Date) => sessionDate.getMonth() + 1 === month && sessionDate.getFullYear() === year,
                            ) ? (
                                <>
                                    <SessionSubHeader key={`${month} - ${new Date().getMilliseconds()}`}>
                                        {moment(month.toString()).format('MMMM')}
                                    </SessionSubHeader>

                                    {sessionsSortedByDate.map((session: any) =>
                                        getISOFromSessions.some(
                                            (sessionDate: Date) =>
                                                sessionDate.toISOString() === new Date(session.registered).toISOString() &&
                                                sessionDate.getMonth() + 1 === month &&
                                                sessionDate.getFullYear() === year,
                                        ) ? (
                                            <SessionBlock
                                                key={session.id}
                                                locationTitle={session.locationTitle}
                                                registered={session.registered}
                                                deleteBlock={() => HandleSessionBlockDelete(session.id)}
                                            />
                                        ) : null,
                                    )}
                                </>
                            ) : null,
                        )}
                    </SessionPageContainer>
                ))}
                ;
            </SessionPageContainer>
        </SessionPageContainer>
    );
};
