import { FC, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterButtonFavorites } from '../../../components/Filter/Buttons';
import { FilterMenuContent } from '../../../components/Filter/FilterMenu';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { ICategory } from '../../../utils/types.d';
import { Form } from '../../../components/Form/Form';
import { mapServices } from '../../map';
import { Button, LinkButton, PageContainer, PageSubtitle, PageTitle, SectionContainer } from '../../../components/UI';

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
        navigate('/onboarding');
    };

    return (
        <PageContainer>
            <SectionContainer>
                <PageTitle>Personalisering</PageTitle>
                <PageSubtitle>Velg dine favoritter:</PageSubtitle>
                <FilterMenuContent>{mappedFilter}</FilterMenuContent>
                <Form onSubmit={onSubmitHandler}>
                    <Button type="submit" variant="contained" sx={{ marginTop: 40 }}>
                        Velg
                    </Button>
                </Form>
                <LinkButton onClick={() => navigate('/onboarding')}>Hopp over</LinkButton>
            </SectionContainer>
        </PageContainer>
    );
};
