import React, { useEffect } from 'react';

import styled from 'styled-components';
import { PrimaryButton, Text } from '../../../components/Common';
import { StyledInput } from '../../../components/Form/StyledInput';
import { FlexRowContainer, Section } from '../../../components/Layout';

import { useInput } from '../../../hooks/useInput';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { ICategory } from '../../../interfaces';
import { addLocationActions } from '../../../store';
import { MyTheme } from '../../../styles/global';
import { CategoryButton } from '../../home/components/CategoryButton';
import { mapServices } from '../../map';

interface Props {
    setPageIndex: (pageIndex: number) => void;
}

export const AddLocationInfo: React.FC<Props> = ({ setPageIndex }) => {
    const { categories } = useStateSelector((state) => state.map);

    const { selectedCategories, title: locationTitle, description } = useStateSelector((state) => state.addLocation);

    const dispatch = useStateDispatch();

    const {
        value: title,
        hasError: titleInputHasError,
        inputBlurHandler: titleBlurHandler,
        valueChangeHandler: titleChangeHandler,
    } = useInput((value) => value.trim().length >= 5);

    const selectCategoryHandler = (selectedCategory: ICategory) => {
        if (selectedCategories.find((category) => category.id === selectedCategory.id)) {
            dispatch(
                addLocationActions.setSelectedCategories(selectedCategories.filter((category) => category.id !== selectedCategory.id)),
            );
            return;
        }
        dispatch(addLocationActions.setSelectedCategories([...selectedCategories, selectedCategory]));
    };

    useEffect(() => {
        if (title.trim().length > 0) {
            dispatch(addLocationActions.setTitle(title));
        }
    }, [dispatch, title]);

    useEffect(() => {
        dispatch(mapServices.getCategories());
    }, [dispatch]);

    return (
        <Section style={{ paddingTop: '0.5rem' }}>
            <div>
                <StyledInput
                    label="Navn på lokasjon*"
                    errorMessage="Navn må være minimum 5 bokstaver"
                    placeholder="Minimum 5 bokstaver"
                    value={title.trim().length > 0 ? title : locationTitle}
                    onChange={titleChangeHandler}
                    onBlur={titleBlurHandler}
                    inputHasError={titleInputHasError}
                    style={{ width: '100%' }}
                />
                <Text style={{ marginTop: '1rem', fontWeight: '600' }}>Velg kategorier*</Text>

                <FlexRowContainer style={{ zIndex: '2', gap: '10px', padding: '20px 30px', paddingLeft: '0.3rem', overflowX: 'scroll' }}>
                    {categories.map((category) => (
                        <CategoryButton
                            key={category.id}
                            category={category}
                            selectedCategory={selectedCategories?.filter((c) => c.id === category.id)[0] || null}
                            selectCategoryHandler={selectCategoryHandler}
                        />
                    ))}
                    {categories.length < 1 && <p>Det finnes ingen kategorier i systemet</p>}
                </FlexRowContainer>

                <Text style={{ marginBottom: '1rem', fontWeight: '600' }}>Beskriv stedet*</Text>

                <Text style={{ marginBottom: '0.5rem' }}>Tips til info:</Text>

                <ul style={{ listStyle: 'disc', paddingLeft: '1rem', width: '100%' }}>
                    <li style={{ marginBottom: '0.3rem' }}>Hva slags utstyr finner man der?</li>
                    <li style={{ marginBottom: '0.3rem' }}>Er utstyret i god stand?</li>
                    <li style={{ marginBottom: '0.3rem' }}>Hvordan kommer man seg dit?</li>
                    <li style={{ marginBottom: '0.3rem' }}>Er stedet ofte opptatt?</li>
                    <li style={{ marginBottom: '1rem' }}>Har stedet belysning som slås av på kvelden?</li>
                </ul>

                <TextArea
                    onChange={(e) => dispatch(addLocationActions.setDescription(e.target.value))}
                    value={description}
                    maxLength={200}
                    minLength={20}
                />

                <Text style={{ padding: '5px' }}>
                    <span style={{ color: description.length < 20 ? 'red' : 'inherit' }}>{description.length} </span>/ 200
                </Text>

                <PrimaryButton
                    sx={{ marginTop: '1rem' }}
                    onClick={() => setPageIndex(2)}
                    disabled={locationTitle.trim().length < 5 || description.trim().length < 20 || selectedCategories.length < 1}
                >
                    Gå videre
                </PrimaryButton>
            </div>
        </Section>
    );
};

const TextArea = styled.textarea`
    border-radius: 5px;
    border: 1px solid ${MyTheme.colors.gray};
    padding: 5px;
    min-width: 100%;
    max-width: 100%;
    min-height: 100px;
`;
