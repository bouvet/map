import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';
import { Map } from '../../map';

const MapWrapper = styled.div`
    width: 100%;
    height: calc(100% - 40px);
    position: relative;
`;

interface ButtonContentProps {
    text: string;
    emoji: string;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
    top?: string;
    bottom?: string;
    right?: string;
    left?: string;
}

interface ButtonColorProps {
    background: string;
    text: string;
    disabled?: boolean;
    top?: string;
    bottom?: string;
    right?: string;
    left?: string;
}

export const ButtonStyle = styled.button<ButtonColorProps>`
    position: absolute;
    border: none;
    top: ${({ top }) => top};
    left: ${({ left }) => left};
    bottom: ${({ bottom }) => bottom};
    right: ${({ right }) => right};
    z-index: 10;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 27px;
    font-size: ${MyTheme.fontSize.icon};
    padding: 18px 10px;
    border-radius: 27px;
    background-color: ${({ disabled }) => (!disabled ? ({ background }) => background : MyTheme.colors.grey)};
    color: ${(props) => props.text};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: ${({ disabled }) => disabled && 'not-allowed'};
`;

export const ButtonStyleDiv = styled.div<ButtonColorProps>`
    position: absolute;
    border: none;
    top: 10px;
    z-index: 10;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 27px;
    font-size: ${MyTheme.fontSize.icon};
    padding: 5px 10px;
    border-radius: 27px;
    background-color: ${({ disabled }) => (!disabled ? ({ background }) => background : MyTheme.colors.grey)};
    color: ${(props) => props.text};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: ${({ disabled }) => disabled && 'not-allowed'};
`;

const ButtonEmoji = styled.span`
    display: inline;
    margin-right: 8px;
`;

const ButtonName = styled.span`
    display: inline;
    white-space: nowrap;
`;

export const CenterPin = styled.span`
    position: absolute;
    transform: translateY(-12px);
    font-size: ${MyTheme.fontSize.largeIcon};
`;

export const EmojiButton: FC<ButtonContentProps> = ({
    text,
    emoji,
    onClick,
    top = 'default',
    bottom = 'default',
    right = 'default',
    left = 'default',
}) => (
    <ButtonStyle
        text={MyTheme.colors.darkBase}
        background={MyTheme.colors.lightBase}
        type="button"
        onClick={onClick}
        top={top}
        bottom={bottom}
        right={right}
        left={left}
    >
        <ButtonEmoji>{emoji}</ButtonEmoji>
        <ButtonName>{text}</ButtonName>
    </ButtonStyle>
);

interface MapViewProp {
    handleClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const MapView: FC<MapViewProp> = ({ handleClick }) => (
    <MapWrapper>
        <EmojiButton text="Min plassering" emoji="📍" onClick={handleClick} top="10px" left="5px" />
        <div className="registration-container">{/* <Map addingLocation /> */}</div>
    </MapWrapper>
);
