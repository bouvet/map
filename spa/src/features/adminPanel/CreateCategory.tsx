import { FC, FormEvent } from 'react';
import { SubmitButtonRegistration } from '../../components/Form/Buttons';
import { Form } from '../../components/Form/Form';
import { FormContent, FormWrapper } from '../../components/Form/FormWrapper';
import { CenterFlex } from '../../components/Form/Input';
import { StyledInput } from '../../components/Form/StyledElements/StyledInput';
import { TitleForm } from '../../components/Form/Text';
import { useInput } from '../../hooks/useInput';
import { useStateDispatch } from '../../hooks/useRedux';
import { SectionWrapper } from '../login/components/SectionWrapper';
import { categoryServices } from './services/category.services';

export const CreateCategory: FC = () => {
    const dispatch = useStateDispatch();

    const {
        value: name,
        isValid: nameIsValid,
        hasError: nameInputHasError,
        inputBlurHandler: nameBlurHandler,
        valueChangeHandler: nameChangeHandler,
    } = useInput((value) => value.trim().length >= 1);

    const {
        value: emoji,
        isValid: emojiIsValid,
        hasError: emojiInputHasError,
        inputBlurHandler: emojiBlurHandler,
        valueChangeHandler: emojiChangeHandler,
    } = useInput((value) => value.trim().length >= 1);

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        nameBlurHandler();
        emojiBlurHandler();

        if (!nameIsValid || !emojiIsValid) return;

        dispatch(categoryServices.create({ name, emoji }));
    };

    return (
        <FormWrapper>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Legg til kategori</TitleForm>
                    <Form onSubmit={onSubmitHandler}>
                        <StyledInput
                            label="Navn*"
                            errorMessage="Vennligst fyll inn navn"
                            value={name}
                            onChange={nameChangeHandler}
                            onBlur={nameBlurHandler}
                            inputHasError={nameInputHasError}
                        />
                        <StyledInput
                            label="Emoji*"
                            errorMessage="Vennligst fyll inn emoji"
                            value={emoji}
                            onChange={emojiChangeHandler}
                            onBlur={emojiBlurHandler}
                            inputHasError={emojiInputHasError}
                        />
                        <CenterFlex>
                            <SubmitButtonRegistration text="white">Legg til</SubmitButtonRegistration>
                        </CenterFlex>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
