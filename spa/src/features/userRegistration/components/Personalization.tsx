import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterButtonFavorites } from '../../../components/Filter/FilterButtons';
import { FilterMenuContent } from '../../../components/Filter/FilterMenu';
import { useStateSelector } from '../../../hooks/useRedux';
import { ICategory } from '../../../utils/types.d';
import { Form } from '../../../components/Form/Form';
import { LinkButton, PageContainer, PageSubtitle, PageTitle, SectionContainer, SubmitButton } from '../../../components/UI';

export const Personalization: FC = () => {
    const navigate = useNavigate();

    const { categories } = useStateSelector((state) => state.map);
    const mappedFilter = categories.map((item: ICategory) => (
        <RegisterButtonFavorites key={item.name} id={item.id} text={item.name} emoji={item.emoji} />
    ));

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/register/onboarding');
    };

    return (
        <PageContainer>
            <SectionContainer>
                <PageTitle>Personalisering</PageTitle>
                <PageSubtitle>Velg dine favoritter:</PageSubtitle>
                <FilterMenuContent>{mappedFilter}</FilterMenuContent>
                <Form onSubmit={onSubmitHandler} style={{ marginTop: 'auto' }}>
                    <SubmitButton type="submit" variant="contained" sx={{ marginTop: 'auto' }}>
                        Velg
                    </SubmitButton>
                </Form>
                <LinkButton sx={{ marginBottom: '-10vh', width: 150 }} onClick={() => navigate('/register/onboarding')}>
                    Hopp over
                </LinkButton>
            </SectionContainer>
        </PageContainer>
    );
};
