import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FilterButton, RegisterButton } from '../../../components/Filter/Buttons';
import { FilterMenuContent } from '../../../components/Filter/FilterMenu';
import { useStateSelector } from '../../../hooks/useRedux';
import { registrationActions } from '../../../store/state/registration.state';
import { MyTheme } from '../../../styles/global';
import { Category } from '../../../utils/types.d';

const InformationWrapper = styled.div`
    width: 100%;
    overflow-y: scroll;
`;

const CategorySelectWrapper = styled.div`
    width: 95%;
    padding-left: 5%;
`;

const Label = styled.div``;
const InputWrapper = styled.div`
    width: 90%;
    padding: 10px 5%;
`;

const Input = styled.input`
    border-radius: 5px;
    border: 1px solid ${MyTheme.colors.grey};
    padding: 5px;
`;

const TextArea = styled.textarea`
    border-radius: 5px;
    border: 1px solid ${MyTheme.colors.grey};
    padding: 5px;
    width: calc(100% - 12px);
    height: 100px;
`;

export const Information: FC = () => {
    const { categories } = useStateSelector((state) => state.map);
    const mappedFilter = categories.map((item: Category) => (
        <RegisterButton key={item.name} id={item.id} text={item.name} emoji={item.emoji} />
    ));

    const dispatch = useDispatch();

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registrationActions.setCurrentTitle(event.target.value));
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(registrationActions.setCurrentDescription(event.target.value));
    };

    return (
        <InformationWrapper>
            <InputWrapper>
                <Label>Navn på lokasjon:</Label>
                <Input onChange={handleChangeName} />
            </InputWrapper>
            <CategorySelectWrapper>
                <Label>Velg kategorier:</Label>
            </CategorySelectWrapper>
            <FilterMenuContent>{mappedFilter}</FilterMenuContent>
            <InputWrapper>
                <Label>Beskriv stedet:</Label>
                <TextArea onChange={handleChangeDescription} />
            </InputWrapper>
        </InformationWrapper>
    );
};
