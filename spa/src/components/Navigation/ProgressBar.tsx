import React from 'react';

import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

interface Props {
    elements: number;
}

export const ProgressBarContainer = styled.section<Props>`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(${(props) => props.elements}, 1fr);
    gap: 5px;
    padding: 0 0.5rem;
    padding-bottom: 0.5rem;
`;

interface ProgressProps {
    completed: boolean;
    icon: string;
}

export const Progress: React.FC<ProgressProps> = ({ completed, icon }) => (
    <Container>
        <ProgressIcon className="material-symbols-rounded" completed={completed}>
            {icon}
        </ProgressIcon>
        <ProgressStatusLine completed={completed} />
    </Container>
);

const Container = styled.div`
    padding: 0.8rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProgressIcon = styled.span<{ completed: boolean }>`
    color: ${(props) => (props.completed ? MyTheme.colors.darkBase : MyTheme.colors.gray)};
    font-weight: 400;
    margin-bottom: 0.5rem;
    transition: 500ms ease-in-out all;
`;

const ProgressStatusLine = styled.div<{ completed: boolean }>`
    width: 100%;
    height: 10px;
    background-color: ${(props) => (props.completed ? MyTheme.colors.accent : MyTheme.colors.gray)};
    transition: 500ms ease-in-out all;
`;
