import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';

interface ButtonStylingProps {
    backgroundColor?: string;
    textColor?: string;
}

export const RoundedButtonBase = styled.button<ButtonStylingProps>`
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    border: none;
    position: relative;
    padding: 5px 10px;
`;
