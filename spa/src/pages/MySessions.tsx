import moment from 'moment';
import { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Main } from '../components/Layout';
import { SessionBlock } from '../features/session/components/SessionBlock';
import { SessionHeader } from '../features/session/components/SessionHeader';
import { sessionServices } from '../features/session/services/session.services';

import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { ISession } from '../interfaces';

const SessionSubHeader = styled.p`
    font-weight: 600;
    display: flex;
    justify-content: center;
    padding: 0.5rem;
`;

const SessionPageContainer = styled.div`
    width: 100%;
    margin-bottom: 0.5rem;
`;

const SessionPageSubContainer = styled.div`
    width: 100%;
`;

moment.locale('nb');

export const MySessions: FC = () => {
    const dispatch = useStateDispatch();
    const { userSessions } = useStateSelector((state) => state.session);

    const HandleSessionBlockDelete = (deleteId: string) => {
        dispatch(sessionServices.deleteSession(deleteId));
    };

    const getISOFromSessions: Date[] = useMemo(() => [], []);
    const getMonthFromDates: number[] = useMemo(() => [], []);
    const getYearFromDates: number[] = useMemo(() => [], []);

    const sessionsSortedByDate: ISession[] = useMemo(
        () =>
            [...userSessions].sort((a: ISession, b: ISession) => {
                if (a.registered < b.registered) {
                    return 1;
                }
                if (a.registered > b.registered) {
                    return -1;
                }

                return 0;
            }),
        [userSessions],
    );
    useMemo(() => {
        sessionsSortedByDate.map((getDates: ISession) => getISOFromSessions.push(new Date(getDates.registered)));

        getISOFromSessions.map((singleDate: Date) => {
            if (getMonthFromDates.indexOf(singleDate.getMonth() + 1) === -1) {
                getMonthFromDates.push(singleDate.getMonth() + 1);
            }
            if (getYearFromDates.indexOf(singleDate.getFullYear()) === -1) {
                getYearFromDates.push(singleDate.getFullYear());
            }
            return singleDate;
        });
    }, [sessionsSortedByDate, getISOFromSessions, getMonthFromDates, getYearFromDates]);

    // get data from store
    useEffect(() => {
        dispatch(sessionServices.getAllSessions());
    }, [dispatch]);

    return (
        <Main>
            <SessionPageContainer style={{ backgroundColor: '#fafafa' }}>
                <SessionHeader />

                {getYearFromDates.map((year: number) => (
                    <SessionPageSubContainer key={Math.random() * 1000}>
                        <SessionSubHeader style={{ fontSize: 18 }} key={`${year} - ${new Date().getMilliseconds()}`}>
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
                    </SessionPageSubContainer>
                ))}
            </SessionPageContainer>
        </Main>
    );
};
