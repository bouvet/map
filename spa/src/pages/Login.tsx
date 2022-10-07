import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Google, GoogleLogoWhite, SubmitButton, Vipps, VippsLogoWhite } from '../components/Form/Buttons';
import { DivideLine } from '../features/login/components/DivideLine';
import { Form } from '../components/Form/Form';
import { Checkbox, InputEmail, InputPassword, LeftFlex, RightFlex, SplitWrapper } from '../components/Form/Input';
import { FormContent, FormWrapper } from '../components/Form/FormWrapper';
import { SectionWrapper } from '../components/Form/SectionWrapper';
import { LinkText, Text, Title } from '../components/Form/Text';
import { useStateDispatch } from '../hooks/useRedux';
import { authActions } from '../store/state/auth.state';
import { BackButton } from '../components/Navigation/Buttons';
import { MyTheme } from '../styles/global';

export const Login: FC = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [rememberStatus, setRememberStatus] = useState(false);

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Email: ', userEmail);
        console.log('Password: ', userPassword);
        console.log('Stay signed in: ', rememberStatus.toString());
        dispatch(authActions.logIn());
        navigate('/');
    };

    return (
        <FormWrapper>
            <FormContent>
                <SectionWrapper>
                    <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightbase} onClick={() => navigate('/')}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </BackButton>
                    <span>
                        <Title>Login</Title>
                        <Text>Verden venter... på deg!</Text>
                    </span>
                    <Google text="google">
                        <GoogleLogoWhite src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google" />
                        Logg inn med Google
                    </Google>
                    <Vipps text="white">
                        Logg inn med
                        <VippsLogoWhite src="https://vipps.no/documents/58/vipps-rgb-white.svg" alt="vipps" />
                    </Vipps>
                    <DivideLine />
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <InputEmail label="E-post" value={userEmail} setState={setUserEmail} handleChange={handleFormInputChange} />
                        <InputPassword
                            label="Passord"
                            value={userPassword}
                            setState={setUserPassword}
                            handleChange={handleFormInputChange}
                        />
                        <SplitWrapper>
                            <LeftFlex>
                                <Checkbox type="checkbox" checked={rememberStatus} onChange={(e) => setRememberStatus(e.target.checked)} />
                                Husk meg
                                {rememberStatus}
                            </LeftFlex>
                            <RightFlex>
                                <LinkText to="/forgotten-password">Glemt passord</LinkText>
                            </RightFlex>
                        </SplitWrapper>
                        <SubmitButton text="white" type="submit">
                            LOGG INN
                        </SubmitButton>
                    </Form>
                    <SplitWrapper>
                        <LeftFlex>
                            <Text>Ikke registrert?</Text>
                        </LeftFlex>
                        <RightFlex>
                            <LinkText to="/user-registration">Registrer deg</LinkText>
                        </RightFlex>
                    </SplitWrapper>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
