import React, { useEffect, useState } from 'react';

import { PillButton } from '../../../components/UI';
import { ICategory } from '../../../interfaces';

interface Props {
    category: ICategory;
    selectedCategory: ICategory | null;
    selectCategoryHandler: (category: ICategory) => void;
}

export const CategoryButton: React.FC<Props> = ({ category, selectedCategory, selectCategoryHandler }) => {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (selectedCategory && category.id === selectedCategory.id) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [category, selectedCategory]);

    return (
        <PillButton selected={selected} onClick={() => selectCategoryHandler(category)}>
            {category.emoji} {category.name}
        </PillButton>
    );
};
