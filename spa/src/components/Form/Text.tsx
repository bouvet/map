import { FC } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

export const Text = styled.p`
    color: ${MyTheme.colors.darkbase};
    font-size: ${MyTheme.fontSize.header};
    padding: 0px;
    margin: 0px;
`;

export const LinkText = styled.a`
    color: ${MyTheme.colors.accent};
    font-size: ${MyTheme.fontSize.header};
    text-decoration: none;
    padding: 0px;
    margin: 0px;
`;

export const LinkTextCenter = styled(LinkText)`
    text-align: center;
`;

export const LinkTextOnboarding = styled(LinkText)`
    padding: 5px;
    float: left;
`;

export const Title = styled.h1`
    color: ${MyTheme.colors.darkbase};
    font-size: ${MyTheme.fontSize.largeIcon};
    padding: 0px;
    margin: 0px;
    text-align: left;
`;

export const TitleForm = styled.h1`
    color: ${MyTheme.colors.darkbase};
    font-size: ${MyTheme.fontSize.largeIcon};
    position: absolute;
    width: 200px;
    height: 25px;
    left: 58px;
    top: 58px;
`;

// move + change name
interface ProgessCompletionProp {
    completed: boolean;
}

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
// const ProgressStatusLineOnboarding = styled.div<ProgessCompletionProp>`
//     width: 100%;
//     height: 5px;
//     background-color: ${(props) => (props.completed ? MyTheme.colors.accent : MyTheme.colors.grey)};
//     position: absolute;
//     bottom: 0px;
//     left: 50%;
// `;

// export const ProgressElementOnboarding: FC<ProgessProps> = ({ completed }) => (
//     <ProgressElementWrapper>
//         <ProgressStatusLineOnboarding completed={completed} />
//     </ProgressElementWrapper>
// );

export const ProgressBarOnboarding: FC<ProgressBarProps> = ({ pageIndex }) => (
    <ProgressBarWrapper>
        <ProgressElement completed={pageIndex >= 0} />
        <ProgressElement completed={pageIndex >= 1} />
        <ProgressElement completed={pageIndex >= 2} />
    </ProgressBarWrapper>
);
