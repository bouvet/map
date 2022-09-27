import { FC } from 'react';
import { RegisterButton } from '../../../components/Filter/Buttons';
import { FilterMenuContent } from '../../../components/Filter/FilterMenu';
import { useStateSelector } from '../../../hooks/useRedux';
import { Category } from '../../../utils/types.d';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkTextCenter, TitleForm } from '../../../components/Form/Text';
import { SubmitButton } from '../../../components/Form/Buttons';

export const Personalization: FC = () => {
    const { categories } = useStateSelector((state) => state.map);
    const mappedFilter = categories.map((item: Category) => (
        <RegisterButton key={item.name} id={item.id} text={item.name} emoji={item.emoji} />
    ));

    return (
        <FormWrapper>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Personalisering</TitleForm>
                    <FilterMenuContent>{mappedFilter}</FilterMenuContent>
                    <SubmitButton text="white">Velg</SubmitButton>
                    {/* Validate user when redirecting */}
                    <LinkTextCenter href="/">Hopp over</LinkTextCenter>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
