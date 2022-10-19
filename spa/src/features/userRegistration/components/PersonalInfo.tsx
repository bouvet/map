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
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { CenterFlex, Label } from '../../../components/Form/Input';
import { FormContent, FormWrapperRegistration } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { Text, TitleForm } from '../../../components/Form/Text';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { ProgressBarForm, ProgressWrapper } from '../../../components/Form/ProgressBar';
import { userActions } from '../../../store/state/user.state';
import { DialogButton } from '../../../components/Form/DialogButton';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { useInput } from '../../../hooks/useInput';

export const PersonalInfo: FC = () => {
    const { firstName, lastName, dob } = useStateSelector((state) => state.user);
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
        if (!dob) {
            dispatch(snackbarActions.setNotify({ message: 'Fødselsdato mangler', severity: 'error', autohideDuration: null }));
        } else {
            firstNameBlurHandler();

            if (!enteredFirstNameIsValid || !enteredLastNameIsValid) return;
            dispatch(userActions.setFirstName(enteredFirstName));
            dispatch(userActions.setLastName(enteredLastName));

            navigate('/create-password');
            console.log('Name: ', firstName, lastName);
            console.log('Date of birth: ', moment(dob).format('L'));
        }
    };

    const pageIndex = 2;

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
    }, [firstName, lastName, setInitialFirstName, setInitialLastName]);

    return (
        <>
            <ProgressWrapper>
                <ProgressBarForm pageIndex={pageIndex} />
            </ProgressWrapper>
            <FormWrapperRegistration>
                <DialogButton />
                <FormContent>
                    <SectionWrapper>
                        <TitleForm>Personlig informasjon</TitleForm>
                        <Text>
                            Her kan du endre profilinformasjonen din. Fødselsdato er ikke synlig for andre og brukes kun til å vise alder i
                            omtaler.
                        </Text>
                        <Form onSubmit={onSubmitHandler}>
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
                            <CenterFlex>
                                <SubmitButtonRegistration text="white">Gå videre</SubmitButtonRegistration>
                            </CenterFlex>
                        </Form>
                    </SectionWrapper>
                </FormContent>
            </FormWrapperRegistration>
        </>
    );
};
