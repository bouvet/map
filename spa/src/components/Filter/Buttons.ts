import React from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

interface Props {
    selected: boolean;
}

export const FilterButton = styled.div<Props>`
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 27px;
    font-size: ${MyTheme.fontSize.body};
    padding: 0px 10px;
    border-radius: 27px;
    background-color: ${props => props.selected ? MyTheme.colors.accent : MyTheme.colors.darkbase };
    color: ${MyTheme.colors.lightbase};
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;