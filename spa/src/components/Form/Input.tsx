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

const VisibilityButton = styled.div`
    position: absolute;
    border-radius: 50%;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-30px);
    top: 10px;
`;

const PasswordWrapper = styled.div`
    position: relative;
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

export const CenterFlex = styled.div`
    display: flex;
    justify-content: center;
`;

interface InputProps {
    label: string;
    value: string;
    setState?: Function;
    handleChange: Function;
    show?: boolean;
    toggleShow?: any;
}

export const InputEmail: FC<InputProps> = (props) => {
    const { label, value, handleChange, setState, show, toggleShow } = props;
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
    const { label, value, handleChange, setState, show, toggleShow } = props;
    return (
        <>
            <Label>{label}</Label>
            <PasswordWrapper>
                <InputField
                    type={show ? 'text' : 'password'}
                    minLength={8}
                    placeholder="Min. 8 tegn"
                    value={value}
                    required
                    onChange={(e) => handleChange(e, setState)}
                />
                {!show ? (
                    <VisibilityButton onClick={toggleShow}>
                        <span className="material-symbols-outlined">visibility</span>
                    </VisibilityButton>
                ) : (
                    <VisibilityButton onClick={toggleShow}>
                        <span className="material-symbols-outlined">visibility_off</span>
                    </VisibilityButton>
                )}
            </PasswordWrapper>
        </>
    );
};

export const InputName: FC<InputProps> = (props) => {
    const { label, value, handleChange, setState, show, toggleShow } = props;
    return (
        <>
            <Label>{label}</Label>
            <InputField type="text" value={value} required onChange={(e) => handleChange(e, setState)} />
        </>
    );
};
