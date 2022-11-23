import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';
import { ButtonStyleDiv } from './Location';

// interface ProgressCompletionProp {
//     completed: boolean;
// }

export const RegistrationHeader = styled.div`
    width: 100%;
    height: 170px;
    padding-top: 30px;
`;

export const RegistrationContentWrapper = styled.div`
    height: calc(100% - 200px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PageHeader = styled.h1`
    font-size: ${MyTheme.fontSize.header};
    text-align: center;
    font-weight: normal;
`;

// interface ProgressProps {
//     completed: boolean;
//     icon: string;
// }

// const ProgressElementWrapper = styled.div`
//     padding: 0.8rem 0;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `;

// const ProgressIcon = styled.span<ProgressCompletionProp>`
//     color: ${(props) => (props.completed ? MyTheme.colors.darkBase : MyTheme.colors.grey)};
//     font-weight: 400;
//     margin-bottom: 0.5rem;
// `;

// const ProgressStatusLine = styled.div<ProgressCompletionProp>`
//     width: 100%;
//     height: 10px;
//     background-color: ${(props) => (props.completed ? MyTheme.colors.accent : MyTheme.colors.grey)};
// `;

// export const ProgressElement: FC<ProgressProps> = ({ completed, icon }) => (
//     <ProgressElementWrapper>
//         <ProgressIcon className="material-symbols-rounded" completed={completed}>
//             {icon}
//         </ProgressIcon>
//         <ProgressStatusLine completed={completed} />
//     </ProgressElementWrapper>
// );

export const RegistrationButton = styled(ButtonStyleDiv)`
    position: absolute;
    bottom: 20px;
    top: auto;
    padding-right: 20px;
    padding-left: 20px;
    z-index: 10;
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
    margin-top: 1.5rem;
`;

// interface ProgressBarProps {
//     pageIndex: number;
// }

// export const ProgressBar: FC<ProgressBarProps> = ({ pageIndex }) => (
//     <ProgressBarContainer elements={3}>
//         <ProgressElement completed={pageIndex >= 0} icon="add_location" />
//         <ProgressElement completed={pageIndex >= 1} icon="edit_note" />
//         <ProgressElement completed={pageIndex >= 2} icon="add_photo_alternate" />
//     </ProgressBarContainer>
// );
