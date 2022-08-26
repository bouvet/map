import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';
import { mapActions } from '../../store/state/map.state';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';

interface FilterButtonToggledProps {
    clicked: boolean;
}

interface FilterButtonContentProps {
    text: string;
}

const FilterButtonStyle = styled.div<FilterButtonToggledProps>`
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 27px;
    font-size: ${MyTheme.fontSize.icon};
    padding: 0px 10px;
    border-radius: 27px;
    background-color: ${(props) => (props.clicked ? MyTheme.colors.accent : MyTheme.colors.darkbase)};
    color: ${MyTheme.colors.lightbase};
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

export const FilterButton: React.FunctionComponent<FilterButtonContentProps> = ({ text }) => {
    const { selectedFilterCategory } = useStateSelector((state) => state.map);
    const [select, setSelect] = useState(false);
    const dispatch = useStateDispatch();

    useEffect(() => {
        if (selectedFilterCategory === text) {
            setSelect(true);
        } else {
            setSelect(false);
        }
    }, [selectedFilterCategory, text]);

    const updateGlobalStateForSelectedCategory = (activity: string) => {
        console.log(activity);
        dispatch(mapActions.setSelectedFilterCategory(activity));
    };

    const handleClickFilterButton = () => {
        if (!select) {
            updateGlobalStateForSelectedCategory(text);
        } else {
            updateGlobalStateForSelectedCategory('');
        }
        setSelect(!select);
    };

    return (
        <FilterButtonStyle clicked={select} onClick={handleClickFilterButton}>
            {text}
        </FilterButtonStyle>
    );
};
