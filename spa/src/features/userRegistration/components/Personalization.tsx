import { FC, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterButtonFavorites } from '../../../components/Filter/Buttons';
import { FilterMenuContent } from '../../../components/Filter/FilterMenu';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { ICategory } from '../../../utils/types.d';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { LinkTextPersonalization, Text, TitleForm } from '../../../components/Form/Text';
import { SubmitButtonPersonalization } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { mapServices } from '../../map';
import { CenterFlex } from '../../../components/Form/Input';
import { SectionContainer } from '../../../components/UI';

export const Personalization: FC = () => {
    const navigate = useNavigate();
    const dispatch = useStateDispatch();

    const { categories } = useStateSelector((state) => state.map);
    const mappedFilter = categories.map((item: ICategory) => (
        <RegisterButtonFavorites key={item.name} id={item.id} text={item.name} emoji={item.emoji} />
    ));

    useEffect(() => {
        dispatch(mapServices.getLocations());
    }, [dispatch]);

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/profile/onboarding');
    };

    return (
        <FormWrapper>
            <FormContent>
                <SectionContainer>
                    <TitleForm>Personalisering</TitleForm>
                    <Text>Velg dine favoritter:</Text>
                    <FilterMenuContent>{mappedFilter}</FilterMenuContent>
                    <Form onSubmit={onSubmitHandler}>
                        <CenterFlex>
                            <SubmitButtonPersonalization text="white">Velg</SubmitButtonPersonalization>
                        </CenterFlex>
                    </Form>
                    <CenterFlex>
                        <LinkTextPersonalization to="/profile/onboarding">Hopp over</LinkTextPersonalization>
                    </CenterFlex>
                </SectionContainer>
            </FormContent>
        </FormWrapper>
    );
};
