import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../components/Form/Form';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { BackButton, PageContainer, PageTitle, SectionContainer, SubmitButton } from '../../../components/UI';
import { useInput } from '../../../hooks/useInput';
import { useStateDispatch } from '../../../hooks/useRedux';
import { categoryServices } from '../services';

export const Category: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const {
        value: name,
        isValid: nameIsValid,
        hasError: nameInputHasError,
        inputBlurHandler: nameBlurHandler,
        valueChangeHandler: nameChangeHandler,
        reset: resetNameInput,
    } = useInput((value) => value.trim().length >= 1);

    const {
        value: emoji,
        isValid: emojiIsValid,
        hasError: emojiInputHasError,
        inputBlurHandler: emojiBlurHandler,
        valueChangeHandler: emojiChangeHandler,
        reset: resetEmojiInput,
    } = useInput((value) => value.trim().length >= 1);

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        nameBlurHandler();
        emojiBlurHandler();

        if (!nameIsValid || !emojiIsValid) return;

        dispatch(categoryServices.create({ name, emoji }));
        resetNameInput();
        resetEmojiInput();
    };

    return (
        <PageContainer>
            <BackButton onClick={() => navigate('..')} />
            <SectionContainer>
                <PageTitle>Legg til kategori</PageTitle>
                <Form onSubmit={onSubmitHandler} style={{ marginTop: '3rem' }}>
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
                    <SubmitButton
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 'auto', marginBottom: '-3.5vh' }}
                        disabled={nameInputHasError || emojiInputHasError}
                    >
                        Legg til
                    </SubmitButton>
                </Form>
            </SectionContainer>
        </PageContainer>
    );
};
