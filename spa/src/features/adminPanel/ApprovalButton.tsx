import { FC } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

interface ButtonColorProps {
    color: string;
}

const Button = styled.button<ButtonColorProps>`
    height: 30px;
    width: 60px;
    background-color: ${({ color }) => color};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Icon = styled.span`
    color: white;
    font-size: ${MyTheme.fontSize.icon};
`;

export const ApproveButton: FC = () => (
    <Button color={MyTheme.colors.success}>
        <Icon className="material-symbols-outlined">done_outline</Icon>
    </Button>
);

export const RejectButton: FC = () => (
    <Button color={MyTheme.colors.alert}>
        <Icon className="material-symbols-outlined">cancel</Icon>
    </Button>
);
