import React from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

interface Props {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const StyledHeader = styled.header`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    background-color: ${MyTheme.colors.accent};
`;

export const Header: React.FC<Props> = ({ children, style }) => <StyledHeader style={style}>{children}</StyledHeader>;
