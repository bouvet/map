import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';
import { mapActions } from '../../store/state/map.state';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';

interface Props {
    clicked: boolean;
}
interface FilterProps {
    text: string;
}

const FilterButtonStyle = styled.div<Props>`
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 27px;
    font-size: ${MyTheme.fontSize.body};
    padding: 0px 10px;
    border-radius: 27px;
    background-color: ${props => props.clicked ? MyTheme.colors.accent : MyTheme.colors.darkbase };
    color: ${MyTheme.colors.lightbase};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    `;



export const FilterButton: React.FunctionComponent<FilterProps> = ({text}) => {

    const [select, setSelect] = useState(false);


    const dispatch = useStateDispatch()

    const updateGlobalState = (activity :string) => {
        // Update the global state
        console.log(activity);
        dispatch(mapActions.setSelected(activity));
    }

    const handleClick = () => {
        //setSelect(!select);
        updateGlobalState(text);
    }

    return (
        <FilterButtonStyle clicked={select} onClick={handleClick}>
            {text}
        </FilterButtonStyle>
    );
};