import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { ICategory } from '../../../interfaces';
import { FlexRowContainer, Section } from '../../../components/Layout';
import { CategoryButton } from '../../home/components/CategoryButton';
import { userActions } from '../../../store';
import { mapServices } from '../../map';
import { LinkButton, PageSubtitle, PrimaryButton } from '../../../components/Common';

export const Personalization: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const { categories } = useStateSelector((state) => state.map);

    const onCategorySelectHandler = (category: ICategory) => {
        if (selectedCategories.find((c) => c.id === category.id)) {
            setSelectedCategories((categories) => categories.filter((c) => c.id !== category.id));
            return;
        }

        setSelectedCategories((categories) => [...categories, category]);
    };

    const onSubmitHandler = () => {
        dispatch(userActions.setFavoriteCategoryIds(selectedCategories.map((category) => category.id)));
        navigate('/onboarding');
    };

    useEffect(() => {
        dispatch(mapServices.getCategories());
    }, [dispatch]);

    return (
        <Section>
            <div>
                <PageSubtitle>Velg dine favoritter:</PageSubtitle>
                <FlexRowContainer style={{ zIndex: '2', gap: '10px', padding: '5px 5px', overflowX: 'scroll' }}>
                    {categories.map((category, index) => (
                        <CategoryButton
                            key={category.id}
                            category={category}
                            selectedCategory={selectedCategories[index]}
                            selectCategoryHandler={onCategorySelectHandler}
                        />
                    ))}
                </FlexRowContainer>
            </div>
            <div>
                <PrimaryButton type="submit" onClick={onSubmitHandler} disabled={selectedCategories.length < 1}>
                    Velg
                </PrimaryButton>

                <LinkButton sx={{ width: '100%' }} onClick={() => navigate('/onboarding')}>
                    Hopp over
                </LinkButton>
            </div>
        </Section>
    );
};
