import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateDispatch } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { CenterFlex, InputPassword } from '../../../components/Form/Input';
import { FormContent, FormWrapperRegistration } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkText, TitleForm } from '../../../components/Form/Text';
import { ProgressBarForm, ProgressWrapper } from '../../../components/Form/ProgressBar';
import { userActions } from '../../../store/state/user.state';
import { DialogButton } from '../../../components/Form/DialogButton';

export const CreatePassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [createPassword, setCreatePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCreatePassword, setShowCreatePassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowCreatePassword = () => {
        setShowCreatePassword(!showCreatePassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (createPassword !== confirmPassword) {
            dispatch(snackbarActions.setNotify({ message: 'Passordene er ikke like', severity: 'error', autohideDuration: null }));
        } else {
            e.preventDefault();
            dispatch(userActions.setPassword(createPassword));
            navigate('/personalization');
            console.log('Passord er satt');
        }
    };

    const pageIndex = 3;

    return (
        <>
            <ProgressWrapper>
                <ProgressBarForm pageIndex={pageIndex} />
            </ProgressWrapper>
            <FormWrapperRegistration>
                <DialogButton />
                <FormContent>
                    <SectionWrapper>
                        <TitleForm>Passord</TitleForm>
                        <Form onSubmit={(e) => onSubmitHandler(e)}>
                            <InputPassword
                                label="Passord*"
                                value={createPassword}
                                setState={setCreatePassword}
                                handleChange={handleFormInputChange}
                                show={showCreatePassword}
                                toggleShow={toggleShowCreatePassword}
                            />
                            <InputPassword
                                label="Gjenta passord*"
                                value={confirmPassword}
                                setState={setConfirmPassword}
                                handleChange={handleFormInputChange}
                                show={showConfirmPassword}
                                toggleShow={toggleShowConfirmPassword}
                            />
                            <CenterFlex>
                                <SubmitButtonRegistration text="white">Gå videre</SubmitButtonRegistration>
                            </CenterFlex>
                        </Form>
                        <span>
                            <LinkText to="/personal-info">Gå tilbake</LinkText>
                        </span>
                    </SectionWrapper>
                </FormContent>
            </FormWrapperRegistration>
        </>
    );
};
