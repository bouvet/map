import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../styles/global';

const LoadingScreenWrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${MyTheme.colors.darkBase};
    color: ${MyTheme.colors.lightBase};
`;

export const Loading: FC = () => {
    const [loadingText, setLoadingText] = useState('Verden venter...');
    useEffect(() => {
        const loadingInterval = setInterval(() => {
            if (loadingText === 'Verden venter...') {
                setLoadingText('Verden venter');
            } else {
                setLoadingText(`${loadingText}.`);
            }
        }, 400);
        return () => clearInterval(loadingInterval);
    }, [loadingText]);
    return (
        <div className="App">
            <LoadingScreenWrapper>
                <h1>{loadingText}</h1>
            </LoadingScreenWrapper>
        </div>
    );
};
