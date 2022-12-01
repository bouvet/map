import React, { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, nbNO } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import moment from 'moment';
import { Form } from '../../../components/Form/Form';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { userActions } from '../../../store/state/user.state';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { useInput } from '../../../hooks/useInput';
import { PageSubtitle, SubmitButton } from '../../../components/UI';
import { Section } from '../../../components/Layout';
import { uiActions } from '../../../store';
import { StyledLabel } from '../../../components/Form/StyledElements/StyledLabel';

export const PersonalInfo: React.FC = () => {
    const { firstName, lastName, dob } = useStateSelector((state) => state.user);
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const handleChangeDob = (timestamp: Date | null) => {
        if (timestamp !== null) {
            const dob = moment(timestamp).format('YYYY-MM-DD');
            dispatch(userActions.setDob(new Date(dob).toISOString()));
        }
    };

    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        inputBlurHandler: firstNameBlurHandler,
        valueChangeHandler: firstNameChangeHandler,
        setInitialValue: setInitialFirstName,
    } = useInput((value) => value.trim().length >= 1);

    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        inputBlurHandler: lastNameBlurHandler,
        valueChangeHandler: lastNameChangeHandler,
        setInitialValue: setInitialLastName,
    } = useInput((value) => value.trim().length >= 1);

    const onFirstNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        firstNameChangeHandler(e);
        dispatch(userActions.setFirstName(e.target.value));
    };

    const onLastNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        lastNameChangeHandler(e);
        dispatch(userActions.setLastName(e.target.value));
    };

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!dob) {
            dispatch(uiActions.setShowSnackbar({ message: 'Fødselsdato mangler', severity: 'error' }));
            return;
        }

        firstNameBlurHandler();
        lastNameBlurHandler();

        if (!enteredFirstNameIsValid || !enteredLastNameIsValid) return;

        dispatch(userActions.setFirstName(enteredFirstName));
        dispatch(userActions.setLastName(enteredLastName));

        navigate('/register/password');
    };

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976d2' },
            },
        },
        nbNO,
    );

    useEffect(() => {
        if (firstName) {
            setInitialFirstName(firstName);
        }
        if (lastName) {
            setInitialLastName(lastName);
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
                    value={enteredFirstName}
                    onChange={onFirstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                    inputHasError={firstNameInputHasError}
                />
                <StyledInput
                    label="Etternavn*"
                    errorMessage="Vennligst fyll inn etternavn"
                    value={enteredLastName}
                    onChange={onLastNameChangeHandler}
                    onBlur={lastNameBlurHandler}
                    inputHasError={lastNameInputHasError}
                />
                <StyledLabel label="Fødselsdato*" />
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <MobileDatePicker
                            label="dd.mm.åååå"
                            inputFormat="DD.MM.YYYY"
                            value={dob || null}
                            // @ts-ignore
                            onChange={(newValue) => handleChangeDob(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                            disableFuture
                        />
                    </LocalizationProvider>
                </ThemeProvider>
                <SubmitButton
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: '1rem' }}
                    disabled={!enteredFirstNameIsValid || !enteredLastNameIsValid}
                >
                    Gå videre
                </SubmitButton>
            </Form>
        </Section>
    );
};
