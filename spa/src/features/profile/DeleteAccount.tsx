import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SubmitButtonRegistration } from '../../components/Form/Buttons';
import { Form } from '../../components/Form/Form';
import { FormContent, FormWrapper } from '../../components/Form/FormWrapper';
import { CenterFlex } from '../../components/Form/Input';
import { SectionWrapper } from '../../components/Form/SectionWrapper';
import { StyledInput } from '../../components/Form/StyledElements/StyledInput';
import { Text, TitleForm } from '../../components/Form/Text';
import { BackButton } from '../../components/Navigation/Buttons';
import { useInput } from '../../hooks/useInput';
import { useStateDispatch } from '../../hooks/useRedux';
import { MyTheme } from '../../styles/global';
import { userServices } from '../userRegistration/services/user.services';

export const DeleteAccount: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    // const handleClickOpen = () => setOpen(true);
    // const handleConfirm = () => navigate('/login'); // change, call dialog before onsubmit
    // @ts-ignore
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
        navigate('/');
    };

    return (
        <FormWrapper>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightBase} onClick={() => navigate('/profile')}>
                <span className="material-symbols-outlined">arrow_back</span>
            </BackButton>
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
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Slett konto</TitleForm>
                    <Text>For å slette kontoen må du skrive inn passordet ditt.</Text>
                    <Form onSubmit={onSubmitHandler}>
                        <StyledInput
                            label="Passord"
                            type={inputType}
                            errorMessage="Passord består av minst 8 tegn"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            inputHasError={passwordInputHasError}
                            toggleShowPassword={togglePasswordHandler}
                            showPassword={showPassword}
                        />
                        <CenterFlex>
                            <SubmitButtonRegistration text="white">Bekreft</SubmitButtonRegistration>
                        </CenterFlex>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
