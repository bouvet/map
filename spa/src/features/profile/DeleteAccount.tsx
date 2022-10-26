import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form } from '../../components/Form/Form';
import { StyledInput } from '../../components/Form/StyledElements/StyledInput';
import { useInput } from '../../hooks/useInput';
import { useStateDispatch } from '../../hooks/useRedux';
import { userServices } from '../userRegistration/services/user.services';
import { BackButton } from '../../components/UI/Buttons/NavigationButtons';
import { SubmitButton, PageContainer, PageSubtitle, PageTitle, SectionContainer } from '../../components/UI';

export const DeleteAccount: FC = () => {
    // const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleConfirm = () => deleteAccount();
    const handleCloseDialog = () => setOpen(false);

    const [inputType, setInputType] = useState('password');
    const [showPassword, setShowPassword] = useState(false);

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => value.trim().length >= 8);

    const togglePasswordHandler = () => {
        if (inputType === 'password') {
            setInputType('text');
            setShowPassword(true);
        }

        if (inputType === 'text') {
            setInputType('password');
            setShowPassword(false);
        }
    };

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        passwordBlurHandler();

        if (!enteredPasswordIsValid) return;

        setOpen(true);
    };

    const deleteAccount = async () => {
        // check if password is correct
        // dispatch(userServices.deleteAccount());
        console.log('Konto er slettet');
        setOpen(false);
        // navigate('/');
    };

    return (
        <PageContainer>
            <BackButton onClick={() => navigate('/profile')} />
            <Dialog open={open}>
                <DialogTitle id="alert-dialog-title">Bekreft sletting</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Er du sikker på at du ønsker å slette kontoen? Denne handlingen kan ikke reverseres.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm}>Ja</Button>
                    <Button onClick={handleCloseDialog}>Nei</Button>
                </DialogActions>
            </Dialog>
            <SectionContainer>
                <PageTitle>Slett konto</PageTitle>
                <PageSubtitle style={{ marginTop: '1rem' }}>For å slette kontoen må du skrive inn passordet ditt.</PageSubtitle>
                <Form onSubmit={onSubmitHandler} style={{ marginTop: '1rem' }}>
                    <StyledInput
                        label="Passord"
                        type={inputType}
                        errorMessage="Passord må bestå av minst 8 tegn"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        inputHasError={passwordInputHasError}
                        toggleShowPassword={togglePasswordHandler}
                        showPassword={showPassword}
                    />
                    <SubmitButton
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 'auto', marginBottom: '-3.5vh' }}
                        disabled={passwordInputHasError}
                    >
                        Bekreft
                    </SubmitButton>
                </Form>
            </SectionContainer>
        </PageContainer>
    );
};
