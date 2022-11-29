import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterButtonFavorites } from '../../../components/Filter/FilterButtons';
import { Form } from '../../../components/Form/Form';
import { Main, Section } from '../../../components/Layout';
import { BackButton, PageSubtitle, PageTitle, SubmitButton } from '../../../components/UI';

import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { ICategory } from '../../../interfaces';
import { SelectWorkout } from './FilterWorkout';

export const CreateWorkout: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [notes, setNotes] = useState('');
    const { favoriteCategoryIds } = useStateSelector((state) => state.user);

    const { categories } = useStateSelector((state) => state.map);
    const mappedFilter = categories.map((item: ICategory) => (
        <RegisterButtonFavorites key={item.name} id={item.id} text={item.name} emoji={item.emoji} />
    ));
    // const {
    //     value: name,
    //     isValid: nameIsValid,
    //     hasError: nameInputHasError,
    //     inputBlurHandler: nameBlurHandler,
    //     valueChangeHandler: nameChangeHandler,
    // } = useInput((value) => value.trim().length >= 1);

    // const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     nameBlurHandler();

    //     if (!nameIsValid) return;

    //     dispatch(categoryServices.create({ name }));
    // };

    return (
        <Main>
            <BackButton onClick={() => navigate(-1)} />
            <Section>
                <PageTitle>Legg til treningsøkt</PageTitle>
                <Form style={{ marginTop: '3rem' }}>
                    <PageSubtitle>Treningskategori</PageSubtitle>
                    {/* <FilterMenuContent style={{ padding: '2px 2px 2px 2px' }}>{mappedFilter}</FilterMenuContent> */}
                    <SelectWorkout />
                    <input type="text" value={notes} placeholder="Skriv dine notater her" onChange={(e) => setNotes(e.target.value)} />
                    <SubmitButton type="submit" variant="contained" sx={{ marginTop: 'auto', marginBottom: '-3.5vh' }}>
                        Legg til
                    </SubmitButton>
                </Form>
            </Section>
        </Main>
    );
};
