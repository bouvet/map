import { FC } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

export const Label = styled.label`
    display: block;
    margin-bottom: -15px;
`;

const InputField = styled.input`
    border: 1px solid rgb(193, 193, 193);
    font-size: ${MyTheme.fontSize.header};
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    width: calc(100% - 22px);
`;

const InputFieldCode = styled.input`
    border: 1px solid rgb(193, 193, 193);
    font-size: ${MyTheme.fontSize.header};
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    width: calc(15% - 22px);
    height: 35%;
`;

export const Checkbox = styled.input`
    margin-right: 7px;
`;

export const SplitWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

export const LeftFlex = styled.div`
    display: flex;
    justify-content: left;
`;

export const RightFlex = styled.div`
    display: flex;
    justify-content: right;
`;

interface InputProps {
    label: string;
    value: string;
    setState: Function;
    handleChange: Function;
}

export const InputEmail: FC<InputProps> = (props) => {
    const { label, value, handleChange, setState } = props;
    return (
        <>
            <Label>{label}</Label>
            <InputField
                type="email"
                placeholder="mail@verdenventer.no"
                value={value}
                required
                onChange={(e) => handleChange(e, setState)}
            />
        </>
    );
};

export const InputPassword: FC<InputProps> = (props) => {
    const { label, value, handleChange, setState } = props;
    return (
        <>
            <Label>{label}</Label>
            <InputField
                type="password"
                minLength={8}
                placeholder="Min. 8 tegn"
                value={value}
                required
                onChange={(e) => handleChange(e, setState)}
            />
        </>
    );
};

export const InputName: FC<InputProps> = (props) => {
    const { label, value, handleChange, setState } = props;
    return (
        <>
            <Label>{label}</Label>
            <InputField type="text" value={value} required onChange={(e) => handleChange(e, setState)} />
        </>
    );
};

export const InputAge: FC<InputProps> = (props) => {
    const { label, value, handleChange, setState } = props;
    return (
        <>
            <Label>{label}</Label>
            <InputField type="date" value={value} required onChange={(e) => handleChange(e, setState)} />
        </>
    );
};

export const InputCode: FC<InputProps> = (props) => {
    const { label, value, handleChange, setState } = props;
    return (
        <>
            <div hidden>{label}</div>
            <InputFieldCode type="number" value={value} required onChange={(e) => handleChange(e, setState)} />
        </>
    );
};
