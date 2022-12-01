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
            default:
                setPageIndex(1);
                break;
        }
    }, [pathname]);

    return (
        <>
            <ProgressHeader pageIndex={pageIndex} setPageIndex={setPageIndex}>
                {pageIndex === 1 && 'Registrer deg med epost'}
                {pageIndex === 2 && 'Bekreft kode fra epost'}
            </ProgressHeader>
            <Main>
                <ProgressBarContainer elements={4}>
                    <Progress completed={pageIndex >= 1} icon="mail" />
                    <Progress completed={pageIndex >= 2} icon="pin" />
                    <Progress completed={false} icon="add_photo_alternate" />
                    <Progress completed={false} icon="add_photo_alternate" />
                </ProgressBarContainer>

                <Outlet />
            </Main>
        </>
    );
};
