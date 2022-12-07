import React from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../../styles/global';

const Label = styled.label`
    display: block;
    margin-bottom: 10px;
    font-size: ${MyTheme.fontSize.header};
`;

export const StyledLabel: React.FC<{ label: string }> = ({ label }) => <Label>{label}</Label>;
