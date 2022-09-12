import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RequiredStar } from '../../../components/Common/RequiredStar';
import {  RegisterButton } from '../../../components/Filter/Buttons';
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
    const { currentTitle, currentDescription } = useStateSelector((state) => state.registration);

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === ' ') {
            dispatch(registrationActions.setCurrentTitle(''));
        } else {
            dispatch(registrationActions.setCurrentTitle(event.target.value));
        }
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value === ' ') {
            dispatch(registrationActions.setCurrentDescription(''));
        } else {
            dispatch(registrationActions.setCurrentDescription(event.target.value));
        }
    };

    return (
        <InformationWrapper>
            <InputWrapper>
                <Label>
                    Navn på lokasjon:
                    <RequiredStar />
                </Label>
                <Input onChange={handleChangeName} value={currentTitle} maxLength={30}/>
            </InputWrapper>
            <CategorySelectWrapper>
                <Label>
                    Velg kategorier:
                    <RequiredStar />
                </Label>
            </CategorySelectWrapper>
            <FilterMenuContent>{mappedFilter}</FilterMenuContent>
            <InputWrapper>
                <Label>
                    Beskriv stedet:
                    <RequiredStar />
                </Label>
                <TextArea onChange={handleChangeDescription} value={currentDescription} maxLength={200} />
                {currentDescription.length}/200
            </InputWrapper>
        </InformationWrapper>
    );
};
