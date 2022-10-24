import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormContent, FormWrapperRegistration } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { Text, TitleForm } from '../../../components/Form/Text';
import { Form } from '../../../components/Form/Form';
import { ProgressBarForm, ProgressWrapper } from '../../../components/Form/ProgressBar';
import { DialogButton } from '../../../components/Form/DialogButton';
import { userServices } from '../services/user.services';
import { useStateSelector } from '../../../hooks/useRedux';
import { AppDispatch } from '../../../store';
import { LinkButton } from '../../../components/UI';

export const EmailConfirmation: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    // const location = useLocation().state as LocationType;

    const { email } = useStateSelector((state) => state.user);
    const { shouldNavigate } = useStateSelector((state) => state.ui);

    const [confirmationCode, setConfirmationCode] = useState<string[]>(new Array(6).fill(''));

    const onSubmitHandler = (code: string) => {
        dispatch(
            userServices.confirmCode({
                email,
                confirmationCode: code,
            }),
        );
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const tempArray = [...confirmationCode];
        tempArray[index] = e.target.value;
        setConfirmationCode(tempArray);
        const nextInput = document.querySelector(`input[name=input-field-${index + 1}]`) as HTMLElement | null;
        if (nextInput !== null) {
            nextInput.focus();
        }
    };

    useEffect(() => {
        if (!confirmationCode.includes('')) {
            onSubmitHandler(confirmationCode.join(''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmationCode]);

    const resendCode = () => {
        dispatch(userServices.resendCode());
    };

    // if from google redirect to personal-info-google
    if (shouldNavigate) {
        return <Navigate replace to="/register/personal-info" />;
    }

    const pageIndex = 1;

    return (
        <>
            <ProgressWrapper>
                <ProgressBarForm pageIndex={pageIndex} />
            </ProgressWrapper>
            <FormWrapperRegistration>
                <DialogButton />
                <FormContent>
                    <SectionContainer>
                        <TitleForm>Bekreft e-post</TitleForm>
                        <Form>
                            <Text>Skriv inn koden for å bekrefte e-postadressen {email}</Text>
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { m: '1%', width: '14%' },
                                }}
                            >
                                {confirmationCode.map((data, index) => (
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
                        <LinkButton sx={{ width: 125, margin: 0 }} onClick={resendCode}>
                            Send ny kode
                        </LinkButton>
                        <LinkButton sx={{ width: 125, margin: 0 }} onClick={() => navigate('/email-input')}>
                            Endre e-post
                        </LinkButton>
                    </SectionWrapper>
                </FormContent>
            </FormWrapperRegistration>
        </>
    );
};
