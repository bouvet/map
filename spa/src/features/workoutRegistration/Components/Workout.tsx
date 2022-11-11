import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/UI';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { workoutActions } from '../../../store/state/workout.state';
import { MyTheme } from '../../../styles/global';

export const WorkoutHeader = styled.div`
    width: 100%;
    height: 2rem;
    padding: 1rem;
    font-weigth: 700;
`;

export const WorkoutButton = styled(Button)`
    width: 100%;
    border-radius: 2.5px;
    border: solid #c4c4c4 1px;
    height: 40px;
    background-color: white;
    color: black;
    display: flex;
    justify-content: flex-start;
`;

interface WorkoutPopupContentProps {
    activity: string;
}

export const WorkoutPopupCard = styled.div`
    margin-left: -7.5%;
    width: 100%;
    height: 100%;
    background-color: ${MyTheme.colors.lightBase};
    position: absolute;
    border-radius: 10px;
    z-index: 1000;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

const WorkoutPopupWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const WorkoutPopupContent = styled.div`
    width: calc(60% - 20px);
    padding: 10px;
    border-radius: 0px 10px 10px 0px;
    justify-content: left;
    overflow: hidden;
`;

const WorkoutName = styled.p`
    font-weight: bolder;
    padding-right: 50px;
    margin: 0px;
    font-size: ${MyTheme.fontSize.header};
    word-break: break-word;
    hyphens: auto;
`;

const Bodytext = styled.div`
    justify-content: left;
    margin: 5px 0px;
    font-size: ${MyTheme.fontSize.body};
`;

export const WorkoutPopup: FC<WorkoutPopupContentProps> = ({ activity }) => {
    const dispatch = useStateDispatch();
    const [popUpIsVisible, setPopUpIsVisible] = useState(false);

    const handleClickClose = () => {
        // dispatch(workoutActions.setPopupVisibility(!popUpIsVisible));
        // dispatch(mapActions.setSelectedMarker(''));
        setPopUpIsVisible(!popUpIsVisible);
    };

    const handleClickShowLocationPage = () => {
        // dispatch(mapActions.setHomeMarkerFocus(true));
    };

    // const displayedDescription = useMemo(() => {
    //     if (description.length <= 50) return description;
    //     return `${description.slice(0, 50)}... `;
    // }, [description]);

    return (
        <WorkoutPopupWrapper>
            <WorkoutPopupContent>
                <WorkoutName>{activity}</WorkoutName>
                <Button onClick={handleClickClose}>Lukk</Button>
                <Bodytext>{/* {displayedDescription} */}</Bodytext>
            </WorkoutPopupContent>
        </WorkoutPopupWrapper>
    );
};

interface FilterButtonToggledProps {
    clicked: boolean;
}

interface FilterButtonContentProps {
    // eslint-disable-next-line react/no-unused-prop-types
    id: string;
    text: string;
    // emoji: string;
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

export const FilterButton: FC<FilterButtonContentProps> = ({ id, text }) => {
    const { selectedFilterCategory } = useStateSelector((state) => state.workout);
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
        dispatch(workoutActions.setSelectedFilterCategory(category));
        dispatch(workoutActions.setPopupVisibility(false));
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
            {/* <FilterButtonEmoji>{emoji}</FilterButtonEmoji> */}
            <FilterButtonName>{text}</FilterButtonName>
        </FilterButtonStyle>
    );
};
