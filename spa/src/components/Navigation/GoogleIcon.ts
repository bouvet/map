import styled from 'styled-components';

interface IconColorProp {
    color: string;
}

export const GoogleIcon = styled.span<IconColorProp>`
    color: ${(props) => props.color};
    font-weight: 400;
`;
