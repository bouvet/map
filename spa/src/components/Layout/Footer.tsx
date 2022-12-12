import styled from 'styled-components';
import { deviceWidth } from '../../styles/global';

export const Footer = styled.footer`
    position: absolute;
    bottom: 1.3rem;
    left: 0;
    right: 0%;
    height: 5.5rem;
    width: 90%;
    background-color: transparent;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    max-width: ${deviceWidth.mobileL};
    margin: auto;
`;
