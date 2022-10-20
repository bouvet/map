import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';
import { mapActions } from '../../store/state/map.state';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { registrationActions } from '../../store/state/registration.state';
import { userActions } from '../../store/state/user.state';

interface FilterButtonToggledProps {
    clicked: boolean;
}

interface FilterButtonContentProps {
    // eslint-disable-next-line react/no-unused-prop-types
    id: string;
    text: string;
    emoji: string;
}

const FilterButtonStyle = styled.div<FilterButtonToggledProps>`
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 27px;
    font-size: ${MyTheme.fontSize.icon};
    padding: 5px 10px;
    border-radius: 27px;
    background-color: ${(props) => (props.clicked ? MyTheme.colors.accent : MyTheme.colors.lightBase)};
    transition: 0.1s;
    color: ${(props) => (props.clicked ? MyTheme.colors.lightBase : MyTheme.colors.darkBase)};
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const FilterButtonEmoji = styled.span`
    display: inline;
    margin-right: 8px;
`;

const FilterButtonName = styled.span`
    display: inline;
    white-space: nowrap;
`;

export const FilterButton: FC<FilterButtonContentProps> = ({ id, text, emoji }) => {
    const { selectedFilterCategory } = useStateSelector((state) => state.map);
    const [select, setSelect] = useState(false);
    const dispatch = useStateDispatch();

    useEffect(() => {
        if (selectedFilterCategory === id) {
            setSelect(true);
        } else {
            setSelect(false);
        }
    }, [selectedFilterCategory, id]);

    const updateGlobalStateForSelectedCategory = (category: string) => {
        dispatch(mapActions.setSelectedFilterCategory(category));
        dispatch(mapActions.setSelectedMarker(''));
        dispatch(mapActions.setPopupVisibility(false));
    };

    const handleClickFilterButton = () => {
        if (!select) {
            updateGlobalStateForSelectedCategory(id);
        } else {
            updateGlobalStateForSelectedCategory('');
        }
        setSelect(!select);
    };

    return (
        <FilterButtonStyle key={id} clicked={select} onClick={handleClickFilterButton}>
            <FilterButtonEmoji>{emoji}</FilterButtonEmoji>
            <FilterButtonName>{text}</FilterButtonName>
        </FilterButtonStyle>
    );
};

export const RegisterButton: FC<FilterButtonContentProps> = ({ id, text, emoji }) => {
    const { currentCategories } = useStateSelector((state) => state.registration);
    const [select, setSelect] = useState(false);
    const dispatch = useStateDispatch();

    useEffect(() => {
        if (id && currentCategories.includes(id)) {
            setSelect(true);
        } else {
            setSelect(false);
        }
    }, [currentCategories, id]);

    const updateGlobalStateForSelectedCategory = () => {
        if (currentCategories.includes(id)) {
            const index = currentCategories.indexOf(id);
            const tempArray = [...currentCategories];
            if (index !== -1) {
                tempArray.splice(index, 1);
                dispatch(registrationActions.setCurrentCategories(tempArray));
            }
        } else {
            // add
            dispatch(registrationActions.setCurrentCategories([...currentCategories, id]));
        }
    };

    return (
        <FilterButtonStyle clicked={select} onClick={updateGlobalStateForSelectedCategory}>
            <FilterButtonEmoji>{emoji}</FilterButtonEmoji>
            <FilterButtonName>{text}</FilterButtonName>
        </FilterButtonStyle>
    );
};

// PERSONALIZATION

export const RegisterButtonFavorites: FC<FilterButtonContentProps> = ({ id, text, emoji }) => {
    const { favoriteCategoryIds } = useStateSelector((state) => state.user);
    const [select, setSelect] = useState(false);
    const dispatch = useStateDispatch();

    useEffect(() => {
        if (id && favoriteCategoryIds.includes(id)) {
            setSelect(true);
        } else {
            setSelect(false);
        }
    }, [favoriteCategoryIds, id]);

    const updateGlobalStateForSelectedCategory = () => {
        if (favoriteCategoryIds.includes(id)) {
            const index = favoriteCategoryIds.indexOf(id);
            const tempArray = [...favoriteCategoryIds];
            if (index !== -1) {
                tempArray.splice(index, 1);
                dispatch(userActions.setFavoriteCategoryIds(tempArray));
            }
        } else {
            // add
            dispatch(userActions.setFavoriteCategoryIds([...favoriteCategoryIds, id]));
        }
    };

    return (
        <FilterButtonStyle clicked={select} onClick={updateGlobalStateForSelectedCategory}>
            <FilterButtonEmoji>{emoji}</FilterButtonEmoji>
            <FilterButtonName>{text}</FilterButtonName>
        </FilterButtonStyle>
    );
};
