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
import { userServices } from '../services/user.services';

export const EmailInput: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const successStatus: boolean = await dispatch(userServices.getCode({ email }));
        if (successStatus) {
            navigate('/email-confirmation', { state: { email } });
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
                    textColor={MyTheme.colors.lightbase}
                    onClick={() => navigate('/user-registration')}
                >
                    <span className="material-symbols-outlined">close</span>
                </BackButton>
                <FormContent>
                    <SectionWrapper>
                        <TitleForm>E-post</TitleForm>
                        <Text>Fyll inn din e-postadresse for å motta en bekreftelseskode.</Text>
                        <Form onSubmit={(e) => onSubmitHandler(e)}>
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
