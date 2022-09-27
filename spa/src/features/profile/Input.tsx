import { FC } from 'react';
import styled from 'styled-components';
import { GoogleIcon } from '../../components/Navigation/Buttons';

const Line = styled.hr`
    width: 100%;
    border: none;
    height: 2px;
    background-color: grey;
`;

const InputField = styled.input`
    color: black;
`;

export interface InputProps {
    key?: string;
    icon: string;
    value: string;
    setter: Function;
}

export const Input: FC<InputProps> = (props) => {
    const { key, icon, value, setter } = props;

    return (
        <>
            <GoogleIcon color="black" className="material-symbols-outlined">
                {icon}
            </GoogleIcon>
            <InputField type="text" value={value} onChange={(e) => setter(e.target.value)} />
            <Line />
        </>
    );
};
