import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RegisterButton } from '../../../components/Filter/FilterButtons';
import { FilterMenuContent } from '../../../components/Filter/FilterMenu';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { SectionContainer, Text } from '../../../components/UI';
import { useInput } from '../../../hooks/useInput';
import { useStateSelector } from '../../../hooks/useRedux';
import { ICategory } from '../../../interfaces';
import { registrationActions } from '../../../store/state/registration.state';
import { MyTheme } from '../../../styles/global';

export const AddLocationInfo: React.FC = () => {
    const { categories } = useStateSelector((state) => state.map);
    const mappedFilter = categories.map((item: ICategory) => (
        <RegisterButton key={item.name} id={item.id} text={item.name} emoji={item.emoji} />
    ));

    const dispatch = useDispatch();
    const { currentTitle, currentDescription } = useStateSelector((state) => state.registration);

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === ' ') {
            dispatch(registrationActions.setCurrentTitle(''));
        } else {
            dispatch(registrationActions.setCurrentTitle(e.target.value));
        }
    };

    const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value === ' ') {
            dispatch(registrationActions.setCurrentDescription(''));
        } else {
            dispatch(registrationActions.setCurrentDescription(e.target.value));
        }
    };

    const {
        value: name,
        isValid: nameIsValid,
        hasError: nameInputHasError,
        inputBlurHandler: nameBlurHandler,
        valueChangeHandler: nameChangeHandler,
        reset: resetNameInput,
    } = useInput((value) => value.trim().length >= 5);

    return (
        <SectionContainer>
            <StyledInput
                label="Navn på lokasjon*"
                errorMessage="Vennligst fyll inn navn"
                value={name}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                inputHasError={nameInputHasError}
                style={{ width: '100%' }}
            />
            <CategorySelectWrapper>
                <Label>Velg kategorier*</Label>
            </CategorySelectWrapper>
            <FilterMenuContent>{mappedFilter}</FilterMenuContent>
            <InputWrapper>
                <Label>Beskriv stedet*</Label>
                <ListWrapper>
                    <Text>Tips til info:</Text>
                    <ul>
                        <li>Hva slags utstyr finner man der?</li>
                        <li>Er utstyret i god stand?</li>
                        <li>Hvordan kommer man seg dit?</li>
                        <li>Er stedet ofte opptatt?</li>
                        <li>Har stedet belysning som slås av på kvelden?</li>
                    </ul>
                </ListWrapper>
                <TextArea onChange={handleChangeDescription} value={currentDescription} maxLength={200} minLength={20} />
                {currentDescription.length}/200
            </InputWrapper>
        </SectionContainer>
    );
};

const CategorySelectWrapper = styled.div`
    width: 95%;
    padding-left: 5%;
`;

const Label = styled.div``;
const InputWrapper = styled.div`
    width: 100%;
`;

const Input = styled.input`
    border-radius: 5px;
    border: 1px solid ${MyTheme.colors.grey};
    padding: 5px;
`;

const ListWrapper = styled.div`
    padding: 10px;
`;

const TextArea = styled.textarea`
    border-radius: 5px;
    border: 1px solid ${MyTheme.colors.grey};
    padding: 5px;
    width: calc(100% - 12px);
    height: 100px;
`;
