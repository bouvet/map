import styled from 'styled-components';
import { MyTheme, device } from '../../styles/global';

interface ButtonStylingProps {
    backgroundColor?: string;
    textColor?: string;
}

/** Round button with required arguments for color of background and text
 * structure is div, so to insert an icon into the button is done with
 * opening and closing tags
 * @param backgroundColor
 * @param textColor
 */
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

export const BackButton = styled(RoundButton)`
    z-index: 1300;
    top: 10px;
    left: 10px;
    height: 2.5rem;
    width: 2.5rem;

    @media ${device.mobileM} {
        height: 50px;
        width: 50px;
    }
`;

export const CloseButton = styled(RoundButton)`
    position: absolute;
    height: 40px;
    width: 40px;
    top: 10px;
    left: 10px;
    &:active {
        background-color: ${MyTheme.colors.darkBase};
    }
`;

interface IconColorProp {
    color: string;
}

export const GoogleIcon = styled.span<IconColorProp>`
    color: ${(props) => props.color};
    font-weight: 400;
`;
