import styled from 'styled-components';
import { deviceWidth } from '../../styles/global';

export const Section = styled.section`
    width: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: space-between;
    max-width: ${deviceWidth.mobileL};
`;