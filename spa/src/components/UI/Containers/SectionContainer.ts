import styled from 'styled-components';
import { device } from '../../../styles/global';

export const SectionContainer = styled.section`
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: 'white';
    color: 'white';

    @media ${device.mobileM} {
        /* justify-content: center; */
    }
`;
