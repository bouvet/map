import { FC } from 'react';
import styled from 'styled-components';

const Label = styled.label`
    display: block;
    margin-bottom: 10px;
`;

export const StyledLabel: FC<{ label: string }> = ({ label }) => <Label>{label}</Label>;
