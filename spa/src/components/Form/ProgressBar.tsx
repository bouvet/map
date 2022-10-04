import { FC } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

interface ProgessCompletionProp {
    completed: boolean;
}

export const ProgressWrapper = styled.div`
    padding: 25px;
`;

export const ProgressBarWrapper = styled.div`
    width: 90%;
    height: 70px;
    margin: 40px 5% 0px 5%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 5px;
`;

const ProgressElementWrapper = styled.div`
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProgressStatusLine = styled.div<ProgessCompletionProp>`
    width: 100%;
    height: 5px;
    background-color: ${(props) => (props.completed ? MyTheme.colors.accent : MyTheme.colors.grey)};
    position: absolute;
    bottom: 0px;
`;

interface ProgessProps {
    completed: boolean;
}

export const ProgressElement: FC<ProgessProps> = ({ completed }) => (
    <ProgressElementWrapper>
        <ProgressStatusLine completed={completed} />
    </ProgressElementWrapper>
);

interface ProgressBarProps {
    pageIndex: number;
}

export const ProgressBarForm: FC<ProgressBarProps> = ({ pageIndex }) => (
    <ProgressBarWrapper>
        <ProgressElement completed={pageIndex >= 0} />
        <ProgressElement completed={pageIndex >= 1} />
        <ProgressElement completed={pageIndex >= 2} />
        <ProgressElement completed={pageIndex >= 3} />
    </ProgressBarWrapper>
);

// ONBOARDING

export const ProgressBarWrapperOnboarding = styled.div`
    width: 90%;
    height: 70px;
    margin: 40px 5% 0px 5%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
    margin-bottom: 25px;
`;

export const ProgressBarOnboarding: FC<ProgressBarProps> = ({ pageIndex }) => (
    <ProgressBarWrapperOnboarding>
        <ProgressElement completed={pageIndex >= 0} />
        <ProgressElement completed={pageIndex >= 1} />
        <ProgressElement completed={pageIndex >= 2} />
    </ProgressBarWrapperOnboarding>
);
