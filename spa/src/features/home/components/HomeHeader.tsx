import React from 'react';
import { FlexRowContainer } from '../../../components/Layout';
import { ICategory } from '../../../interfaces';
import { CategoryButton } from './CategoryButton';

interface Props {
    categories: ICategory[];
    onCategorySelectHandler: (category: ICategory) => void;
    selectedCategory: ICategory | null;
}

export const HomeHeader: React.FC<Props> = ({ categories, onCategorySelectHandler, selectedCategory }) => (
    <header style={{ width: '100%', display: 'flex', backgroundColor: 'transparent', position: 'absolute', height: '4rem', padding: 0 }}>
        <FlexRowContainer style={{ zIndex: '2', gap: '10px', padding: '20px 30px', overflowX: 'scroll' }}>
            {categories.map((category) => (
                <CategoryButton
                    key={category.id}
                    category={category}
                    selectedCategory={selectedCategory}
                    selectCategoryHandler={onCategorySelectHandler}
                />
            ))}
        </FlexRowContainer>
    </header>
);
