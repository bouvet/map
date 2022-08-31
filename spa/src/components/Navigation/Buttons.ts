import styled from 'styled-components';

interface ButtonStylingProps {
    backgroundColor: string;
    textColor: string;
}

/** Round button with required arguments for color of background and text
 * structure is div, so to insert an icon into the button is done with
 * opening and closing tags
 * @param backgroundColor
 * @param textColor
 */
export const RoundButton = styled.div<ButtonStylingProps>`
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
`;

export const BackButton = styled(RoundButton)`
    z-index: 1;
    top: 10px;
    left: 10px;
`;
