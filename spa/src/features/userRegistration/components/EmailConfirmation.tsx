import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormContent, FormWrapperRegistration } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkText, Text, TitleForm } from '../../../components/Form/Text';
import { Form } from '../../../components/Form/Form';
import { ProgressBarForm, ProgressWrapper } from '../../../components/Form/ProgressBar';
import { userActions } from '../../../store/state/user.state';
import { DialogButton } from '../../../components/Form/DialogButton';

interface LocationType {
    inputEmail: string;
}

export const EmailConfirmation: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation().state as LocationType;

    const [inputCode, setInputCode] = useState<string[]>(new Array(6).fill(''));

    const handleSubmit = useCallback(() => {
        // check if code is valid, else snackbar message
        dispatch(userActions.setEmail(location.inputEmail));
        navigate('/personal-info');
    }, [dispatch, location.inputEmail, navigate]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const tempArray = [...inputCode];
        tempArray[index] = e.target.value;
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

    const pageIndex = 1;

    return (
        <>
            <ProgressWrapper>
                <ProgressBarForm pageIndex={pageIndex} />
            </ProgressWrapper>
            <FormWrapperRegistration>
                <DialogButton />
                <FormContent>
                    <SectionWrapper>
                        <TitleForm>Bekreft e-post</TitleForm>
                        <Form>
                            <Text>Skriv inn koden for å bekrefte e-postadressen {location.inputEmail}</Text>
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
                                        onChange={(e) => handleInputChange(e, index)}
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
