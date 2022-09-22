import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';

interface ButtonProps {
    background?: string;
    text?: string;
    disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
    position: relative; // absolute
    border: none;
    z-index: 10;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 35px;
    width: 100%;
    font-size: ${MyTheme.fontSize.icon};
    padding: 5px 10px;
    border-radius: 35px;
    background-color: ${({ disabled }) => (!disabled ? ({ background }) => background : MyTheme.colors.grey)};
    color: ${(props) => props.text};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: ${({ disabled }) => disabled && 'not-allowed'};
`;

export const VippsLogoWhite = styled.img`
    height: 30px;
`;

export const GoogleLogoWhite = styled.img`
    height: 20px;
    margin-right: 10px;
`;

export const LoginButton = styled(Button)`
    background-color: ${MyTheme.colors.accent};
`;

export const Vipps = styled(Button)`
    background-color: #ff5b24;
`;

export const Google = styled(Button)`
    background-color: ${MyTheme.colors.lightbase};
`;
