import React from 'react';
import styled from 'styled-components';
import { ILocation } from '../../../interfaces';
import { MyTheme } from '../../../styles/global';

const ListItem = styled.li`
    padding: 0.5rem;
    background-color: ${MyTheme.colors.accent};
    margin-bottom: 0.5rem;
    color: white;
    border-radius: 3px;
`;

interface Props {
    location: ILocation;
    onClickHandler: (location: ILocation) => void;
    children: React.ReactNode;
}

export const LocationListItem: React.FC<Props> = ({ location, onClickHandler, children }) => (
    <ListItem onClick={() => onClickHandler(location)}>{children}</ListItem>
);
