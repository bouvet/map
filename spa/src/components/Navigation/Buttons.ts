import styled from 'styled-components';

interface ButtonStylingProps {
    backgroundColor?: string;
    textColor?: string;
}

export const RoundButton = styled.button<ButtonStylingProps>`
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    position: fixed;
    bottom: 30px;
    right: 30px;
    border: none;
`;

interface IconColorProp {
    color: string;
}

export const GoogleIcon = styled.span<IconColorProp>`
    color: ${(props) => props.color};
    font-weight: 400;
`;
