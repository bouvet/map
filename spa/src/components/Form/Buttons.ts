import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

interface ButtonProps {
    background?: string;
    text?: string;
    disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
    position: relative;
    border: none;
    z-index: 10;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 35px;
    width: 100%;
    font-size: ${MyTheme.fontSize.icon};
    padding: 5px 10px;
    border-radius: 20px;
    background-color: ${({ disabled }) => (!disabled ? ({ background }) => background : MyTheme.colors.grey)};
    color: ${(props) => props.text};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: ${({ disabled }) => disabled && 'not-allowed'};
`;

export const SubmitButton = styled(Button)`
    background-color: ${MyTheme.colors.accent};
`;

export const SubmitButtonRight = styled(SubmitButton)`
    width: 50%;
    float: right;
`;

export const SubmitButtonRegistration = styled(SubmitButton)`
    position: absolute;
    bottom: 20px;
    top: auto;
    width: 80%;
`;

export const SubmitButtonPersonalization = styled(SubmitButtonRegistration)`
    bottom: 50px;
`;

export const VippsLogoWhite = styled.img`
    height: 30px;
`;

export const GoogleLogoWhite = styled.img`
    height: 20px;
    margin-right: 10px;
`;

export const Vipps = styled(Button)`
    background-color: #ff5b24;
`;

export const Google = styled(Button)`
    background-color: ${MyTheme.colors.lightbase};
`;

export const Email = styled(Button)`
    background-color: ${MyTheme.colors.accent};
`;
