import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';

export const Text = styled.p`
    color: ${MyTheme.colors.darkbase};
    font-size: ${MyTheme.fontSize.header};
    padding: 0px;
    margin: 0px;
`;

export const LinkText = styled.a`
    color: ${MyTheme.colors.accent};
    font-size: ${MyTheme.fontSize.header};
    text-decoration: none;
    padding: 0px;
    margin: 0px;
`;

export const Title = styled.h1`
    color: ${MyTheme.colors.darkbase};
    font-size: ${MyTheme.fontSize.largeIcon};
    padding: 0px;
    margin: 0px;
    text-align: left;
`;
