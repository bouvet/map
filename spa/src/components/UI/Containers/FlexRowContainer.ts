import styled from 'styled-components';

interface IJustifyContentProps {
    spacing?: 'baseline' | 'center' | 'end' | 'flex-end' | 'flex-start' | 'left' | 'right' | 'space-around' | 'space-between';
}

export const FlexRowContainer = styled.div<IJustifyContentProps>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.spacing ? props.spacing : 'normal')};
`;
