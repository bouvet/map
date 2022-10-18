import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { CenterFlex, InputEmail } from '../../../components/Form/Input';
import { FormContent, FormWrapperRegistration } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { Text, TitleForm } from '../../../components/Form/Text';
import { ProgressBarForm, ProgressWrapper } from '../../../components/Form/ProgressBar';
import { useStateDispatch } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { userService } from '../services/user.services';

export const EmailInput: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Email: ', email);
        sendCode();
        navigate('/email-confirmation', { state: { email } });
    };

    const sendCode = async () => {
        const inputEmail = {
            email,
        };

        const successStatus: boolean = await dispatch(userService.getCode(inputEmail));

        if (successStatus) {
            dispatch(snackbarActions.setNotify({ message: 'Kode er sendt', severity: 'success' }));
        } else {
            dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
        }
    };

    const pageIndex = 0;

    return (
        <>
            <ProgressWrapper>
                <ProgressBarForm pageIndex={pageIndex} />
            </ProgressWrapper>
            <FormWrapperRegistration>
                <BackButton
                    backgroundColor={MyTheme.colors.opaque}
                    textColor={MyTheme.colors.lightBase}
                    onClick={() => navigate('/user-registration')}
                >
                    <span className="material-symbols-outlined">close</span>
                </BackButton>
                <FormContent>
                    <SectionWrapper>
                        <TitleForm>E-post</TitleForm>
                        <Text>Fyll inn din e-postadresse for å motta en bekreftelseskode.</Text>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <InputEmail label="E-post*" value={email} setState={setEmail} handleChange={handleFormInputChange} />
                            <CenterFlex>
                                <SubmitButtonRegistration text="white">Send kode</SubmitButtonRegistration>
                            </CenterFlex>
                        </Form>
                    </SectionWrapper>
                </FormContent>
            </FormWrapperRegistration>
        </>
    );
};
