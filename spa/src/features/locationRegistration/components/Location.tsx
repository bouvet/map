import { FC } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';
import { ReactMapGL } from '../../map';

const MapWrapper = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    position: relative;
`;

interface ButtonContentProps {
    text: string;
    emoji: string;
}

interface ButtonColorProps {
    background: string;
    text: string;
}

export const ButtonStyle = styled.div<ButtonColorProps>`
    position: absolute;
    top: 10px;
    z-index: 10;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 27px;
    font-size: ${MyTheme.fontSize.icon};
    padding: 5px 10px;
    border-radius: 27px;
    background-color: ${(props) => props.background};
    color: ${(props) => props.text};
    display: inline-flex;
    align-items: center;
    justify-content: center;
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

export const EmojiButton: FC<ButtonContentProps> = ({ text, emoji }) => (
    <ButtonStyle text={MyTheme.colors.darkbase} background={MyTheme.colors.lightbase}>
        <ButtonEmoji>{emoji}</ButtonEmoji>
        <ButtonName>{text}</ButtonName>
    </ButtonStyle>
);

export const MapView: FC = () => (
    <MapWrapper>
        <EmojiButton text="Min plassering" emoji="📍" />
        <div className="registration-container">
            <ReactMapGL addingLocation />
        </div>
    </MapWrapper>
);
