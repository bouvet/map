import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BackButton, GoogleIcon } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';
import { ButtonStyleDiv } from './Location';

interface ProgessCompletionProp {
    completed: boolean;
}

export const BackButtonRegistrationWrapper = styled(BackButton)`
    position: fixed;
    top: 10px;
    left: 10px;
`;

export const BackButtonRegistration: FC = () => (
    <BackButtonRegistrationWrapper backgroundColor={MyTheme.colors.opaque}>
        <Link to="/">
            <GoogleIcon color={MyTheme.colors.lightBase} className="material-symbols-outlined">
                arrow_back
            </GoogleIcon>
        </Link>
    </BackButtonRegistrationWrapper>
);

export const RegistrationHeader = styled.div`
    width: 100%;
    height: 170px;
    padding-top: 30px;
`;

export const RegistrationContentWrapper = styled.div`
    height: calc(100% - 200px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const PageHeader = styled.h1`
    font-size: ${MyTheme.fontSize.header};
    text-align: center;
    font-weight: normal;
`;

export const ProgressBarWrapper = styled.div`
    width: 90%;
    height: 70px;
    margin: 40px 5% 0px 5%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
    height: 10px;
    background-color: ${(props) => (props.completed ? MyTheme.colors.accent : MyTheme.colors.grey)};
    position: absolute;
    bottom: 0px;
`;

const ProgressIcon = styled.span<ProgessCompletionProp>`
    color: ${(props) => (props.completed ? MyTheme.colors.darkBase : MyTheme.colors.grey)};
    font-weight: 400;
`;

interface ProgessProps {
    completed: boolean;
    icon: string;
}

export const ProgressElement: FC<ProgessProps> = ({ completed, icon }) => (
    <ProgressElementWrapper>
        <ProgressIcon className="material-symbols-rounded" completed={completed}>
            {icon}
        </ProgressIcon>
        <ProgressStatusLine completed={completed} />
    </ProgressElementWrapper>
);

export const RegistrationButton = styled(ButtonStyleDiv)`
    position: absolute;
    bottom: 20px;
    top: auto;
    padding-right: 20px;
    padding-left: 20px;
    z-index: 10;
`;

export const RemoveButton = styled(RegistrationButton)`
    bottom: 70px;
`;

export const RegistrationButtonRight = styled(RegistrationButton)`
    position: relative;
    margin-left: 10px;
`;

export const RegistrationButtonLeft = styled(RegistrationButton)`
    position: relative;
    margin-right: 10px;
`;

export const RegistrationButtonWrapper = styled.div`
    position: absolute;
    bottom: 0px;
`;

interface ProgressBarProps {
    pageIndex: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ pageIndex }) => (
    <ProgressBarWrapper>
        <ProgressElement completed={pageIndex >= 0} icon="add_location" />
        <ProgressElement completed={pageIndex >= 1} icon="edit_note" />
        <ProgressElement completed={pageIndex >= 2} icon="add_photo_alternate" />
    </ProgressBarWrapper>
);
