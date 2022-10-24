import styled from 'styled-components';
import { device } from '../../styles/global';

export const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    row-gap: 0.8rem;

    @media ${device.mobileM} {
        row-gap: 1rem;
    }

    /* input:not(:focus):not(:placeholder-shown):invalid {
        border-color: #bd0000;
    }

    input:not(:focus):not(:placeholder-shown):valid {
        border-color: #00c600;
    } */
`;
