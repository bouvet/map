import { FC, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, nbNO } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import moment from 'moment';
import 'moment/locale/en-ca';
import { Form } from '../../../components/Form/Form';
import { Label } from '../../../components/Form/Input';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { userActions } from '../../../store/state/user.state';
import { DialogButton } from '../../../components/Form/DialogButton';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { useInput } from '../../../hooks/useInput';
import { PageSubtitle, PageTitle, SubmitButton } from '../../../components/UI';
import { Main, Section } from '../../../components/Layout';
import { uiActions } from '../../../store';

export const PersonalInfoGoogle: FC = () => {
    const { email, firstName, lastName, dob } = useStateSelector((state) => state.user);
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const handleChangeDob = (timestamp: Date | null) => {
        if (timestamp !== null) {
            dispatch(userActions.setDob(moment(timestamp).format('L')));
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

    moment.locale('en-ca');

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(dob);
        if (!dob) {
            dispatch(uiActions.setShowSnackbar({ message: 'Fødselsdato mangler', severity: 'error' }));
            return;
        }
        firstNameBlurHandler();
        lastNameBlurHandler();

        if (!enteredFirstNameIsValid || !enteredLastNameIsValid) return;
        dispatch(userActions.setFirstName(enteredFirstName));
        dispatch(userActions.setLastName(enteredLastName));

        navigate('/register/personalization');
        console.log('Name: ', firstName, lastName);
        console.log('Date of birth: ', moment(dob).format('L'));
    };

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976d2' },
            },
        },
        nbNO,
    );

    // TODO: pre-fill name inputs from Google account?

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
        <Main>
            <DialogButton />
            <Section style={{ height: '100%' }}>
                <PageTitle>Personlig informasjon</PageTitle>
                <PageSubtitle style={{ marginTop: '1rem' }}>
                    Her kan du endre profilinformasjonen din. Fødselsdato er ikke synlig for andre og brukes kun til å vise alder i omtaler.
                </PageSubtitle>
                <Form onSubmit={onSubmitHandler} style={{ marginTop: '1rem' }}>
                    <StyledInput label="E-post*" placeholder={email} disabled />
                    <StyledInput
                        label="Fornavn*"
                        errorMessage="Vennligst fyll inn fornavn"
                        value={enteredFirstName}
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                        inputHasError={firstNameInputHasError}
                    />
                    <StyledInput
                        label="Etternavn*"
                        errorMessage="Vennligst fyll inn etternavn"
                        value={enteredLastName}
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                        inputHasError={lastNameInputHasError}
                    />
                    <Label>Fødselsdato*</Label>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDatePicker
                                label="åååå.mm.dd"
                                value={dob || null}
                                onChange={(newValue) => handleChangeDob(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                                maxDate={new Date()}
                            />
                        </LocalizationProvider>
                    </ThemeProvider>
                    <SubmitButton
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 'auto', marginBottom: '-3.5vh' }}
                        disabled={firstNameInputHasError || lastNameInputHasError}
                    >
                        Gå videre
                    </SubmitButton>
                </Form>
            </Section>
        </Main>
    );
};
