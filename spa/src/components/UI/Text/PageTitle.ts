import styled from 'styled-components';
import { MyTheme, device } from '../../../styles/global';

export const PageTitle = styled.h1`
    width: 100%;
    color: ${MyTheme.colors.darkBase};
    font-size: 2rem;
    padding-left: 3.5rem;

    @media ${device.mobileM} {
        margin-top: 3rem;
        width: 100%;
        padding-left: 0;
        &.registration {
            margin-top: 0rem;
        }
    }
`;
