import styled from 'styled-components';
import { MyTheme, device } from '../../../styles/global';

export const PageTitle = styled.h1`
    color: ${MyTheme.colors.darkBase};
    font-size: 2rem;
    margin-top: 1rem;

    @media ${device.mobileM} {
        margin-top: 5rem;
        width: 100%;
    }
`;
