import styled from 'styled-components';
import { device } from '../../styles/global';

export const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    row-gap: 1rem;

    @media ${device.mobileM} {
        row-gap: 1.3rem;
    }
`;
