import { FC } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';

const Wrapper = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 2rem;
    margin-top: 1rem;
`;

const Line = styled.hr`
    background-color: ${MyTheme.colors.gray};
    width: 100%;
    height: 2px;
    border: none;
    position: absolute;
    top: 50%;
`;

const TextWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Text = styled.p`
    background-color: white;
    color: #787878;
    padding: 0 10px;
    z-index: 1;
`;

export const DivideLine: FC = () => (
    <Wrapper>
        <Line />
        <TextWrapper>
            <Text>Eller logg inn med e-post</Text>
        </TextWrapper>
    </Wrapper>
);
