import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Main } from '../components/Layout';

import { Progress, ProgressBarContainer, ProgressHeader } from '../components/Navigation';

export const Register = () => {
    const [pageIndex, setPageIndex] = useState(1);

    const { pathname } = useLocation();

    useEffect(() => {
        switch (pathname) {
            case '/register/email':
                setPageIndex(1);
                break;
            case '/register/confirm-code':
                setPageIndex(2);
                break;
            case '/register/personal-info':
                setPageIndex(3);
                break;
            case '/register/password':
                setPageIndex(4);
                break;
            case '/register/personalization':
                setPageIndex(5);
                break;
            default:
                setPageIndex(1);
                break;
        }
    }, [pathname]);

    return (
        <>
            <ProgressHeader>
                {pageIndex === 1 && 'Registrer deg med epost'}
                {pageIndex === 2 && 'Bekreft kode fra epost'}
                {pageIndex === 3 && 'Personlig informasjon'}
                {pageIndex === 4 && 'Sett passord'}
                {pageIndex === 5 && 'Velg favoritter'}
            </ProgressHeader>
            <Main>
                <ProgressBarContainer elements={5}>
                    <Progress completed={pageIndex >= 1} icon="mail" />
                    <Progress completed={pageIndex >= 2} icon="pin" />
                    <Progress completed={pageIndex >= 3} icon="edit_note" />
                    <Progress completed={pageIndex >= 4} icon="password" />
                    <Progress completed={pageIndex >= 5} icon="category" />
                </ProgressBarContainer>

                <Outlet />
            </Main>
        </>
    );
};
