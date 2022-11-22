import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';

interface IPillButtonProps {
    selected?: boolean;
}

export const PillButton = styled.button<IPillButtonProps>`
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 27px;
    font-size: ${MyTheme.fontSize.icon};
    padding: 5px 10px;
    border-radius: 27px;
    background-color: ${(props) => (props.selected ? MyTheme.colors.accent : MyTheme.colors.lightBase)};
    transition: 0.1s;
    color: ${(props) => (props.selected ? MyTheme.colors.lightBase : MyTheme.colors.darkBase)};
    display: flex;
    align-items: center;
    white-space: nowrap;
`;
