import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

export const Button = styled.button`
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    background-color: ${MyTheme.colors.accent};
    color: ${MyTheme.colors.lightbase};
    width: 60%;
    min-width: 50px;
    max-width: 100px;
    border: none;
    border-radius: 50px;
    padding: 10px;
`;
