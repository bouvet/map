import React, { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from 'moment';
import { Form } from '../../../components/Form/Form';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { userActions } from '../../../store/state/user.state';
import { StyledInput } from '../../../components/Form/StyledInput';
import { useInput } from '../../../hooks/useInput';
import { Section } from '../../../components/Layout';
import { uiActions } from '../../../store';
import { PageSubtitle, PrimaryButton } from '../../../components/Common';

export const PersonalInfo: React.FC = () => {
    const { user } = useStateSelector((state) => state.user);
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const dobChangeHandler = (date: Date | null) => {
        if (date !== null) {
            const dob = moment(date).format('YYYY-MM-DD');
            dispatch(userActions.updateUser({ dob: new Date(dob).toISOString() }));
        }
    };

    const {
        value: firstName,
        isValid: firstNameIsValid,
        hasError: firstNameInputHasError,
        inputBlurHandler: firstNameBlurHandler,
        valueChangeHandler: firstNameChangeHandler,
        setInitialValue: setInitialFirstName,
    } = useInput((value: string) => value.trim().length >= 1);

    const {
        value: lastName,
        isValid: lastNameIsValid,
        hasError: lastNameInputHasError,
        inputBlurHandler: lastNameBlurHandler,
        valueChangeHandler: lastNameChangeHandler,
        setInitialValue: setInitialLastName,
    } = useInput((value: string) => value.trim().length >= 1);

    const onFirstNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        firstNameChangeHandler(e);
        dispatch(userActions.updateUser({ firstName: e.target.value }));
    };

    const onLastNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        lastNameChangeHandler(e);
        dispatch(userActions.updateUser({ lastName: e.target.value }));
    };

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user.dob) {
            dispatch(uiActions.showSnackbar({ message: 'Fødselsdato mangler', severity: 'error' }));
            return;
        }

        firstNameBlurHandler();
        lastNameBlurHandler();

        if (!firstNameIsValid || !lastNameIsValid) return;

        dispatch(userActions.updateUser({ firstName }));
        dispatch(userActions.updateUser({ lastName }));

        navigate('/register/password');
    };

    useEffect(() => {
        if (user.firstName) {
            setInitialFirstName(user.firstName);
        }
        if (user.lastName) {
            setInitialLastName(user.lastName);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Section>
            <PageSubtitle>
                Her kan du fylle inn profil-informasjonen din. Fødselsdato er ikke synlig for andre og brukes kun til å vise alder i
                omtaler.
            </PageSubtitle>
            <Form onSubmit={onSubmitHandler} style={{ marginTop: '1rem' }}>
                <StyledInput
                    label="Fornavn*"
                    errorMessage="Vennligst fyll inn fornavn"
                    value={firstName}
                    onChange={onFirstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                    inputHasError={firstNameInputHasError}
                />
                <StyledInput
                    label="Etternavn*"
                    errorMessage="Vennligst fyll inn etternavn"
                    value={lastName}
                    onChange={onLastNameChangeHandler}
                    onBlur={lastNameBlurHandler}
                    inputHasError={lastNameInputHasError}
                    style={{ marginBottom: '1rem' }}
                />

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                        label="Fødselsdato*"
                        value={user.dob || null}
                        onChange={(value: Date | null) => {
                            dobChangeHandler(value);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        disableFuture
                    />
                </LocalizationProvider>

                <PrimaryButton type="submit" sx={{ marginTop: '1rem' }} disabled={!firstNameIsValid || !lastNameIsValid || !user.dob}>
                    Gå videre
                </PrimaryButton>
            </Form>
        </Section>
    );
};
