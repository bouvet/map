import styled from 'styled-components';

export const Form = styled.form`
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-content: center;
    row-gap: 20px;

    input:not(:focus):not(:placeholder-shown):invalid {
        border-color: #bd0000;
    }

    input:not(:focus):not(:placeholder-shown):valid {
        border-color: #00c600;
    }
`;
