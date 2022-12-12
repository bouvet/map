import moment from 'moment';
import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Main } from '../components/Layout';
import { SessionBlock } from '../features/session/components/SessionBlock';
import { SessionHeader } from '../features/session/components/SessionHeader';
import { sessionServices } from '../features/session/services/session.services';

import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { ISessionTypeGet } from '../utils/types.d';

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

export const MySessions: FC = () => {
    const dispatch = useStateDispatch();
    const { userSessions } = useStateSelector((state) => state.session);

    moment.locale('nb');

    useEffect(() => {
        dispatch(sessionServices.getAllSessions());
    }, [dispatch]);

    const HandleSessionBlockDelete = (deleteId: string) => {
        dispatch(sessionServices.deleteSession(deleteId));
    };

    const sessionsSortedByDate: ISessionTypeGet[] = [...userSessions].sort((a: any, b: any) => {
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
        <Main>
            <SessionPageContainer style={{ backgroundColor: '#fafafa' }}>
                <SessionHeader />

                {getYearFromDates.map((year: number) => (
                    <SessionPageSubContainer key={Math.round(Math.random() * 1000)}>
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
