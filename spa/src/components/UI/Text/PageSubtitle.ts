import styled from 'styled-components';
import { device } from '../../../styles/global';

export const PageSubtitle = styled.h2`
    font-size: 0.9rem;
    font-weight: 400;
    margin-bottom: 1rem;

    @media ${device.mobileM} {
        width: 100%;
    }
`;
