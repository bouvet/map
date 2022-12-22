import styled from 'styled-components';
import { device, deviceWidth } from '../../styles/global';

export const Section = styled.section`
    width: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: space-between;
    max-width: ${deviceWidth.mobileL};

    @media ${device.tablet} {
        max-width: ${deviceWidth.tablet};
        padding: 3rem 1.5rem;
    }
`;
