import { Button } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BackButton, PageContainer, SectionContainer } from '../components/UI';
import { WorkoutBlock } from '../features/workoutRegistration/Components/Workout';

export const WorkoutHeader = styled.div`
    width: 100%;
    height: 2rem;
    padding: 1rem;
    text-align: center;
`;

const WorkoutSubHeader = styled.text`
    font-weight: 600;
`;

export const RegisterWorkout: FC = () => {
    const newDate = new Date();
    const navigate = useNavigate();
    const formatter = new Intl.DateTimeFormat('default', { month: 'long' });
    const month = formatter.format(new Date());
    const [workoutDate, setWorkoutDate] = useState([
        { id: '0', title: 'Tennisbane', category: 'Tennis', date: 'Tue Nov 15 2022' },
        { id: '1', title: 'Tennisbane', category: 'Tennis', date: 'Wed Sep 15 2022' },
        { id: '2', title: 'Tennisbane', category: 'Tennis', date: 'Mon Oct 15 2022' },
    ]);

    /*
        inherit state from modal in map with array containing title, category and timestamp.
        should then put each item in the array in a box on the page and filter all items/boxes by month.
        this will be based on the states registered month and also order them from 1-31 bottom-top.
        should have a ternary operator to check if there are any items in each month to determine wether or not to display the header.
        Need at least 1 item per month.

        foreach(let item in workoutDate) {
            if (item.date(includes('Sep'))) {
                <WorkoutSubHeader>{item.date}</WorkoutSubHeader>
                <WorkoutSubHeader>September</WorkoutSubHeader>
                foreach(let itemReg in item) {
                    <SessionButton>{itemReg.date}</SessionButton>
                }
            } else {
                return;
            }
        }
        
    */
    const [september, setSeptember] = useState(false);
    const [october, setOctober] = useState(false);
    const [november, setNovember] = useState(false);

    useEffect(() => {
        workoutDate.forEach((item) => {
            if (item.date.includes('Sep')) {
                setSeptember(true);
            }
            if (item.date.includes('Oct')) {
                setOctober(true);
            }
            if (item.date.includes('Nov')) {
                setNovember(true);
            }
        });
    }, [workoutDate]);

    const sortedDate = workoutDate.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <>
            <>
                <PageContainer>
                    <BackButton onClick={() => navigate(-1)} />
                    <SectionContainer>
                        <WorkoutHeader style={{ fontWeight: 700 }}>Dine treningsøkter</WorkoutHeader>
                        {september ? (
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    marginBottom: 5,
                                }}
                            >
                                <WorkoutSubHeader style={{ marginRight: 5 }}>September</WorkoutSubHeader>
                                <WorkoutSubHeader>2022</WorkoutSubHeader>
                                {/* <WorkoutSubHeader style={{ marginRight: 5 }}>{month}</WorkoutSubHeader>
                            <WorkoutSubHeader>{newDate.getFullYear()}</WorkoutSubHeader> */}
                            </div>
                        ) : null}
                        {sortedDate.map((dateItem) => (
                            <div key={dateItem.id} style={{ width: '100%', display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                                <WorkoutBlock dateTitle={dateItem.title} dateCategory={dateItem.category} date={dateItem.date} />

                                <Button style={{ borderRadius: '50%' }}>
                                    <span style={{ color: 'red' }} className="material-symbols-outlined">
                                        delete
                                    </span>
                                </Button>
                            </div>
                        ))}
                    </SectionContainer>
                </PageContainer>
            </>
        </>
    );
};
