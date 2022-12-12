import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Main } from '../components/Layout';
import { Progress, ProgressBarContainer, ProgressHeader } from '../components/Navigation';
import HowToAddLocation from '../features/onboarding/components/HowToAddLocation';
import HowToAddReview from '../features/onboarding/components/HowToAddReview';
import TipsAndTricks from '../features/onboarding/components/TipsAndTricks';

const Onboarding = () => {
    const [pageIndex, setPageIndex] = useState(1);

    const { pathname } = useLocation();

    useEffect(() => {
        switch (pathname) {
            case '/onboarding/tips-and-tricks':
                setPageIndex(1);
                break;
            case '/onboarding/add-location':
                setPageIndex(2);
                break;
            case '/onboarding/add-review':
                setPageIndex(3);
                break;
            default:
                setPageIndex(1);
                break;
        }
    }, [pathname]);

    return (
        <>
            <ProgressHeader>
                {pageIndex === 1 && 'Slik bruker du Verden Venter'}
                {pageIndex === 2 && 'Hvordan legge til lokasjon'}
                {pageIndex === 3 && 'Hvordan legge til omtale'}
            </ProgressHeader>

            <Main>
                <ProgressBarContainer elements={3}>
                    <Progress completed={pageIndex >= 1} icon="tips_and_updates" />
                    <Progress completed={pageIndex >= 2} icon="location_on" />
                    <Progress completed={pageIndex >= 3} icon="reviews" />
                </ProgressBarContainer>

                {pageIndex === 1 && <TipsAndTricks />}
                {pageIndex === 2 && <HowToAddLocation />}
                {pageIndex === 3 && <HowToAddReview />}
            </Main>
        </>
    );
};

export default Onboarding;
