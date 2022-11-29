import React from 'react';
import styled from 'styled-components';
import { StyledLabel } from './StyledLabel';
import { MyTheme } from '../../../styles/global';

const Input = styled.input`
    border: 1px solid rgb(193, 193, 193);
    font-size: ${MyTheme.fontSize.header};
    padding: 0.5rem;
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
    width: 100%;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const EyeIconDiv = styled.div`
    position: absolute;
    right: 0;
    height: 80%;
    padding: 0 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: white;
    border-radius: 5px;
    margin-right: 3px;
`;

const ErrorMessage = styled.p`
    color: #f52121;
    font-size: small;
    margin-top: 10px;
`;

interface IProps {
    label: string;
    placeholder?: string;
    type?: string;
    value?: string;
    errorMessage?: string;
    showPassword?: boolean;
    autoFocus?: boolean;
    required?: boolean;
    inputHasError?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    toggleShowPassword?: () => void;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const StyledInput: React.FC<IProps> = ({
    label,
    placeholder,
    type = 'text',
    value,
    autoFocus = false,
    required = false,
    inputHasError,
    errorMessage,
    showPassword,
    disabled,
    style,
    toggleShowPassword,
    onChange,
    onBlur,
    onKeyDown,
}) => {
    let inputStyle = {};
    if (inputHasError) {
        inputStyle = { border: '1px solid #f52121' };
    }
    if (!inputHasError && value) {
        inputStyle = { border: '1px solid #00c600' };
    }
    return (
        <div style={style}>
            <StyledLabel label={label} />
            <InputWrapper>
                <Input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    autoFocus={autoFocus}
                    required={required}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    style={inputStyle}
                    disabled={disabled}
                />
                {type === 'password' && !showPassword && (
                    <EyeIconDiv onClick={toggleShowPassword}>
                        <span className="material-symbols-outlined">visibility</span>
                    </EyeIconDiv>
                )}
                {type === 'text' && showPassword && (
                    <EyeIconDiv onClick={toggleShowPassword}>
                        <span className="material-symbols-outlined">visibility_off</span>
                    </EyeIconDiv>
                )}
            </InputWrapper>
            {inputHasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
    );
};
