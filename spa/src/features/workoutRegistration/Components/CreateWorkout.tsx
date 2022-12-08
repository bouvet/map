import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FABBackButton, PageSubtitle, PageTitle, PrimaryButton } from '../../../components/Common';
import { RegisterButtonFavorites } from '../../../components/Filter/FilterButtons';
import { Form } from '../../../components/Form/Form';
import { Main, Section } from '../../../components/Layout';

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
            <FABBackButton onClick={() => navigate(-1)} />
            <Section>
                <PageTitle>Legg til treningsøkt</PageTitle>
                <Form style={{ marginTop: '3rem' }}>
                    <PageSubtitle>Treningskategori</PageSubtitle>
                    {/* <FilterMenuContent style={{ padding: '2px 2px 2px 2px' }}>{mappedFilter}</FilterMenuContent> */}
                    <SelectWorkout />
                    <input type="text" value={notes} placeholder="Skriv dine notater her" onChange={(e) => setNotes(e.target.value)} />
                    <PrimaryButton type="submit" sx={{ marginTop: 'auto', marginBottom: '-3.5vh' }}>
                        Legg til
                    </PrimaryButton>
                </Form>
            </Section>
        </Main>
    );
};
