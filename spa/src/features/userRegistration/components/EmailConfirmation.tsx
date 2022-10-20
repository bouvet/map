import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormContent, FormWrapperRegistration } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkText, Text, TextAccent, TitleForm } from '../../../components/Form/Text';
import { Form } from '../../../components/Form/Form';
import { ProgressBarForm, ProgressWrapper } from '../../../components/Form/ProgressBar';
import { userActions } from '../../../store/state/user.state';
import { DialogButton } from '../../../components/Form/DialogButton';
import { userServices } from '../services/user.services';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { useStateSelector } from '../../../hooks/useRedux';

export const EmailConfirmation: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const location = useLocation().state as LocationType;

    const { email } = useStateSelector((state) => state.user);

    const [confirmationCode, setConfirmationCode] = useState<string[]>(new Array(6).fill(''));

    const onSubmitHandler = useCallback(
        (code: string) => {
            confirmCode(code);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dispatch],
    );

    const confirmCode = async (code: string) => {
        const inputCode = {
            email,
            confirmationCode: code,
        };

        console.log(inputCode);

        // @ts-ignore
        const successStatus: boolean = await dispatch(userServices.confirmCode(inputCode));

        if (successStatus) {
            dispatch(snackbarActions.setNotify({ message: 'Kode er bekreftet', severity: 'success' }));
            navigate('/personal-info');
        } else {
            dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
        }
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
    }, [confirmationCode, onSubmitHandler]);

    const resendCode = () => {
        // @ts-ignore
        dispatch(userServices.resendCode());
    };

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
                        <span>
                            <LinkText to="/email-input">Endre e-post</LinkText>
                        </span>
                        <span>
                            <TextAccent onClick={resendCode}>Send ny kode</TextAccent>
                        </span>
                    </SectionWrapper>
                </FormContent>
            </FormWrapperRegistration>
        </>
    );
};
