import { FC } from 'react';
import styled from 'styled-components';

const RequiredWrapper = styled.span`
    color: red;
`;

export const RequiredStar: FC = () => <RequiredWrapper>*</RequiredWrapper>;
