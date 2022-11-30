import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button } from '@mui/material';

import { Main, Section } from '../../../components/Layout';
import { Header, Sidebar } from '../../../components/Navigation';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { MyTheme } from '../../../styles/global';
import { categoryServices } from '../services';
import { CategoryListItem } from './CategoryListItem';

export const CategoryList = () => {
    const [emoji, setEmoji] = useState('');
    const [name, setName] = useState('');

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

    return (
        <>
            <Header>Behandle Kategorier</Header>
            <Main>
                <Section style={{ height: '10rem' }}>
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            sx={{ textTransform: 'none', marginBottom: '0.5rem' }}
                            disabled={emoji.trim().length < 1 || name.trim().length < 1}
                        >
                            Legg til kategori
                        </Button>
                    </form>
                </Section>
                <Section style={{ paddingTop: 0 }}>
                    <p style={{ width: '100%', textAlign: 'left', marginBottom: '1rem', fontWeight: 600 }}>Kategorier i bruk</p>
                    <ul style={{ width: '100%', maxHeight: '60vh', overflow: 'scroll' }}>
                        {categories.map((category) => (
                            <CategoryListItem key={category.id} category={category} />
                        ))}
                    </ul>
                </Section>
            </Main>
            <Sidebar />
        </>
    );
};

const Input = styled.input`
    padding: 0.3rem;
    border: none;
    border-bottom: 1px solid ${MyTheme.colors.accent};
    font-size: 1rem;
    &:focus {
        outline: none;
    }
`;
