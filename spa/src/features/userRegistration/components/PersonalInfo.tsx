import React, { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { nbNO } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import moment from 'moment';
import 'moment/locale/nb';
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { InputName, Label } from '../../../components/Form/Input';
import { FormContent, FormWrapperRegistration } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { ProgressBarForm, ProgressWrapper } from '../../../components/Form/ProgressBar';
import { userActions } from '../../../store/state/user.state';

export const PersonalInfo: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [inputName, setInputName] = useState('');
    const [inputAge, setInputAge] = useState<Date | null>(null);

    // const { currentName, currentAge } = useStateSelector((state) => state.user);

    // const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.value === ' ') {
    //         dispatch(userActions.setCurrentName(''));
    //     } else {
    //         dispatch(userActions.setCurrentName(e.target.value));
    //     }
    // };

    // const handleChangeAge = (timestamp: any) => {
    //     dispatch(userActions.setCurrentAge(timestamp));
    // };

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleChangeAge = (timestamp: Date | null, setState: Dispatch<SetStateAction<Date | null>>) => {
        if (timestamp !== null) {
            setState(timestamp);
        }
    };

    moment.locale('nb');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        if (inputAge === null) {
            e.preventDefault();
            dispatch(snackbarActions.setNotify({ message: 'Fødselsdato mangler', severity: 'error', autohideDuration: null }));
        } else {
            e.preventDefault();
            navigate('/create-password');
            console.log('Name: ', inputName);
            console.log('Date of birth: ', moment(inputAge).format('L'));
        }
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => navigate('/user-registration');
    const handleCloseDialog = () => setOpen(false);

    const pageIndex = 2;

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976d2' },
            },
        },
        {},
        nbNO,
    );

    return (
        <>
            <ProgressWrapper>
                <ProgressBarForm pageIndex={pageIndex} />
            </ProgressWrapper>
            <FormWrapperRegistration>
                <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightbase} onClick={handleClickOpen}>
                    <span className="material-symbols-outlined">close</span>
                </BackButton>
                <Dialog open={open}>
                    <DialogTitle id="alert-dialog-title">Avbryt registrering</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Sikker på at du ønsker å avslutte registreringen?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Ja</Button>
                        <Button onClick={handleCloseDialog}>Nei</Button>
                    </DialogActions>
                </Dialog>
                <FormContent>
                    <SectionWrapper>
                        <TitleForm>Personlig informasjon</TitleForm>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <InputName label="Navn*" value={inputName} setState={setInputName} handleChange={handleChangeName} />
                            <Label>Fødselsdato*</Label>
                            <ThemeProvider theme={theme}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <MobileDatePicker
                                        label="dd.mm.åååå"
                                        value={inputAge}
                                        onChange={(newValue) => handleChangeAge(newValue, setInputAge)}
                                        renderInput={(params) => <TextField {...params} />}
                                        maxDate={new Date()}
                                    />
                                </LocalizationProvider>
                            </ThemeProvider>
                            <SubmitButtonRegistration text="white">Gå videre</SubmitButtonRegistration>
                        </Form>
                    </SectionWrapper>
                </FormContent>
            </FormWrapperRegistration>
        </>
    );
};
