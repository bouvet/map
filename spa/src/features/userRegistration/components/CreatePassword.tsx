import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useStateDispatch } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { SubmitButton } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { InputPassword } from '../../../components/Form/Input';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkText, TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';
import { ProgressBarForm } from '../../../components/Form/ProgressBar';

export const CreatePassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [createPassword, setCreatePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (createPassword !== confirmPassword) {
            dispatch(snackbarActions.setNotify({ message: 'Passordene er ikke like', severity: 'error', autohideDuration: null }));
            console.log('Passordene er ikke like');
        } else {
            e.preventDefault();
            navigate('/personalization');
            console.log('Passord er satt');
        }
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => navigate('/user-registration');
    const handleCloseDialog = () => setOpen(false);

    const pageIndex = 3;

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
                    <TitleForm>Passord</TitleForm>
                    <ProgressBarForm pageIndex={pageIndex} />
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <InputPassword
                            label="Passord*"
                            value={createPassword}
                            setState={setCreatePassword}
                            handleChange={handleFormInputChange}
                        />
                        <InputPassword
                            label="Gjenta passord*"
                            value={confirmPassword}
                            setState={setConfirmPassword}
                            handleChange={handleFormInputChange}
                        />
                        <SubmitButton text="white">Gå videre</SubmitButton>
                    </Form>
                    <span>
                        <LinkText to="/personal-info">Tilbake</LinkText>
                    </span>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
