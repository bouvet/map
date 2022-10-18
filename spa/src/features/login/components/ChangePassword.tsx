import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { CenterFlex, InputEmail } from '../../../components/Form/Input';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { Text, TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { useStateDispatch } from '../../../hooks/useRedux';
import { MyTheme } from '../../../styles/global';
import { loginServices } from '../services/login.services';

export const ChangePassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const successStatus: boolean = await dispatch(loginServices.getToken({ email }));
        if (successStatus) {
            navigate(-1);
        }
    };

    return (
        <FormWrapper>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightBase} onClick={() => navigate(-1)}>
                <span className="material-symbols-outlined">close</span>
            </BackButton>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Endre passord</TitleForm>
                    <Text>Fyll inn din e-postadresse så sender vi deg en link for å endre passord.</Text>
                    <Form onSubmit={onSubmitHandler}>
                        <InputEmail label="E-post*" value={email} setState={setEmail} handleChange={handleFormInputChange} />
                        <CenterFlex>
                            <SubmitButtonRegistration text="white">Send link</SubmitButtonRegistration>
                        </CenterFlex>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
