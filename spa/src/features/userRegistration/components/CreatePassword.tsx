import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateDispatch } from '../../../hooks/useRedux';
import { Form } from '../../../components/Form/Form';
import { ProgressBarForm } from '../../../components/Form/ProgressBar';
import { userActions } from '../../../store/state/user.state';
import { DialogButton } from '../../../components/Form/DialogButton';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { useInput } from '../../../hooks/useInput';
import { LinkButton, PageTitle, SectionContainer, SubmitButton } from '../../../components/UI';
import { Main } from '../../../components/Layout';
import { uiActions } from '../../../store';

export const CreatePassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [showCreatePassword, setShowCreatePassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [inputTypeCreate, setInputTypeCreate] = useState('password');
    const [inputTypeConfirm, setInputTypeConfirm] = useState('password');

    const {
        value: createPassword,
        isValid: createPasswordIsValid,
        hasError: createPasswordInputHasError,
        inputBlurHandler: createPasswordBlurHandler,
        valueChangeHandler: createPasswordChangeHandler,
    } = useInput((value) => value.trim().length >= 8);

    const {
        value: confirmPassword,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordInputHasError,
        inputBlurHandler: confirmPasswordBlurHandler,
        valueChangeHandler: confirmPasswordChangeHandler,
    } = useInput((value) => value.trim().length >= 8);

    const toggleCreatePasswordHandler = () => {
        if (inputTypeCreate === 'password') {
            setInputTypeCreate('text');
            setShowCreatePassword(true);
        }

        if (inputTypeCreate === 'text') {
            setInputTypeCreate('password');
            setShowCreatePassword(false);
        }
    };

    const toggleConfirmPasswordHandler = () => {
        if (inputTypeConfirm === 'password') {
            setInputTypeConfirm('text');
            setShowConfirmPassword(true);
        }

        if (inputTypeConfirm === 'text') {
            setInputTypeConfirm('password');
            setShowConfirmPassword(false);
        }
    };

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (createPassword !== confirmPassword) {
            dispatch(uiActions.setShowSnackbar({ message: 'Passordene er ikke like', severity: 'error' }));
        } else {
            createPasswordBlurHandler();
            confirmPasswordBlurHandler();

            if (!createPasswordIsValid || !confirmPasswordIsValid) return;

            dispatch(userActions.setPassword(createPassword));
            navigate('/register/personalization');
            console.log('Passord er satt');
        }
    };

    const pageIndex = 3;

    return (
        <Main>
            <DialogButton />
            <SectionContainer>
                <PageTitle className="registration">Passord</PageTitle>
                <ProgressBarForm pageIndex={pageIndex} />
                <Form onSubmit={onSubmitHandler} style={{ marginTop: '1rem' }}>
                    <StyledInput
                        label="Passord*"
                        type={inputTypeCreate}
                        errorMessage="Passord må bestå av minst 8 tegn"
                        value={createPassword}
                        onChange={createPasswordChangeHandler}
                        onBlur={createPasswordBlurHandler}
                        inputHasError={createPasswordInputHasError}
                        toggleShowPassword={toggleCreatePasswordHandler}
                        showPassword={showCreatePassword}
                    />
                    <StyledInput
                        label="Gjenta passord*"
                        type={inputTypeConfirm}
                        errorMessage="Passord må bestå av minst 8 tegn"
                        value={confirmPassword}
                        onChange={confirmPasswordChangeHandler}
                        onBlur={confirmPasswordBlurHandler}
                        inputHasError={confirmPasswordInputHasError}
                        toggleShowPassword={toggleConfirmPasswordHandler}
                        showPassword={showConfirmPassword}
                    />
                    {/* add button disabled */}
                    <SubmitButton type="submit" variant="contained" sx={{ marginTop: 'auto' }}>
                        Gå videre
                    </SubmitButton>
                </Form>
                <LinkButton sx={{ marginBottom: '-10vh', width: 150 }} onClick={() => navigate('/register/personal-info')}>
                    Gå tilbake
                </LinkButton>
            </SectionContainer>
        </Main>
    );
};
