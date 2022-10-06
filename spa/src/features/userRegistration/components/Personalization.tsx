import { FC, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterButtonFavorites } from '../../../components/Filter/Buttons';
import { FilterMenuContent } from '../../../components/Filter/FilterMenu';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { Category } from '../../../utils/types.d';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkTextPersonalization, Text, TitleForm } from '../../../components/Form/Text';
import { SubmitButtonPersonalization } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { mapService } from '../../map';
import { CenterFlex } from '../../../components/Form/Input';

export const Personalization: FC = () => {
    const navigate = useNavigate();
    const dispatch = useStateDispatch();

    const { categories } = useStateSelector((state) => state.map);
    const mappedFilter = categories.map((item: Category) => (
        <RegisterButtonFavorites key={item.name} id={item.id} text={item.name} emoji={item.emoji} />
    ));

    useEffect(() => {
        dispatch(mapService.getLocations());
    }, [dispatch]);

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
                    <FilterMenuContent>{mappedFilter}</FilterMenuContent>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <CenterFlex>
                            <SubmitButtonPersonalization text="white">Velg</SubmitButtonPersonalization>
                        </CenterFlex>
                    </Form>
                    <CenterFlex>
                        <LinkTextPersonalization to="/onboarding">Hopp over</LinkTextPersonalization>
                    </CenterFlex>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
