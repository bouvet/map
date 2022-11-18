import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    width: 100%;
    margin-top: 1rem;
    max-height: 75vh;
    overflow: scroll;
`;

interface Props {
    children: React.ReactNode;
}

export const LocationList: React.FC<Props> = ({ children }) => <List>{children}</List>;
