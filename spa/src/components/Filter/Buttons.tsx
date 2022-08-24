import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';
import { mapActions } from '../../store/state/map.state';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';

/** For FilterButtonStyle to change colors based on whether the button is currently selected */
interface Props {
    /** State for checking if the buttons is currently selected */
    clicked: boolean;
}
/** Type for content of filterbutton */
interface FilterProps {
    /** Name of category */
    text: string;
}


/** Styling of filterbuttons, with conditional colors based on the Props.clicked value */
const FilterButtonStyle = styled.div<Props>`
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    height: 27px;
    font-size: ${MyTheme.fontSize.icon};
    padding: 0px 10px;
    border-radius: 27px;
    background-color: ${props => props.clicked ? MyTheme.colors.accent : MyTheme.colors.darkbase };
    color: ${MyTheme.colors.lightbase};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    `;


/** Filterbutton export with FilterProps.text as the displayed value of the button */
export const FilterButton: React.FunctionComponent<FilterProps> = ({text}) => {
    const { selected } = useStateSelector(state => state.map)
    const [select, setSelect] = useState(false);
    const dispatch = useStateDispatch()

    /** Updating the conditional coloring of the button based on the global state selected
     *  Selected is a string with the currently selected category as a string.
     */
    useEffect(() => {
        if (selected === text) {
            setSelect(true);
        } else {
            setSelect(false);
        }
    }, [selected]);

    /** Method for updating the global state selected when the button is clicked */
    const updateGlobalState = (activity :string) => {
        // Update the global state
        console.log(activity);
        dispatch(mapActions.setSelected(activity));
    }

    /** Event handler for click events.
     *  Calls function for updating global state.
     */
    const handleClick = () => {
        if (!select) {
            updateGlobalState(text);
        } else {
            updateGlobalState("");
        }
        setSelect(!select);
    }

    return (
        <FilterButtonStyle clicked={select} onClick={handleClick}>
            {text}
        </FilterButtonStyle>
    );
};
