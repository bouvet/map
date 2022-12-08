import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../components/Form/Form';
import { StyledInput } from '../../../components/Form/StyledInput';
import { useInput } from '../../../hooks/useInput';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { Main, Section } from '../../../components/Layout';
import { Header } from '../../../components/Navigation';
import { ConfirmationModal, DeleteButton, PrimaryButton } from '../../../components/Common';
import { userServices } from '../../../services';

export const DeleteAccount = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const { user } = useStateSelector((state) => state.auth);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => value.trim().length >= 8);

    const onSubmitHandler = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        passwordBlurHandler();

        if (!enteredPasswordIsValid) return;

        dispatch(
            userServices.validatePassword(user.email, enteredPassword, () => {
                dispatch(
                    userServices.deleteAccount(user.id, () => {
                        navigate('/');
                    }),
                );
            }),
        );
    };

    return (
        <>
            <Header>Slett kontoen din</Header>
            <Main>
                <Section>
                    <h2 style={{ fontSize: '1rem', padding: '1rem 0' }}>{`Synd å se deg gå ${user.firstName} ${user.lastName} 😭`}</h2>
                    <p style={{ padding: '1rem 0' }}>
                        Når kontoen er slettet vil alle dine data være borte for alltid og det vil ikke være mulig å gjenopprette dataene.
                    </p>
                    <p>For å slette kontoen din må du skrive inn passordet ditt.</p>
                    <Form onSubmit={onSubmitHandler} style={{ marginTop: '2rem' }}>
                        <StyledInput
                            label="Passord"
                            type={showPassword ? 'text' : 'password'}
                            errorMessage="Passord må bestå av minst 8 tegn"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            inputHasError={passwordInputHasError}
                            toggleShowPassword={() => setShowPassword((show) => !show)}
                            showPassword={showPassword}
                        />
                        <div style={{ marginTop: 'auto' }}>
                            <PrimaryButton onClick={() => navigate(-1)}>Ta meg tilbake</PrimaryButton>
                            <DeleteButton
                                type="button"
                                sx={{ marginTop: '0.5rem' }}
                                disabled={!enteredPasswordIsValid || passwordInputHasError}
                                onClick={() => setShowConfirmModal(true)}
                            >
                                Slett konto
                            </DeleteButton>
                        </div>
                    </Form>
                    {showConfirmModal && (
                        <ConfirmationModal
                            modalText="Du er i ferd med å slette kontoen din."
                            modalTitle="Slett konto"
                            acceptButtonText="Slett konto"
                            onAcceptHandler={onSubmitHandler}
                            onCancelHandler={() => setShowConfirmModal(false)}
                        />
                    )}
                </Section>
            </Main>
        </>
    );
};
