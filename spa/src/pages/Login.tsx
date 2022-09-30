import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Google, GoogleLogoWhite, LoginButton, Vipps, VippsLogoWhite } from '../features/login/components/Button';
import { DivideLine } from '../features/login/components/DivideLine';
import { Form } from '../features/login/components/Form';
import { Checkbox, InputEmail, InputPassword, LeftFlex, RightFlex, SplitWrapper } from '../features/login/components/Input';
import { LoginContent, LoginWrapper } from '../features/login/components/LoginWrapper';
import { SectionWrapper } from '../features/login/components/SectionWrapper';
import { LinkText, Text, Title } from '../features/login/components/Text';
import { useStateDispatch } from '../hooks/useRedux';
import { authActions } from '../store/state/auth.state';

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
        <LoginWrapper>
            <LoginContent>
                <SectionWrapper>
                    <LinkText to="/">Tilbake</LinkText>
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
                        <InputEmail label="Email" value={userEmail} setState={setUserEmail} handleChange={handleFormInputChange} />
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
                                <LinkText to="/">Glemt passord</LinkText>
                            </RightFlex>
                        </SplitWrapper>
                        <LoginButton text="white" type="submit">
                            LOGG INN
                        </LoginButton>
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
            </LoginContent>
        </LoginWrapper>
    );
};
