import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Main, Section } from '../../../components/Layout';
import { Header } from '../../../components/Navigation';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { MyTheme } from '../../../styles/global';
import { categoryServices } from '../services';
import { CategoryListItem } from './CategoryListItem';
import { ConfirmationModal, PrimaryButton } from '../../../components/Common';
import { ICategory } from '../../../interfaces';

export const CategoryList = () => {
    const [emoji, setEmoji] = useState('');
    const [name, setName] = useState('');

    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

    const { categories } = useStateSelector((state) => state.map);

    const dispatch = useStateDispatch();

    useEffect(() => {
        dispatch(categoryServices.get());
    }, [dispatch]);

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (emoji.trim().length < 1 || name.trim().length < 1) return;

        dispatch(categoryServices.create(emoji, name));
        setEmoji('');
        setName('');
    };

    const selectCategoryHandler = (category: ICategory) => {
        setSelectedCategory(category);
    };

    const onDeleteCategoryHandler = () => {
        if (selectedCategory) {
            dispatch(categoryServices.delete(selectedCategory.id));
            setSelectedCategory(null);
        }
    };

    return (
        <>
            <Header>Behandle Kategorier</Header>
            <Main>
                <Section style={{ height: '10rem', flex: 0 }}>
                    <form onSubmit={onSubmitHandler} style={{ width: '100%' }}>
                        <div style={{ display: 'flex', marginBottom: '1rem' }}>
                            <Input
                                type="text"
                                value={emoji}
                                placeholder="⚽"
                                onChange={(e) => setEmoji(e.target.value)}
                                style={{
                                    width: '15%',
                                    marginRight: '1rem',
                                }}
                            />
                            <Input
                                type="text"
                                value={name}
                                placeholder="Fotball"
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    width: '85%',
                                }}
                            />
                        </div>
                        <PrimaryButton
                            type="submit"
                            color="success"
                            sx={{ textTransform: 'none', marginBottom: '0.5rem' }}
                            disabled={emoji.trim().length < 1 || name.trim().length < 1}
                        >
                            Legg til kategori
                        </PrimaryButton>
                    </form>
                </Section>
                <Section style={{ paddingTop: 0, flex: 0 }}>
                    <p style={{ width: '100%', textAlign: 'left', marginBottom: '1rem', fontWeight: 600 }}>Kategorier i bruk</p>
                    <ul style={{ width: '100%', maxHeight: '58vh', overflow: 'scroll' }}>
                        {categories.map((category) => (
                            <CategoryListItem key={category.id} category={category} selectCategoryHandler={selectCategoryHandler} />
                        ))}
                    </ul>
                </Section>
                {selectedCategory && (
                    <ConfirmationModal
                        acceptButtonText="Slett"
                        modalTitle="Slett kategori"
                        modalText={`Du er i ferd med å slette ${selectedCategory.emoji} ${selectedCategory.name}`}
                        onAcceptHandler={onDeleteCategoryHandler}
                        onCancelHandler={() => setSelectedCategory(null)}
                    />
                )}
            </Main>
        </>
    );
};

export default CategoryList;

const Input = styled.input`
    padding: 0.3rem;
    border: none;
    border-bottom: 1px solid ${MyTheme.colors.accent};
    font-size: 1rem;
    &:focus {
        outline: none;
    }
`;
