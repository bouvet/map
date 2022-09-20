import { FC } from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Loading: FC = () => (
    <LoadingWrapper>
        <h1>Laster opp...</h1>
    </LoadingWrapper>
);
