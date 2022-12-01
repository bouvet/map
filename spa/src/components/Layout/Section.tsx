import styled from 'styled-components';
import { deviceWidth } from '../../styles/global';

export const Section = styled.section`
    /* height: 100%; */
    width: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    max-width: ${deviceWidth.mobileL};
`;
