import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton, PageContainer } from '../components/UI';
import { Loading } from '../features/locationRegistration/components/Loading';

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
                    </PageContainer>
                </>
            )}
        </>
    );
};
