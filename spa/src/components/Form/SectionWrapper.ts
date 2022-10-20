import styled from 'styled-components';

export const SectionWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
`;

export const SectionWrapperLogin = styled(SectionWrapper)`
    grid-gap: 20px;
    height: 75vh;
`;
