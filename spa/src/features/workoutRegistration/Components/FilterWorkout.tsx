import { MenuItem, Slide } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC, useState } from 'react';
import { useStateSelector } from '../../../hooks/useRedux';
import { ICategory } from '../../../utils/types.d';
import { FilterButton, WorkoutButton, WorkoutPopup, WorkoutPopupCard } from './Workout';

export const SelectWorkout: FC = () => {
    const [popUpIsVisible, setPopUpIsVisible] = useState(false);
    const InitialWorkoutState = 'Velg en aktivitet...';

    const { workoutCategories } = useStateSelector((state) => state.workout);
    const mappedFilter = workoutCategories.map((item: ICategory) =>
        item.id ? <FilterButton key={item.id} id={item.id} text={item.name} /> : null,
    );

    const [workout, setWorkout] = useState(InitialWorkoutState);

    const handleChange = (event: SelectChangeEvent) => {
        setWorkout(event.target.value);
    };

    const handleClick = () => {
        setPopUpIsVisible(!popUpIsVisible);
    };
    return (
        <>
            <Select
                style={{ height: '100' }}
                value={workout}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem value="">
                    <em>Velg sport</em>
                </MenuItem>
                <MenuItem value="Fotball">Fotball</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            {workout === InitialWorkoutState ? (
                <WorkoutButton style={{ fontStyle: 'italic', color: 'grey' }} type="button" onClick={handleClick}>
                    {workout}
                    <span style={{ flex: 1, textAlign: 'right', color: 'black' }} className="material-symbols-outlined">
                        expand_more
                    </span>
                </WorkoutButton>
            ) : (
                <WorkoutButton type="button" onClick={handleClick}>
                    <span style={{ marginRight: 5 }} className="material-symbols-outlined">
                        sports_soccer
                    </span>
                    {workout}
                    <span style={{ flex: 1, textAlign: 'right' }} className="material-symbols-outlined">
                        expand_more
                    </span>
                </WorkoutButton>
            )}
            <Slide direction="up" in={popUpIsVisible} mountOnEnter unmountOnExit>
                <WorkoutPopupCard>
                    {popUpIsVisible && (
                        <>
                            <WorkoutPopup activity="Aktiviteter" />
                            {mappedFilter}
                            {/* <FilterButton key={item.id} id={item.id} text={item.name} emoji={item.emoji} /> */}
                        </>
                    )}
                </WorkoutPopupCard>
            </Slide>
        </>
    );
};
