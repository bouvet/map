import React, { FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RegisterButton } from '../../../components/Filter/Buttons';
import { FilterMenuContent } from '../../../components/Filter/FilterMenu';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { Category } from '../../../utils/types.d';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkTextCenter, Text, TitleForm } from '../../../components/Form/Text';
import { SubmitButton } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { mapService } from '../../map';

const CategorySelectWrapper = styled.div`
    width: 95%;
    padding-left: 5%;
`;

export const Personalization: FC = () => {
    const navigate = useNavigate();
    const dispatch = useStateDispatch();
    const [mappedFilter, setMappedFilter] = useState<ReactElement[]>([]);

    useEffect(() => {
        dispatch(mapService.getLocations());
    }, [dispatch]);

    const { categories } = useStateSelector((state) => state.map);
    useEffect(() => {
        setMappedFilter(
            categories.map((item: Category) => <RegisterButton key={item.name} id={item.id} text={item.name} emoji={item.emoji} />),
        );
    }, [categories]);
    console.log(mappedFilter); // empty array

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/onboarding');
        console.log('Favoritter valgt');
    };

    return (
        <FormWrapper>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Personalisering</TitleForm>
                    <Text>Velg dine favoritter:</Text>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <CategorySelectWrapper>
                            <FilterMenuContent>{mappedFilter}</FilterMenuContent>
                        </CategorySelectWrapper>
                        <SubmitButton text="white">Velg</SubmitButton>
                    </Form>
                    <LinkTextCenter href="/onboarding">Hopp over</LinkTextCenter>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
