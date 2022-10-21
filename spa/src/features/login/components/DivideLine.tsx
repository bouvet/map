import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Line = styled.hr`
    background-color: #b8b8b8;
    width: 80%;
    height: 2px;
    border: none;
    position: absolute;
`;

const TextWrapper = styled.span`
    padding: 10px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const Text = styled.p`
    color: #787878;
    margin: 0px;
    padding: 0px;
`;

export const DivideLine: FC = () => (
    <Wrapper>
        <Line />
        <TextWrapper>
            <Text>Eller logg inn med E-post</Text>
        </TextWrapper>
    </Wrapper>
);
