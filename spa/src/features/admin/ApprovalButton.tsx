import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

interface ButtonProps {
    color: string;
}

const Button = styled.button<ButtonProps>`
    height: 40px;
    width: 80%;
    min-width: 60px;
    max-width: 100px;
    background-color: ${({ color }) => color};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`;

const Icon = styled.span`
    color: white;
    font-size: ${MyTheme.fontSize.largeIcon};
`;

interface ButtonMethodProp {
    handleClick: MouseEventHandler<HTMLButtonElement>;
}

export const ApproveButton: FC<ButtonMethodProp> = (props) => {
    const { handleClick } = props;

    return (
        <Button color={MyTheme.colors.success} onClick={handleClick}>
            <Icon className="material-symbols-outlined">done_outline</Icon>
        </Button>
    );
};

export const RejectButton: FC<ButtonMethodProp> = (props) => {
    const { handleClick } = props;

    return (
        <Button color={MyTheme.colors.alert} onClick={handleClick}>
            <Icon className="material-symbols-outlined">cancel</Icon>
        </Button>
    );
};
