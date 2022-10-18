import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButtonRegistration } from '../../components/Form/Buttons';
import { Form } from '../../components/Form/Form';
import { FormContent, FormWrapper } from '../../components/Form/FormWrapper';
import { CenterFlex, InputEmail } from '../../components/Form/Input';
import { TitleForm } from '../../components/Form/Text';
import { BackButton } from '../../components/Navigation/Buttons';
import { useStateDispatch } from '../../hooks/useRedux';
import { snackbarActions } from '../../store/state/snackbar.state';
import { MyTheme } from '../../styles/global';
import { SectionWrapper } from '../login/components/SectionWrapper';

export const ChangeEmail: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [newEmail, setNewEmail] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    // email validation?

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(snackbarActions.setNotify({ message: 'E-posten er endret', severity: 'success' }));
        navigate('/profile');
        console.log('Email: ', newEmail);
    };

    return (
        <FormWrapper>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightBase} onClick={() => navigate('/profile')}>
                <span className="material-symbols-outlined">close</span>
            </BackButton>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Endre e-post</TitleForm>
                    <Form onSubmit={(e) => onSubmitHandler(e)}>
                        <InputEmail label="E-post*" value={newEmail} setState={setNewEmail} handleChange={handleFormInputChange} />
                        <CenterFlex>
                            <SubmitButtonRegistration text="white">Endre e-post</SubmitButtonRegistration>
                        </CenterFlex>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
