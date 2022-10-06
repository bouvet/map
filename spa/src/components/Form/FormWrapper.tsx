import styled from 'styled-components';

export const FormWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 570px;
`;

export const FormWrapperRegistration = styled(FormWrapper)`
    height: 50vh;
`;

export const FormContent = styled.div`
    width: 80%;
    padding: 5px;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    margin-top: -25px;
`;
