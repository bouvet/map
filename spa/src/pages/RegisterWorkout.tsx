import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton, LinkButton, PageContainer, SectionContainer } from '../components/UI';
import { Loading } from '../features/locationRegistration/components/Loading';
import { WorkoutHeader } from '../features/workoutRegistration/Components/Workout';

export const RegisterWorkout: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <PageContainer>
                        <BackButton onClick={() => navigate(-1)} />
                        <SectionContainer>
                            <LinkButton style={{ borderWidth: '2px', borderColor: 'grey' }} onClick={() => navigate('/create-workout')}>
                                Ny treningsøkt
                            </LinkButton>
                            <WorkoutHeader>Dine treningsøkter</WorkoutHeader>
                        </SectionContainer>
                    </PageContainer>
                </>
            )}
        </>
    );
};
