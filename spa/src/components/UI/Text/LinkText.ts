import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MyTheme } from '../../../styles/global';

export const LinkText = styled(Link)`
    color: ${MyTheme.colors.accent};
    font-size: ${MyTheme.fontSize.header};
    text-decoration: none;
    padding: 0px;
    margin: 0px;
`;
