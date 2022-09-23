import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateDispatch } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { LoginButton } from '../../login/components/Button';
import { Form } from '../../login/components/Form';
import { InputPassword } from '../../login/components/Input';
import { LoginContent, LoginWrapper } from '../../login/components/LoginWrapper';
import { SectionWrapper } from '../../login/components/SectoionWrapper';
import { Title } from '../../login/components/Text';

export const CreatePassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [createPassword, setCreatePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (createPassword !== confirmPassword) {
            dispatch(snackbarActions.setNotify({ message: 'Passordene er ikke like', severity: 'error', autohideDuration: null }));
            console.log('Passordene er ikke like');
        } else {
            navigate('/personalization');
            console.log('Passord er satt');
        }
    };

    return (
        <LoginWrapper>
            <LoginContent>
                <SectionWrapper>
                    <Title>Passord</Title>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <InputPassword
                            label="Passord*"
                            value={createPassword}
                            setState={setCreatePassword}
                            handleChange={handleFormInputChange}
                        />
                        <InputPassword
                            label="Gjenta passord*"
                            value={confirmPassword}
                            setState={setConfirmPassword}
                            handleChange={handleFormInputChange}
                        />
                        <LoginButton text="white">Gå videre</LoginButton>
                    </Form>
                </SectionWrapper>
            </LoginContent>
        </LoginWrapper>
    );
};
