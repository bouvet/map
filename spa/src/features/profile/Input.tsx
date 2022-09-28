import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleIcon } from '../../components/Navigation/Buttons';
import { MyTheme } from '../../styles/global';

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
        background-color: hsl(0, 0%, 85.49019607843137%);
        text-decoration: underline;
    }
    &:not(:focus):invalid {
        outline: 1px solid red;
    }
`;

const InputWrapper = styled.div`
    width: 80%;
    padding: 10px 10% 5px 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const PasswordLink = styled(Link)`
    color: ${MyTheme.colors.accent};
    text-decoration: underline;
    font-size: ${MyTheme.fontSize.body};
    width: 80%;
    margin-inline: 10%;
    padding-block: 10px;
`;

export interface InputProps {
    type: string;
    icon: string;
    value?: string;
    setter?: Function;
}

export const Input: FC<InputProps> = (props) => {
    const { type, icon, value, setter } = props;

    return (
        <>
            <InputWrapper>
                <GoogleIcon color="black" className="material-symbols-outlined">
                    {icon}
                </GoogleIcon>
                {setter ? (
                    <InputField type={type} value={value} required onChange={(e) => setter(e.target.value)} />
                ) : (
                    <InputField type={type} value={value} readOnly />
                )}
            </InputWrapper>
            <Line />
        </>
    );
};
