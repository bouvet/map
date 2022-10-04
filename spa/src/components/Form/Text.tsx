import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

export const Text = styled.p`
    color: ${MyTheme.colors.darkbase};
    font-size: ${MyTheme.fontSize.header};
    padding: 0px;
    margin: 0px;
`;

export const LinkText = styled(Link)`
    color: ${MyTheme.colors.accent};
    font-size: ${MyTheme.fontSize.header};
    text-decoration: none;
    padding: 0px;
    margin: 0px;
`;

export const LinkTextCenter = styled(LinkText)`
    text-align: center;
`;

export const LinkTextPersonalization = styled(LinkText)`
    position: absolute;
    bottom: 20px;
    top: auto;
    z-index: 10;
    justify-self: center;
    text-align: center;
`;

export const LinkTextOnboarding = styled(LinkText)`
    padding: 5px;
    float: left;
`;

export const WrapperOnboarding = styled.div`
    position: absolute;
    bottom: 20px;
    top: auto;
    z-index: 10;
    width: 80%;
`;

export const Title = styled.h1`
    color: ${MyTheme.colors.darkbase};
    font-size: ${MyTheme.fontSize.largeIcon};
    padding: 0px;
    margin: 0px;
    text-align: left;
`;

export const TitleForm = styled.h1`
    color: ${MyTheme.colors.darkbase};
    font-size: ${MyTheme.fontSize.largeIcon};
    position: absolute;
    width: 200px;
    height: 25px;
    left: 58px;
    top: 58px;
`;
