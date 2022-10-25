import { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RegisterButton } from '../../../components/Filter/FilterButtons';
import { FilterMenuContent } from '../../../components/Filter/FilterMenu';
import { Text } from '../../../components/UI';
import { useStateSelector } from '../../../hooks/useRedux';
import { registrationActions } from '../../../store/state/registration.state';
import { MyTheme } from '../../../styles/global';
import { ICategory } from '../../../utils/types.d';

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

export const Information: FC = () => {
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

    return (
        <InformationWrapper>
            <InputWrapper>
                <Label>Navn på lokasjon*</Label>
                <Input onChange={handleChangeName} value={currentTitle} maxLength={30} minLength={5} placeholder="Min. 5 tegn" />
            </InputWrapper>
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
        </InformationWrapper>
    );
};
