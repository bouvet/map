import { FC } from 'react';
import styled from 'styled-components';
import { GoogleIcon } from '../../components/Navigation/GoogleIcon';

const Line = styled.hr`
    width: 100%;
    border: none;
    height: 2px;
    background-color: #cdcdcd;
`;

const InputField = styled.input`
    color: black;
    padding: 10px;
    margin-left: 20px;
    border: none;
    width: 100%;
    border-radius: 10px;
    &:focus {
        outline: none;
    }
`;

const InputWrapper = styled.div`
    width: 80%;
    padding: 10px 10% 5px 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export interface InputProps {
    icon: string;
    value?: string;
}

export const Input: FC<InputProps> = (props) => {
    const { icon, value } = props;

    return (
        <>
            <InputWrapper>
                <GoogleIcon color="black" className="material-symbols-outlined">
                    {icon}
                </GoogleIcon>
                <InputField value={value} readOnly />
            </InputWrapper>
            <Line />
        </>
    );
};
