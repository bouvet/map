import styled from 'styled-components';
import { MyTheme, device } from '../../styles/global';

export const Text = styled.p`
    color: ${MyTheme.colors.darkBase};
    font-size: ${MyTheme.fontSize.header};
    padding: 0px;
    margin: 0px;
`;

export const WrapperOnboarding = styled.div`
    position: absolute;
    bottom: 20px;
    top: auto;
    z-index: 10;
    width: 80%;
`;

export const Title = styled.h1`
    color: ${MyTheme.colors.darkBase};
    font-size: ${MyTheme.fontSize.largeIcon};
    padding: 1rem;
    margin-top: 1rem;

    @media ${device.mobileM} {
        margin-top: 3rem;
    }
`;

export const TitleForm = styled.h1`
    color: ${MyTheme.colors.darkBase};
    font-size: ${MyTheme.fontSize.largeIcon};
    position: absolute;
    width: 200px;
    height: 25px;
    left: 58px;
    top: 58px;
`;
