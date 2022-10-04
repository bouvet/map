import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormContent, FormWrapperRegistration } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkText, Text, TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';
import { Form } from '../../../components/Form/Form';
import { ProgressBarForm, ProgressWrapper } from '../../../components/Form/ProgressBar';

export const EmailConfirmation: FC = () => {
    const navigate = useNavigate();
    const location: any = useLocation();

    const [inputCode, setInputCode] = useState<string[]>(new Array(6).fill(''));

    const handleSubmit = useCallback(() => {
        navigate('/personal-info');
    }, [navigate]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const tempArray = [...inputCode];
        tempArray[index] = event.target.value;
        setInputCode(tempArray);
        const nextInput = document.querySelector(`input[name=input-field-${index + 1}]`) as HTMLElement | null;
        if (nextInput !== null) {
            nextInput.focus();
        }
    };

    useEffect(() => {
        if (!inputCode.includes('')) {
            handleSubmit();
        }
    }, [inputCode, handleSubmit]);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => navigate('/user-registration');
    const handleCloseDialog = () => setOpen(false);

    const pageIndex = 1;

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
                        <TitleForm>Bekreft e-post</TitleForm>
                        <Form>
                            <Text>Skriv inn koden for å bekrefte e-postadressen {location.state.inputEmail}</Text>
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { m: '1%', width: '14%' },
                                }}
                            >
                                {inputCode.map((data, index) => (
                                    <TextField
                                        type="text"
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={index}
                                        name={`input-field-${index}`}
                                        onChange={(event) => handleInputChange(event, index)}
                                        inputProps={{ inputMode: 'numeric', pattern: '^[0-9]*$', maxLength: 1 }}
                                        required
                                        onFocus={(e) => e.target.select}
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </Box>
                        </Form>
                        <span>
                            <LinkText to="/email-input">Endre e-post</LinkText>
                        </span>
                    </SectionWrapper>
                </FormContent>
            </FormWrapperRegistration>
        </>
    );
};
