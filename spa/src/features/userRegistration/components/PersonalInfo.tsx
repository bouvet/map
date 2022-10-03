import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';
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
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from 'moment';
import 'moment/locale/nb';
import { SubmitButton } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { InputName, Label } from '../../../components/Form/Input';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';
import { useStateDispatch } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { ProgressBarForm } from '../../../components/Form/ProgressBar';

export const PersonalInfo: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [inputName, setInputName] = useState('');
    const [inputAge, setInputAge] = useState<Date | null>(null);

    const handleFormInputChangeName = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleFormInputChangeAge = (timestamp: Date | null, setState: Dispatch<SetStateAction<Date | null>>) => {
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

    return (
        <FormWrapper>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightbase} onClick={handleClickOpen}>
                <span className="material-symbols-outlined">close</span>
            </BackButton>
            <Dialog open={open}>
                <DialogTitle id="alert-dialog-title">Avbryt registrering</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Sikker på at du ønsker å avslutte registreringen?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ja</Button>
                    <Button onClick={handleCloseDialog}>Nei</Button>
                </DialogActions>
            </Dialog>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Personlig informasjon</TitleForm>
                    <ProgressBarForm pageIndex={pageIndex} />
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <InputName label="Navn*" value={inputName} setState={setInputName} handleChange={handleFormInputChangeName} />
                        <Label>Fødselsdato*</Label>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDatePicker
                                label="dd.mm.åååå"
                                value={inputAge}
                                onChange={(newValue) => handleFormInputChangeAge(newValue, setInputAge)}
                                renderInput={(params) => <TextField {...params} />}
                                maxDate={new Date()}
                            />
                        </LocalizationProvider>
                        <SubmitButton text="white">Gå videre</SubmitButton>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
