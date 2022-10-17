import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { SubmitButtonRegistration } from '../../components/Form/Buttons';
import { Form } from '../../components/Form/Form';
import { FormContent, FormWrapper } from '../../components/Form/FormWrapper';
import { CenterFlex, InputName } from '../../components/Form/Input';
import { TitleForm } from '../../components/Form/Text';
import { useStateDispatch } from '../../hooks/useRedux';
import { SectionWrapper } from '../login/components/SectionWrapper';
import { categoryServices } from './services/category.services';

export const CreateCategory: FC = () => {
    const dispatch = useStateDispatch();

    const [name, setName] = useState('');
    const [emoji, setEmoji] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (name === '') {
        //     //
        //     return;
        // }
        dispatch(categoryServices.create({ name, emoji }));
    };

    return (
        <FormWrapper>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Legg til kategori</TitleForm>
                    <Form onSubmit={onSubmitHandler}>
                        <InputName label="Navn*" value={name} setState={setName} handleChange={handleFormInputChange} />
                        <InputName label="Emoji*" value={emoji} setState={setEmoji} handleChange={handleFormInputChange} />
                        <CenterFlex>
                            <SubmitButtonRegistration text="white">Legg til</SubmitButtonRegistration>
                        </CenterFlex>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
