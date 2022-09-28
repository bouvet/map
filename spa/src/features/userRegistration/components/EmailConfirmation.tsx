import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkText, ProgressBarForm, Text, TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';

export const EmailConfirmation: FC = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        navigate('/user-registration');
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const pageIndex = 1;

    return (
        <FormWrapper>
            <BackButton
                backgroundColor={MyTheme.colors.opaque}
                textColor={MyTheme.colors.lightbase}
                onClick={handleClickOpen}
                // onClick={() => navigate('/user-registration')}
            >
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
                    <TitleForm>Bekreft e-post</TitleForm>
                    <ProgressBarForm pageIndex={pageIndex} />
                    <Text>Skriv inn koden for å bekrefte e-postadressen *fra EmailInput*</Text>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 0.5, width: '4ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-number" type="number" inputProps={{ maxLength: 1 }} autoFocus />
                        <TextField id="outlined-number" type="number" inputProps={{ maxLength: 1 }} />
                        <TextField id="outlined-number" type="number" inputProps={{ maxLength: 1 }} />
                        <TextField id="outlined-number" type="number" inputProps={{ maxLength: 1 }} />
                        <TextField id="outlined-number" type="number" inputProps={{ maxLength: 1 }} />
                        <TextField id="outlined-number" type="number" inputProps={{ maxLength: 1 }} />
                    </Box>
                    <LinkText onClick={() => navigate(-1)}>Gå tilbake</LinkText>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
